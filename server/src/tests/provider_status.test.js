import test from 'node:test';
import assert from 'node:assert/strict';
import { db, resetTestData } from './helpers/database.js';
import { salesController } from '../controllers/salesController.js';
import { reminderWorker } from '../services/reminderWorker.js';
import { emailService } from '../services/emailService.js';

test('Unconfigured providers never fabricate payments or successful reminder delivery', async t => {
  await resetTestData();
  await t.test('A browser-supplied Paystack reference cannot record money or clear debt', async () => {
    const customer = await db.insert('customers', { company_id: 1, code: 'TEST-PAY', name: 'Fixture customer', balance: 100 });
    const order = await db.insert('orders', { company_id: 1, customer_id: customer.id, total_amount: 100, payment_status: 'unpaid' });
    const result = { statusCode: 200, status(code) { this.statusCode=code; return this; }, json(body) { this.body=body; return this; } };
    await salesController.processPaystackPayment({ user: await db.findById('users', 4), body: { customer_id: customer.id, order_id: order.id, amount: 100, paystack_reference: 'fabricated' } }, result);
    assert.equal(result.statusCode, 503); assert.match(result.body.error.message, /No payment has been recorded/);
    assert.equal((await db.find('collections')).length, 0);
    assert.equal((await db.findById('customers', customer.id)).balance, 100);
    assert.equal((await db.findById('orders', order.id)).payment_status, 'unpaid');
  });
  const task = await db.insert('tasks', { company_id: 1, assigned_to: 4, title: 'Fixture reminder', status: 'pending' });
  await t.test('A simulated email is not recorded as sent', async () => {
    const mocked=t.mock.method(emailService, 'sendTaskReminderEmail', async () => ({ delivered: false, simulated: true }));
    try {
      const reminder=await db.insert('task_reminders', { company_id: 1, task_id: task.id, employee_id: 4, user_id: 4, channels: ['email'], status: 'scheduled' });
      await reminderWorker.processSingleReminder(reminder);
      const stored=await db.findById('task_reminders', reminder.id);
      assert.equal(stored.status, 'failed'); assert.equal(stored.sent_at, null);
      const logs=await db.find('reminder_delivery_logs', { reminder_id: reminder.id });
      assert.equal(logs[0].status, 'not_configured');
    } finally { mocked.mock.restore(); }
  });
  await t.test('Provider acceptance and in-app delivery remain successful', async () => {
    const mocked=t.mock.method(emailService, 'sendTaskReminderEmail', async () => ({ delivered: true, messageId: 'fixture-provider-id' }));
    try {
      const reminder=await db.insert('task_reminders', { company_id: 1, task_id: task.id, employee_id: 4, user_id: 4, channels: ['in_app','email'], status: 'scheduled' });
      await reminderWorker.processSingleReminder(reminder);
      assert.equal((await db.findById('task_reminders',reminder.id)).status,'sent');
      const logs=await db.find('reminder_delivery_logs',{reminder_id:reminder.id});
      assert.equal(logs.filter(log=>log.status==='sent').length,2);
      assert.equal(logs.find(log=>log.channel==='email').provider_message_id,'fixture-provider-id');
    } finally { mocked.mock.restore(); }
  });
});
