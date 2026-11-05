import test from 'node:test';
import assert from 'node:assert/strict';
import {db} from '../config/database.js';
import {departmentCode,hiringYear,formatEmployeeNumber} from '../utils/employeeNumber.js';
import {employeeNumberingService as numbering} from '../services/employeeNumberingService.js';
import {staffLifecycleService} from '../services/staffLifecycleService.js';
import {hrService} from '../services/hrService.js';
import {authService} from '../services/authService.js';
import bcrypt from 'bcryptjs';

const admin={id:1,company_id:1,role_code:'SUPER_ADMIN',status:'active',email:'admin@example.test'};
const record=(department='IT',changes={})=>({company_id:1,department,first_name:'Example',last_name:'Staff',hire_date:'2026-11-05',status:'active',...changes});
test('permanent department/year employee numbering and staff lifecycle',async t=>{
 db.resetToSeed();
 await db.insert('users',admin);
 await t.test('uses the approved department codes, exact hiring year and four-digit counters',()=>{
  for(const [label,code] of [['Finance & Accounts','FIN'],['Human Resources','HR'],['Technology & IT','IT'],['Sales & Marketing','SM'],['Operations','OPS'],['Strategy','STG'],['Creative','CRE'],['Compliance','CMP'],['Procurement','PUR'],['Executive','EXE']])assert.equal(departmentCode(label),code);
  assert.equal(hiringYear({date_of_joining:'2023-02-01',hire_date:'2026-11-05'}),2023);
  assert.throws(()=>hiringYear({hire_date:'2026-02-31'}),/valid hiring/);
  assert.throws(()=>hiringYear({hire_date:'1993-06-03',date_of_birth:'1994-01-01'}),/precedes/);
  assert.throws(()=>departmentCode('Unclassified company label'),/HR-approved/);
  assert.throws(()=>formatEmployeeNumber('IT',2026,10000),/capacity/);
 });
 await t.test('numbers three IT hires and two Finance hires independently',async()=>{
  const it=await Promise.all([1,2,3].map(()=>numbering.create(record())));
  const finance=await Promise.all([1,2].map(()=>numbering.create(record('Finance'))));
  assert.deepEqual(it.map(e=>e.employee_code),['IT20260001','IT20260002','IT20260003']);
  assert.deepEqual(finance.map(e=>e.employee_code),['FIN20260001','FIN20260002']);
  assert.ok([...it,...finance].every(e=>e.staff_id===e.employee_code&&Number.isInteger(e.id)));
 });
 await t.test('serialises concurrent allocation, scopes years and rejects capacity overflow',async()=>{
  const hires=await Promise.all(Array.from({length:24},()=>numbering.create(record())));
  assert.equal(new Set(hires.map(e=>e.employee_code)).size,24);
  assert.equal((await numbering.create(record('IT',{hire_date:'2025-01-01'}))).employee_code,'IT20250001');
  await db.update('employee_number_counters','IT:2026',{last_value:9999});
  const count=(await db.find('employees')).length;
  await assert.rejects(numbering.create(record()),/capacity/);assert.equal((await db.find('employees')).length,count);
 });
 await t.test('repeated assignment and a department transfer preserve an issued ID',async()=>{
  const e=(await db.find('employees'))[0];
  assert.equal((await numbering.assign(e.id,'FIN',admin)).employee_code,e.employee_code);
  await hrService.updateEmployee(e.id,{department:'Finance'},admin);
  assert.equal((await db.findById('employees',e.id)).employee_code,e.employee_code);
  await assert.rejects(hrService.updateEmployee(e.id,{staff_id:'FIN20260099'},admin),/permanent/);
 });
 await t.test('deleting blocks login, retains history and numbering, and supports safe restoration',async()=>{
  const user=await db.insert('users',{company_id:1,email:'leaver@example.test',status:'active',role_code:'STAFF_MEMBER',password_hash:bcrypt.hashSync('ExamplePasswordOnly!',4)});
  const employee=await numbering.create(record('Sales',{user_id:user.id}));
  const task=await db.insert('tasks',{assigned_to:employee.id,title:'Retained history'});
  const session=await db.insert('workforce_access_sessions',{company_id:1,user_id:user.id,state:'active'});
  const change={reason:'Employee has left the organisation.',confirmation:employee.employee_code};
  await assert.rejects(staffLifecycleService.change(employee.id,{...change,confirmation:'wrong'},admin),/exact current/);
  await assert.rejects(staffLifecycleService.change(employee.id,change,{...admin,role_code:'STAFF_MEMBER'}),/authorised/);
  await assert.rejects(staffLifecycleService.change(employee.id,change,{...admin,company_id:2}),/not found/);
  const removed=await staffLifecycleService.change(employee.id,change,admin);assert.ok(removed.deleted_at);
  assert.equal((await db.findById('users',user.id)).status,'inactive');
  assert.equal((await db.findById('workforce_access_sessions',session.id)).state,'revoked');
  assert.ok(await db.findById('tasks',task.id));assert.ok(await db.findOne('employee_number_registry',{id:employee.employee_code}));
  assert.ok(!(await hrService.getEmployees(admin)).some(e=>e.id===employee.id));
  assert.ok((await hrService.getEmployees(admin,{includeDeleted:true})).some(e=>e.id===employee.id));
  await assert.rejects(authService.login(employee.employee_code,'ExamplePasswordOnly!'),/deactivated/);
  await assert.rejects(hrService.updateStaffStatus(employee.id,'active',admin),/Restore/);
  const next=await numbering.create(record('Sales'));assert.notEqual(next.employee_code,employee.employee_code);
  const restored=await staffLifecycleService.change(employee.id,{...change,restore:true},admin);
  assert.equal(restored.employee_code,employee.employee_code);assert.equal(restored.status,'inactive');assert.equal(restored.deleted_at,null);
 });
 await t.test('prevents self-deletion and HR removal of privileged administrators',async()=>{
  const own=await numbering.create(record('HR',{user_id:1}));
  await assert.rejects(staffLifecycleService.change(own.id,{reason:'Prevent unsafe self deletion.',confirmation:own.employee_code},admin),/own staff/);
  const protectedUser=await db.insert('users',{company_id:1,role_code:'ADMIN',status:'active'});
  const employee=await numbering.create(record('HR',{user_id:protectedUser.id}));
  await assert.rejects(staffLifecycleService.change(employee.id,{reason:'Privileged account removal.',confirmation:employee.employee_code},{...admin,id:999,role_code:'HR_MANAGER'}),/super administrator/);
 });
});
