import { db } from '../config/database.js';

export async function activeEmployeeId(user) {
  if (!user?.id || !user.company_id) throw Object.assign(new Error('An active linked employee profile is required.'), { status: 403 });
  const employee = await db.findOne('employees', { user_id: user.id, company_id: user.company_id });
  if (!employee || String(employee.status).toLowerCase() !== 'active') throw Object.assign(new Error('An active linked employee profile is required.'), { status: 403 });
  return employee.id;
}
