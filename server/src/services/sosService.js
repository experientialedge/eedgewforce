import { db } from '../config/database.js';
import { validateCoordinates } from '../utils/haversine.js';
import { recordAudit } from '../middleware/auditLogger.js';
import { createNotification } from './notificationRepository.js';
import { logger } from '../utils/logger.js';

const responders = ['SUPER_ADMIN', 'ADMIN', 'CEO', 'CTO', 'HR', 'HR_MANAGER', 'IT_ADMIN', 'SUPERVISOR', 'MANAGER'];
const failure = (message, status = 400) => Object.assign(new Error(message), { status });
function present(row, legacy = false) {
  return { ...row, id: legacy ? `legacy:${row.id}` : row.id, source: legacy ? 'sos' : 'sos_events',
    agent_id: row.employee_id, status: String(row.status).toLowerCase(), message: row.message || row.emergency_type };
}

export const sosService = {
  async dispatch(employeeId, latitude, longitude, accuracy = null, message = 'Emergency Assistance Required', req = null) {
    if (!validateCoordinates(latitude, longitude).valid) throw failure('Live GPS coordinates are required to dispatch an emergency.');
    if (accuracy != null && (!Number.isFinite(Number(accuracy)) || Number(accuracy) < 0)) throw failure('GPS accuracy must be a non-negative number.');
    const employee = await db.findById('employees', employeeId);
    if (!employee || employee.status !== 'active' || (req?.user && (Number(req.user.company_id) !== Number(employee.company_id) || Number(req.user.employee?.id) !== Number(employee.id)))) throw failure('A linked active staff profile is required.', 403);
    const event = await db.insert('sos_events', { company_id: Number(employee.company_id), employee_id: Number(employee.id),
      agent_id: employee.user_id ? Number(employee.user_id) : null, latitude: Number(latitude), longitude: Number(longitude),
      accuracy: accuracy == null ? null : Number(accuracy), message: String(message || 'Emergency Assistance Required').slice(0, 2000), status: 'active' });
    // Persist the emergency first. A notification transport failure must never tell the employee that dispatch failed.
    let failures = 0;
    try {
      const users = await db.find('users', { company_id: Number(employee.company_id), status: 'active' });
      const delivery = await Promise.allSettled(users.filter(u => responders.includes(u.role_code)).map(async u => {
      const target = await db.findOne('employees', { user_id: u.id, company_id: Number(employee.company_id) });
      if (target) await createNotification({ employee_id: target.id, company_id: employee.company_id, type: 'SOS', title: 'EMERGENCY SOS BEACON ACTIVE',
        body: `${employee.first_name} ${employee.last_name}: ${event.message}. GPS: ${event.latitude}, ${event.longitude}. Immediate attention required.` });
      }));
      failures = delivery.filter(r => r.status === 'rejected').length;
    } catch (error) {
      failures++;
      logger.error('SOS recorded; notification delivery requires retry.', { event_id: event.id });
    }
    await recordAudit(req?.user || { id: employee.user_id, company_id: employee.company_id }, 'SOS_TRIGGERED', 'sos_events', event.id,
      { latitude: event.latitude, longitude: event.longitude, accuracy: event.accuracy, notification_failures: failures }, req);
    return { ...present(event), notification_delivery: failures ? 'partial' : 'complete' };
  },
  async list(companyId = 1, status = null) {
    const filter = { company_id: Number(companyId) };
    const [events, legacy, employees] = await Promise.all([db.findAll('sos_events', filter), db.findAll('sos', filter), db.find('employees', filter)]);
    return [...events.map(r => present(r)), ...legacy.map(r => present(r, true))]
      .filter(r => !status || r.status === String(status).toLowerCase())
      .map(r => ({ ...r, agent: employees.find(e => Number(e.id) === Number(r.employee_id)) }))
      .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  },
  async review(id, actor, resolutionNotes, req = null) {
    if (!actor || !responders.includes(actor.role_code)) throw failure('Emergency responder access required.', 403);
    const value = String(id), legacy = value.startsWith('legacy:'), numeric = legacy ? value.slice(7) : value;
    if (!/^\d+$/.test(numeric)) throw failure('Emergency not found.', 404);
    const table = legacy ? 'sos' : 'sos_events';
    const event = await db.findById(table, Number(numeric));
    if (!event || Number(event.company_id) !== Number(actor.company_id)) throw failure('Emergency not found.', 404);
    const resolving = resolutionNotes !== undefined;
    if (!resolving && String(event.status).toLowerCase() === 'resolved') throw failure('This emergency is already resolved.', 409);
    const updated = resolving
      ? await db.update(table, event.id, { status: 'resolved', resolved_by: Number(actor.id), resolved_at: new Date().toISOString(), resolution_notes: String(resolutionNotes || '').slice(0, 4000) })
      : await db.update(table, event.id, { status: 'acknowledged', acknowledged_by: Number(actor.id), acknowledged_at: new Date().toISOString() });
    await recordAudit(actor, resolving ? 'SOS_RESOLVED' : 'SOS_ACKNOWLEDGED', table, event.id, {}, req);
    return present(updated, legacy);
  }
};
