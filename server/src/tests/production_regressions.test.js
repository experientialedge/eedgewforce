import test from 'node:test';
import assert from 'node:assert/strict';
import { db, resetTestData } from './helpers/database.js';
import { scheduleController } from '../controllers/scheduleController.js';
import { scheduleService } from '../services/scheduleService.js';
import { salesService } from '../services/salesService.js';
import { hrService } from '../services/hrService.js';
import { executiveService } from '../services/executiveService.js';
import { mysqlRecord } from '../config/mysqlSchema.js';

function response() {
  return { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
}

test('Production regression: staff identity, company boundaries and settlement workflows', async t => {
  await resetTestData();
  const admin = await db.findById('users', 1);
  const staff = await db.findById('employees', 8);
  const other = await db.insert('employees', { company_id: 2, user_id: 500, employee_code: 'OTHER', first_name: 'Other', last_name: 'Company', status: 'active', supervisor_id: 7 });
  const own = await db.insert('schedules', { company_id: 1, employee_id: staff.id, supervisor_id: 7, date: '2026-11-04', tasks: [{ id: 42, status: 'Planned' }], status: 'SUBMITTED' });
  await db.insert('schedules', { company_id: 2, employee_id: other.id, supervisor_id: 7, date: '2026-11-04', status: 'SUBMITTED' });

  await t.test('Unlinked users cannot use a coinciding user ID as an employee ID', async () => {
    const res = response();
    await scheduleController.getMySchedules({ user: { id: 500, company_id: 1, role_code: 'STAFF_MEMBER', employee: { id: 8 } }, query: {} }, res);
    assert.equal(res.statusCode, 400); assert.match(res.body.error.message, /linked employee/);
  });
  await t.test('Administrators without staff profiles can see their company roster only', async () => {
    const res = response();
    await scheduleController.getSupervisorSchedules({ user: { id: 800, company_id: 1, role_code: 'HR' }, query: { company_id: 2 } }, res);
    assert.equal(res.statusCode, 200); assert.deepEqual(res.body.data.schedules.map(s => s.id), [own.id]);
    const hr = await scheduleService.getHRSchedules({}, 1);
    assert.ok(hr.schedules.every(s => s.company_id === 1));
    await assert.rejects(scheduleService.getHRSchedules({ company_id: 1 }), /Company context/);
    const supervisor = await scheduleService.getSupervisorSchedules(7, {}, 'SUPERVISOR', 1);
    assert.ok(supervisor.team.every(e => e.id !== other.id));
    assert.deepEqual((await scheduleService.getEmployeeSchedules(other.id, {}, 1)), []);
  });
  await t.test('Task IDs from URL strings update numeric JSON IDs and reject missing tasks', async () => {
    const updated = await scheduleService.updateTaskItemStatus(own.id, staff.id, '42', 'Completed');
    assert.equal(updated.tasks[0].status, 'Completed');
    await assert.rejects(scheduleService.updateTaskItemStatus(own.id, staff.id, 'missing', 'Completed'), /Task not found/);
    await assert.rejects(scheduleService.updateTaskItemStatus(own.id, staff.id, '42', 'invalid'), /Invalid task/);
    await assert.rejects(scheduleService.updateTaskItemStatus(own.id, 7, '42', 'Completed'), /Unauthorized/);
  });
  await t.test('Deactivation uses the supported inactive state and disables sign-in', async () => {
    const updated = await hrService.updateStaffStatus(staff.id, 'deactivated', admin);
    assert.equal(updated.status, 'inactive');
    assert.equal((await db.findById('users', staff.user_id)).status, 'suspended');
    await assert.rejects(hrService.updateStaffStatus(other.id, 'active', admin), /not found/);
    await assert.rejects(hrService.updateStaffStatus(staff.id, 'invented', admin), /Invalid/);
    const res = response();
    await scheduleController.getTodaySchedule({ user: { id: staff.user_id, company_id: 1 }, query: {} }, res);
    assert.equal(res.statusCode, 400);
    await hrService.updateStaffStatus(staff.id, 'active', admin);
    assert.equal((await db.findById('users', staff.user_id)).status, 'active');
  });
  await t.test('Sales settlement creates actual schema fields and preserves reference and variance', async () => {
    const actor = await db.findById('users', staff.user_id);
    const req = { user: { ...actor, employee: staff }, headers: {} };
    const created = await salesService.createSettlement({ amount: '90', expected_amount: '100', deposit_reference: 'FIXTURE-REF', notes: 'Fixture note' }, staff.id, null, req);
    const stored = await db.findById('settlements', created.id);
    mysqlRecord('settlements', stored);
    assert.equal(stored.total_collected, 100); assert.equal(stored.bank_transfer_amount, 90); assert.equal(stored.cash_in_hand, 10);
    assert.equal(created.difference, -10); assert.equal(created.deposit_reference, 'FIXTURE-REF');
    const listed = await salesService.getSettlements(staff.id, 1);
    assert.equal(listed[0].notes, 'Fixture note');
    assert.deepEqual(await salesService.getSettlements(staff.id, 2), []);
    await assert.rejects(salesService.createSettlement({ amount: '-1' }, staff.id, null, req), /non-negative/);
    await assert.rejects(salesService.createSettlement({ amount: '' }, staff.id, null, req), /non-negative/);
    await assert.rejects(salesService.createSettlement({ amount: '100' }, other.id, null, req), /linked/);
  });
  await t.test('Executive metrics cannot mix companies or count rejected sales as revenue', async () => {
    await db.insert('orders', { company_id: 1, status: 'REJECTED', order_date: new Date().toISOString(), total_amount: 9000 });
    await db.insert('orders', { company_id: 2, status: 'delivered', order_date: new Date().toISOString(), total_amount: 5000 });
    const dashboard = await executiveService.getCEODashboardMetrics(1);
    assert.equal(dashboard.revenue, 0); assert.equal(dashboard.totalEmployees, 9);
    await assert.rejects(executiveService.getCEODashboardMetrics(), /Company context/);
  });
});
