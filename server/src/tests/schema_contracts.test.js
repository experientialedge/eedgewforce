import test from 'node:test';
import assert from 'node:assert/strict';
import { db, resetTestData } from './helpers/database.js';
import { mysqlRecord, columnDefinition, mysqlSchema } from '../config/mysqlSchema.js';
import { sosService } from '../services/sosService.js';
import { notificationService } from '../services/notificationService.js';
import { idleService } from '../services/idleService.js';
import { scheduleService } from '../services/scheduleService.js';
import { accountingService } from '../services/accountingService.js';
import { schemaPatch } from '../utils/schemaPatch.js';
import { emailService } from '../services/emailService.js';

test('Production column contracts: emergencies, notifications, inactivity, schedule reviews and reconciliation', async t => {
  await resetTestData();
  const saved = { insert: db.insert, update: db.update, find: db.find };
  const checked = [];
  t.after(() => Object.assign(db, saved));
  db.insert = async function(table, record) {
    mysqlRecord(table, record);
    for (const [name, column] of Object.entries(mysqlSchema[table].columns)) {
      if (name !== 'id' && column.required && column.default === undefined) assert.notEqual(record[name], undefined, `${table}.${name} is required`);
    }
    checked.push(`${table}:insert`);
    return saved.insert.call(this, table, record);
  };
  db.update = async function(table, id, changes) { mysqlRecord(table, changes); checked.push(`${table}:update`); return saved.update.call(this, table, id, changes); };
  db.find = async function(table, filter, options = {}) {
    mysqlRecord(table, filter || {});
    if (options.order) columnDefinition(table, options.order.column);
    return saved.find.call(this, table, filter, options);
  };
  t.mock.method(emailService, 'sendIdleAlertEmail', async () => ({ skipped: true }));
  const actor = await db.insert('users', { company_id: 1, full_name: 'Contract HR', email: 'contract-hr@example.test', password_hash: 'fixture', role_code: 'HR_MANAGER', status: 'active' });
  const user = await db.insert('users', { company_id: 1, full_name: 'Contract staff', email: 'contract-staff@example.test', password_hash: 'fixture', role_code: 'FIELD_AGENT', status: 'active' });
  const employee = await db.insert('employees', { company_id: 1, user_id: user.id, employee_code: 'CONTRACT-STAFF', first_name: 'Contract', last_name: 'Staff', status: 'active', base_salary: 100000 });
  const hr = await db.insert('employees', { company_id: 1, user_id: actor.id, employee_code: 'CONTRACT-HR', first_name: 'Contract', last_name: 'HR', status: 'active' });
  const identity = { ...user, employee };
  const req = { user: identity, headers: {} };

  await t.test('SOS preserves real GPS accuracy, supports legacy history and prevents cross-company review', async () => {
    await assert.rejects(sosService.dispatch(employee.id, null, null), /GPS/);
    await assert.rejects(sosService.dispatch(employee.id, 6, 3, -1), /accuracy/);
    const event = await sosService.dispatch(employee.id, 0, 0, 0, 'Fixture emergency', req);
    assert.equal(event.latitude, 0); assert.equal(event.accuracy, 0);
    const stored = await db.findById('sos_events', event.id);
    assert.equal(stored.agent_id, user.id); assert.equal(stored.employee_id, employee.id);
    await db.insert('sos', { company_id: 1, employee_id: employee.id, latitude: 6, longitude: 3, status: 'ACTIVE' });
    const list = await sosService.list(1, 'active');
    assert.ok(list.some(r => String(r.id).startsWith('legacy:')));
    await assert.rejects(sosService.review(event.id, { ...actor, company_id: 2 }), /not found/);
    await sosService.review(event.id, actor);
    assert.equal((await db.findById('sos_events', event.id)).status, 'acknowledged');
    await sosService.review(event.id, actor, 'Fixture resolved');
    assert.equal((await db.findById('sos_events', event.id)).status, 'resolved');
    await assert.rejects(sosService.review(event.id, actor), /already resolved/);
    const legacy = list.find(r => String(r.id).startsWith('legacy:'));
    await sosService.review(legacy.id, actor, 'Legacy resolved');
  });
  await t.test('Notifications use is_read and expose compatible navigation and read state', async () => {
    const notice = await notificationService.notify(employee.id, 'Tasks', 'Fixture task', 'Fixture body', '/tasks/1');
    assert.equal(notice.read, false); assert.equal(notice.link, 'tasks');
    assert.equal((await db.findById('notifications', notice.id)).is_read, false);
    await notificationService.markRead(notice.id, employee.id);
    assert.equal((await notificationService.getNotifications(employee.id)).unreadCount, 0);
  });
  await t.test('Ten-minute inactivity records and employee explanations persist in actual columns', async () => {
    const session = await idleService.startIdleSession({ duration_seconds: 600, explanation: 'Fixture explanation' }, identity, req);
    assert.equal((await db.findById('employee_idle_sessions', session.id)).idle_duration_minutes, 10);
    await idleService.explainIdleSession(session.id, { reason: 'Break', reason_details: 'Fixture returned' }, identity, req);
    const records = await idleService.getIdleSessions({}, identity);
    assert.equal(records.find(r => r.id === session.id).reason_details, 'Fixture returned');
    assert.equal(records.find(r => r.id === session.id).duration_seconds, 600);
    await assert.rejects(idleService.explainIdleSession(session.id, { reason: 'Other' }, { ...actor, employee: hr }), /own activity/);
  });
  await t.test('Schedules preserve task JSON, supervisor status and HR status after the additive upgrade', async () => {
    const schedule = await scheduleService.createOrUpdateSchedule(employee.id, { status: 'DRAFT', title: 'Fixture shift', tasks: [{ activity: 'Fixture visit' }] });
    await scheduleService.reviewSupervisorSchedule(schedule.id, hr.id, { status: 'APPROVED' });
    await scheduleService.reviewHRSchedule(schedule.id, actor.id, { status: 'ACKNOWLEDGED' });
    const stored = await db.findById('schedules', schedule.id);
    assert.equal(stored.supervisor_status, 'APPROVED'); assert.equal(stored.hr_status, 'ACKNOWLEDGED');
    assert.equal(stored.title, 'Fixture shift'); assert.equal(stored.tasks.length, 1);
  });
  await t.test('Settlement review writes audited fields and retains notes in the audit trail', async () => {
    const settlement = await db.insert('settlements', { company_id: 1, agent_id: employee.id, total_collected: 100 });
    await accountingService.reviewSettlement(settlement.id, 'approved', 'Fixture counted', actor);
    const stored = await db.findById('settlements', settlement.id);
    assert.equal(stored.reconciliation_status, 'approved'); assert.equal(stored.audited_by, actor.id);
    assert.ok((await db.find('audit_logs', { entity: 'settlements' })).some(r => r.metadata.notes === 'Fixture counted'));
  });
  await t.test('Calculated and uploaded payslips persist snake-case payroll fields', async () => {
    const payslip = await accountingService.generateSinglePayslip(employee.id, '2026-11-01', {}, actor);
    assert.equal(payslip.basic_salary, 100000); assert.ok(Number.isFinite(payslip.net_pay));
    assert.equal(payslip.basicSalary, undefined);
    await accountingService.uploadCustomPayslip(employee.id, '2026-11-01', '/uploads/fixture.pdf', 'Fixture', actor);
    await accountingService.generatePayrollBatch('2026-12-01', actor);
  });
  await t.test('Dynamic update payloads reject absent columns and ownership changes', () => {
    for (const table of ['company_settings', 'customers', 'products', 'ranks']) {
      assert.throws(() => schemaPatch(table, { invented_column: 1 }), /Unsupported/);
      assert.throws(() => schemaPatch(table, { company_id: 2 }), /ownership/);
    }
    assert.deepEqual(schemaPatch('customers', { name: 'Updated' }), { name: 'Updated' });
  });
  assert.ok(checked.includes('sos_events:insert') && checked.includes('notifications:update') && checked.includes('schedules:update'));
});
