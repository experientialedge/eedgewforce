import {db} from '../config/database.js';
import {EMPLOYEE_NUMBER_PATTERN,formatEmployeeNumber,hiringYear} from '../utils/employeeNumber.js';

const fail=(message,status=400)=>Object.assign(new Error(message),{status});
export function correctionInput({employee_number,reason,confirmation}={}){
 const number=String(employee_number||'').trim().toUpperCase(),match=number.match(EMPLOYEE_NUMBER_PATTERN);
 if(!match)throw fail('Use an approved department code, four-digit hiring year and four-digit sequence, for example IT20260001.');
 formatEmployeeNumber(match[1],Number(match[2]),Number(match[3]));
 reason=String(reason||'').trim();if(reason.length<10||reason.length>500)throw fail('Provide a correction reason of 10 to 500 characters.');
 return {number,code:match[1],year:Number(match[2]),sequence:Number(match[3]),reason,confirmation:String(confirmation||'').trim()};
}

export const employeeNumberCorrectionService={
 async correct(employeeId,input,actor){
  if(!actor?.id||!actor.company_id||actor.role_code!=='SUPER_ADMIN')throw fail('Only an active Super Admin can correct a staff ID.',403);
  const correction=correctionInput(input);
  if(db.isCloud&&db.backend==='supabase'){
   try{return await db.rpc('correct_employee_number',{p_employee_id:Number(employeeId),p_company_id:Number(actor.company_id),p_actor_id:Number(actor.id),p_employee_number:correction.number,p_reason:correction.reason,p_confirmation:correction.confirmation});}
   catch(error){if(/already reserved|changed since|same as the current/i.test(error.message))error.status=409;else if(/Only an active Super Admin/i.test(error.message))error.status=403;throw error;}
  }
  return db.transaction(async()=>{
   // Re-read the persisted identity; request claims cannot grant this permission.
   const admin=await db.findById('users',actor.id);
   if(!admin||admin.status!=='active'||admin.role_code!=='SUPER_ADMIN'||Number(admin.company_id)!==Number(actor.company_id))throw fail('Only an active Super Admin can correct a staff ID.',403);
   const employee=await db.findById('employees',employeeId);
   if(!employee||Number(employee.company_id)!==Number(actor.company_id))throw fail('Employee not found.',404);
   if(employee.deleted_at)throw fail('Restore this staff record before correcting its number.');
   if(correction.confirmation!==employee.employee_code)throw fail('The staff ID changed since this profile was opened. Reload it and confirm the current ID.',409);
   if(correction.number===employee.employee_code)throw fail('The corrected ID is the same as the current ID.',409);
   if(hiringYear(employee)!==correction.year)throw fail('The ID year must match the saved hiring date. Correct the hiring date first.');
   if(await db.findById('employee_number_registry',correction.number)||(await db.find('employees')).some(e=>e.employee_code===correction.number||e.staff_id===correction.number))throw fail('This employee number is already reserved. Choose a number that has never been issued.',409);
   const existing=await db.findOne('employee_number_registry',{employee_id:employee.id});
   if(existing)await db.update('employee_number_registry',existing.id,{employee_id:null});
   const issued_at=new Date().toISOString(),counterId=`${correction.code}:${correction.year}`;
   const counter=await db.findById('employee_number_counters',counterId);
   if(counter)await db.update('employee_number_counters',counterId,{last_value:Math.max(Number(counter.last_value),correction.sequence)});
   else await db.insert('employee_number_counters',{id:counterId,department_code:correction.code,hiring_year:correction.year,last_value:correction.sequence});
   await db.insert('employee_number_registry',{id:correction.number,company_id:employee.company_id,employee_id:employee.id,department_code:correction.code,hiring_year:correction.year,sequence:correction.sequence,legacy_employee_code:employee.employee_code,legacy_staff_id:employee.staff_id,issued_at,issued_by:admin.id});
   const updated=await db.update('employees',employee.id,{employee_code:correction.number,staff_id:correction.number,numbering_department_code:correction.code,numbering_hire_year:correction.year,employee_number_assigned_at:issued_at});
   await db.insert('audit_logs',{company_id:employee.company_id,actor_id:admin.id,actor_email:admin.email,action:'EMPLOYEE_NUMBER_CORRECTED',entity:'employees',entity_id:String(employee.id),metadata:{previous_employee_number:employee.employee_code,employee_number:correction.number,reason:correction.reason,previous_number_reserved:true},created_at:issued_at});
   return updated;
  });
 }
};
