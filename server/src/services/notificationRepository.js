import { db } from '../config/database.js';

// Links are presentation routes. Persist only the notification columns shared by both production databases.
export function presentNotification(row) {
  const links = { SOS: 'hr', HR: 'hr', Tasks: 'tasks', Schedule: 'schedule', System: 'it_admin' };
  return { ...row, read: Boolean(row.is_read ?? row.read), link: row.link || links[row.type] || 'notifications' };
}
export async function createNotification({ employee_id, company_id, type = 'System', title, body }) {
  const employee = await db.findById('employees', employee_id);
  if (!employee || (company_id != null && Number(employee.company_id) !== Number(company_id))) throw new Error('Notification recipient not found.');
  const row = await db.insert('notifications', { employee_id: Number(employee.id), company_id: Number(employee.company_id), type, title, body, is_read: false });
  return presentNotification(row);
}
