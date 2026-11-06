import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import {db} from '../config/database.js';
import {employeeNumberingService as numbering} from '../services/employeeNumberingService.js';
import {employeeNumberCorrectionService as corrections} from '../services/employeeNumberCorrectionService.js';
import {findUserByIdentifier,authService} from '../services/authService.js';

const record=(changes={})=>({company_id:1,department:'IT',first_name:'Correction',last_name:'Fixture',hire_date:'2026-01-12',status:'active',...changes});
test('Super Admin staff ID corrections preserve ownership and identity',async t=>{
 db.resetToSeed();
 const admin=await db.insert('users',{company_id:1,role_code:'SUPER_ADMIN',status:'active',email:'admin@correction.test'});
 const user=await db.insert('users',{company_id:1,role_code:'STAFF_MEMBER',status:'active',email:'staff@correction.test',password_hash:bcrypt.hashSync('IsolatedCorrection123!',4)});
 const e=await numbering.create(record({user_id:user.id})),original=e.employee_code;
 const change={employee_number:'FIN20260025',reason:'Correct imported department classification.',confirmation:original};
 const task=await db.insert('tasks',{company_id:1,assigned_to:e.id,title:'Preserved assignment'});
 await t.test('rejects ordinary roles, forged persisted roles, inactive administrators and other companies',async()=>{
  for(const role_code of ['HR','HR_MANAGER','ADMIN','CEO','IT_ADMIN','STAFF_MEMBER'])await assert.rejects(corrections.correct(e.id,change,{...admin,role_code}),{status:403});
  await assert.rejects(corrections.correct(e.id,change,{...user,role_code:'SUPER_ADMIN'}),{status:403});
  await db.update('users',admin.id,{status:'inactive'});await assert.rejects(corrections.correct(e.id,change,admin),{status:403});await db.update('users',admin.id,{status:'active'});
  await assert.rejects(corrections.correct(e.id,change,{...admin,company_id:2}),{status:403});
  const foreign=await numbering.create(record({company_id:2}));await assert.rejects(corrections.correct(foreign.id,{...change,confirmation:foreign.employee_code},admin),{status:404});
 });
 await t.test('validates format, year, reason and current confirmation before changing anything',async()=>{
  for(const employee_number of ['08077305206','EMP-XLSX-1','VERIFY-1','IT20260000','IT18990001','IT202600001'])await assert.rejects(corrections.correct(e.id,{...change,employee_number},admin));
  await assert.rejects(corrections.correct(e.id,{...change,employee_number:'IT20250025'},admin),/saved hiring date/);
  await assert.rejects(corrections.correct(e.id,{...change,reason:'short'},admin),/10 to 500/);
  await assert.rejects(corrections.correct(e.id,{...change,confirmation:'stale'},admin),{status:409});
  assert.equal((await db.findById('employees',e.id)).employee_code,original);
 });
 await t.test('corrects both displayed IDs, audits old/new values, reserves the previous number and keeps history',async()=>{
  const updated=await corrections.correct(e.id,{...change,employee_number:' fin20260025 '},admin);
  assert.equal(updated.id,e.id);assert.equal(updated.user_id,user.id);assert.equal(updated.employee_code,change.employee_number);assert.equal(updated.staff_id,change.employee_number);assert.equal(updated.numbering_department_code,'FIN');assert.equal(updated.department,'IT');
  assert.equal((await db.findById('employee_number_registry',original)).employee_id,null);
  const active=await db.findById('employee_number_registry',change.employee_number);assert.equal(active.employee_id,e.id);assert.equal(active.legacy_employee_code,original);
  const audit=await db.findOne('audit_logs',{action:'EMPLOYEE_NUMBER_CORRECTED',entity_id:String(e.id)});assert.equal(audit.actor_id,admin.id);assert.equal(audit.metadata.previous_employee_number,original);assert.equal(audit.metadata.reason,change.reason);
  assert.equal((await db.findById('tasks',task.id)).assigned_to,e.id);
  const afterUser=await db.findById('users',user.id);assert.equal(afterUser.password_hash,user.password_hash);assert.equal(afterUser.status,'active');
 });
 await t.test('new ID authenticates with unchanged password; old ID no longer resolves; subsequent issue preserves correction',async()=>{
  assert.equal(await findUserByIdentifier(original),null);assert.equal((await findUserByIdentifier(change.employee_number.toLowerCase())).id,user.id);
  assert.ok((await authService.login(change.employee_number,'IsolatedCorrection123!')).token);
  assert.equal((await numbering.assign(e.id,'HR',admin)).employee_code,change.employee_number);
  assert.equal((await numbering.create(record({department:'Finance'}))).employee_code,'FIN20260026');
 });
 await t.test('cannot use an active or retired number, even after another correction',async()=>{
  await assert.rejects(corrections.correct(e.id,{...change,employee_number:original,confirmation:change.employee_number},admin),/already reserved/);
  await assert.rejects(corrections.correct(e.id,change,admin),/changed since/);
  const other=await numbering.create(record());await assert.rejects(corrections.correct(other.id,{...change,confirmation:other.employee_code},admin),/already reserved/);
 });
 await t.test('concurrent claims grant a free ID once and rejected correction rolls back all changes',async()=>{
  const targets=await Promise.all([1,2].map(()=>numbering.create(record())));
  const results=await Promise.allSettled(targets.map(e=>corrections.correct(e.id,{...change,employee_number:'HR20260040',confirmation:e.employee_code},admin)));
  assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
  const rejectedIndex=results.findIndex(r=>r.status==='rejected');assert.equal((await db.findById('employees',targets[rejectedIndex].id)).employee_code,targets[rejectedIndex].employee_code);
  const before=await db.findById('employees',e.id),registry=await db.find('employee_number_registry');
  const insert=db.insert;db.insert=async function(table,...args){if(table==='audit_logs')throw new Error('Simulated audit outage');return insert.call(this,table,...args);};
  try{await assert.rejects(corrections.correct(e.id,{...change,employee_number:'FIN20260090',confirmation:before.employee_code},admin),/audit outage/);}finally{db.insert=insert;}
  assert.deepEqual(await db.find('employee_number_registry'),registry);assert.deepEqual(await db.findById('employees',e.id),before);
 });
 await t.test('requires restoration and a corrected source date when necessary',async()=>{
  const pending=await db.insert('employees',record({employee_code:'IMPORT-PENDING',hire_date:'1993-06-03',date_of_birth:'1994-01-01'}));
  await assert.rejects(corrections.correct(pending.id,{...change,employee_number:'STG19930001',confirmation:pending.employee_code},admin),/precedes/);
  await db.update('employees',pending.id,{hire_date:'2020-06-03'});assert.equal((await corrections.correct(pending.id,{...change,employee_number:'STG20200001',confirmation:pending.employee_code},admin)).employee_code,'STG20200001');
  await db.update('employees',pending.id,{deleted_at:new Date().toISOString()});await assert.rejects(corrections.correct(pending.id,{...change,employee_number:'STG20200002',confirmation:'STG20200001'},admin),/Restore/);
 });
});
