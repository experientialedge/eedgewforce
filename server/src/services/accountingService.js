// ==============================================================================
// EDGEWFORCE - ACCOUNTING & FINANCE SERVICE
// Collections Ledger, Cash Settlements, Payroll Runs & Financial Integrity
// ==============================================================================

import { db } from '../config/database.js';
import { calculatePayslipBreakdown } from '../utils/calculations.js';
import { recordAudit } from '../middleware/auditLogger.js';

function storedPayslipBreakdown(basic, housing, transport, other) {
  const result = calculatePayslipBreakdown(basic, housing, transport, other);
  return { basic_salary: result.basicSalary, housing_allowance: result.housingAllowance,
    transport_allowance: result.transportAllowance, other_allowance: result.otherAllowance,
    gross_pay: result.grossPay, tax_paye: result.taxPAYE, pension: result.pension,
    other_deductions: result.otherDeductions, total_deductions: result.totalDeductions, net_pay: result.netPay };
}

export const accountingService = {
  /**
   * Retrieves high-level commercial financial position.
   */
  async getFinancialOverview() {
    const orders = await db.find('orders', { status: 'delivered' });
    const collections = await db.find('collections');
    const customers = await db.find('customers');
    const settlements = await db.find('settlements');
    const payslips = await db.find('payslips');

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const totalCollected = collections.reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const totalOutstanding = customers.reduce((sum, c) => sum + Math.max(0, Number(c.balance || 0)), 0);
    const pendingSettlements = settlements.filter(s => ['pending_audit', 'submitted', 'under_review'].includes(String(s.reconciliation_status || s.status).toLowerCase()));

    return {
      totalRevenue,
      totalCollected,
      totalOutstanding,
      totalPayslipsGenerated: payslips.length,
      pendingSettlementsCount: pendingSettlements.length,
      collectionEfficiency: totalRevenue > 0 ? Math.round((totalCollected / totalRevenue) * 100) : 100
    };
  },

  /**
   * Retrieves all payslips with employee details.
   */
  async getAllPayslips(payMonth = null) {
    const filter = payMonth ? { pay_month: payMonth } : {};
    const payslips = await db.find('payslips', filter, { order: { column: 'id', ascending: false } });
    const employees = await db.find('employees');

    return payslips.map(p => {
      const emp = employees.find(e => Number(e.id) === Number(p.employee_id));
      return {
        ...p,
        employee: emp ? {
          id: emp.id,
          employee_code: emp.employee_code,
          first_name: emp.first_name,
          last_name: emp.last_name,
          department: emp.department,
          position: emp.position
        } : null
      };
    });
  },

  /**
   * Reviews cash reconciliation settlement submitted by field/sales agents.
   */
  async reviewSettlement(settlementId, status, notes = '', actor = null, req = null) {
    const settlement = await db.findById('settlements', settlementId);
    if (!settlement || (actor && Number(settlement.company_id) !== Number(actor.company_id))) throw new Error('Settlement not found');
    if (!['approved', 'rejected', 'under_review'].includes(String(status).toLowerCase())) throw new Error('Invalid reconciliation status.');

    const updated = await db.update('settlements', settlement.id, {
      reconciliation_status: status,
      audited_by: Number(actor?.id || 1),
      audited_at: new Date().toISOString()
    });

    await recordAudit(actor, `SETTLEMENT_${status.toUpperCase()}`, 'settlements', settlement.id, { notes }, req);
    return { ...updated, status: updated.reconciliation_status, notes };
  },

  /**
   * Generates or recalculates a single employee payslip.
   */
  async generateSinglePayslip(employeeId, payMonth, customEarnings = {}, actor = null, req = null) {
    const emp = await db.findById('employees', employeeId);
    if (!emp) throw new Error('Employee not found');

    const targetMonth = payMonth || (new Date().toISOString().slice(0, 7) + '-01');
    const basic = customEarnings.basic_salary !== undefined ? Number(customEarnings.basic_salary) : emp.base_salary;
    const housing = customEarnings.housing_allowance !== undefined ? Number(customEarnings.housing_allowance) : emp.housing_allowance;
    const transport = customEarnings.transport_allowance !== undefined ? Number(customEarnings.transport_allowance) : emp.transport_allowance;
    const other = customEarnings.other_allowance !== undefined ? Number(customEarnings.other_allowance) : emp.other_allowance;

    const breakdown = storedPayslipBreakdown(basic, housing, transport, other);

    const existing = await db.findOne('payslips', { employee_id: emp.id, pay_month: targetMonth });
    let record;
    if (existing) {
      record = await db.update('payslips', existing.id, {
        ...breakdown,
        status: 'published',
        notes: customEarnings.notes || existing.notes,
        updated_at: new Date().toISOString()
      });
    } else {
      record = await db.insert('payslips', {
        employee_id: emp.id,
        pay_month: targetMonth,
        ...breakdown,
        status: 'published',
        notes: customEarnings.notes || '',
        generated_by: actor?.id || null
      });
    }

    await recordAudit(actor, 'PAYSLIP_SINGLE_GENERATED', 'payslips', record.id, { employee_id: emp.id, targetMonth }, req);
    return record;
  },

  /**
   * Uploads an external PDF / Document payslip for a specific staff member.
   */
  async uploadCustomPayslip(employeeId, payMonth, fileUrl, notes = '', actor = null, req = null) {
    const emp = await db.findById('employees', employeeId);
    if (!emp) throw new Error('Employee not found');

    const targetMonth = payMonth || (new Date().toISOString().slice(0, 7) + '-01');
    const breakdown = storedPayslipBreakdown(emp.base_salary, emp.housing_allowance, emp.transport_allowance, emp.other_allowance);

    const existing = await db.findOne('payslips', { employee_id: emp.id, pay_month: targetMonth });
    let record;
    if (existing) {
      record = await db.update('payslips', existing.id, {
        ...breakdown,
        pdf_url: fileUrl,
        notes: notes || 'Document uploaded by Finance',
        status: 'published',
        updated_at: new Date().toISOString()
      });
    } else {
      record = await db.insert('payslips', {
        employee_id: emp.id,
        pay_month: targetMonth,
        ...breakdown,
        pdf_url: fileUrl,
        notes: notes || 'Document uploaded by Finance',
        status: 'published',
        generated_by: actor?.id || null
      });
    }

    await recordAudit(actor, 'PAYSLIP_DOCUMENT_UPLOADED', 'payslips', record.id, { employee_id: emp.id, fileUrl }, req);
    return record;
  },

  /**
   * Runs automated monthly payroll generation for all active employees.
   */
  async generatePayrollBatch(payMonth = null, actor = null, req = null) {
    const targetMonth = payMonth || (new Date().toISOString().slice(0, 7) + '-01');
    const employees = await db.find('employees', { status: 'active' });
    const generated = [];

    for (const emp of employees) {
      const existing = await db.findOne('payslips', { employee_id: emp.id, pay_month: targetMonth });
      const breakdown = storedPayslipBreakdown(
        emp.base_salary,
        emp.housing_allowance,
        emp.transport_allowance,
        emp.other_allowance
      );

      let record;
      if (existing) {
        record = await db.update('payslips', existing.id, {
          ...breakdown,
          status: 'published'
        });
      } else {
        record = await db.insert('payslips', {
          employee_id: emp.id,
          pay_month: targetMonth,
          ...breakdown,
          status: 'published',
          generated_by: actor?.id || null
        });
      }
      generated.push(record);
    }

    await recordAudit(actor, 'PAYROLL_BATCH_GENERATED', 'payslips', targetMonth, { count: generated.length }, req);
    return {
      month: targetMonth,
      count: generated.length,
      payslips: generated
    };
  }
};
