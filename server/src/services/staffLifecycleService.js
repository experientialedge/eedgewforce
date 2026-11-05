import {db} from '../config/database.js';
const roles=['HR','HR_MANAGER','CEO','SUPER_ADMIN','ADMIN'];
export const staffLifecycleService={
 async change(employeeId,{reason,confirmation,restore=false},actor){
  if(!actor?.id||!actor.company_id||!roles.includes(actor.role_code))throw Object.assign(new Error('Not authorised to delete or restore staff.'),{status:403});
  reason=String(reason||'').trim();if(reason.length<10||reason.length>500)throw new Error('Provide a reason of 10 to 500 characters.');
  if(db.isCloud&&db.backend==='supabase')return db.rpc('archive_employee',{p_employee_id:Number(employeeId),p_company_id:Number(actor.company_id),p_actor_id:Number(actor.id),p_reason:reason,p_confirmation:String(confirmation||'').trim(),p_restore:restore});
  return db.transaction(async()=>{
   const employee=await db.findById('employees',employeeId);
   if(!employee||Number(employee.company_id)!==Number(actor.company_id))throw new Error('Employee not found.');
   if(String(confirmation||'').trim()!==String(employee.employee_code))throw new Error('Confirm the exact current employee number.');
   if(Number(employee.user_id)===Number(actor.id))throw new Error('You cannot delete or restore your own staff account.');
   const user=employee.user_id?await db.findById('users',employee.user_id):null;
   if(user&&Number(user.company_id)!==Number(actor.company_id))throw new Error('Linked account belongs to a different company.');
   if(['SUPER_ADMIN','ADMIN','CEO'].includes(user?.role_code)&&actor.role_code!=='SUPER_ADMIN')throw Object.assign(new Error('Only a super administrator can manage this privileged account.'),{status:403});
   if(!restore&&user?.status==='active'&&['SUPER_ADMIN','ADMIN'].includes(user.role_code)&&!(await db.find('users',{company_id:actor.company_id,status:'active'})).some(u=>u.id!==user.id&&['SUPER_ADMIN','ADMIN'].includes(u.role_code)))throw new Error('The last active administrator cannot be deleted.');
   if(restore?!employee.deleted_at:employee.deleted_at)return employee;
   const time=new Date().toISOString();
   const updated=await db.update('employees',employee.id,{deleted_at:restore?null:time,deleted_by:restore?null:actor.id,deletion_reason:restore?null:reason,status:'inactive'});
   if(user){
    await db.update('users',user.id,{status:'inactive',session_invalid_before:time});
    for(const session of await db.find('workforce_access_sessions',{user_id:user.id,company_id:actor.company_id}))if(['active','pending'].includes(session.state))await db.update('workforce_access_sessions',session.id,{state:'revoked',revoked_at:time,revoke_reason:'staff_record_removed'});
   }
   await db.insert('audit_logs',{company_id:actor.company_id,actor_id:actor.id,actor_email:actor.email,action:restore?'STAFF_RESTORED':'STAFF_DELETED',entity:'employees',entity_id:String(employee.id),metadata:{employee_number:employee.employee_code,reason,history_retained:true},created_at:time});
   return updated;
  });
 }
};
