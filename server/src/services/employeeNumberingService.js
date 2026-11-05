import {db} from '../config/database.js';
import {departmentCode,hiringYear,formatEmployeeNumber,EMPLOYEE_NUMBER_PATTERN} from '../utils/employeeNumber.js';

// MySQL's named transaction lock and the local store's transaction queue serialize
// this operation. Supabase uses the equivalent atomic database function/trigger.
async function allocate(record){
 const code=departmentCode(record.department,record.numbering_department_code),year=hiringYear(record),id=`${code}:${year}`;
 let counter=await db.findById('employee_number_counters',id);
 if(!counter){
  let last=0;
  for(const e of await db.findAll('employees')){
   const match=String(e.employee_code||e.staff_id||'').match(EMPLOYEE_NUMBER_PATTERN);
   if(match&&match[1]===code&&Number(match[2])===year)last=Math.max(last,Number(match[3]));
  }
  counter=await db.insert('employee_number_counters',{id,department_code:code,hiring_year:year,last_value:last});
 }
 const sequence=Number(counter.last_value)+1,number=formatEmployeeNumber(code,year,sequence);
 await db.update('employee_number_counters',id,{last_value:sequence});
 return {number,code,year,sequence};
}
async function issueLocal(employee,actorId=null){
 const existing=await db.findOne('employee_number_registry',{employee_id:employee.id});
 if(existing)return employee;
 const issued=await allocate(employee),assigned_at=new Date().toISOString();
 await db.insert('employee_number_registry',{id:issued.number,company_id:employee.company_id,employee_id:employee.id,department_code:issued.code,hiring_year:issued.year,sequence:issued.sequence,legacy_employee_code:employee.employee_code||null,legacy_staff_id:employee.staff_id||null,issued_at:assigned_at,issued_by:actorId});
 return db.update('employees',employee.id,{employee_code:issued.number,staff_id:issued.number,numbering_department_code:issued.code,numbering_hire_year:issued.year,employee_number_assigned_at:assigned_at});
}
export const employeeNumberingService={
 async create(record){
  departmentCode(record.department,record.numbering_department_code);hiringYear(record);
  if(db.isCloud&&db.backend==='supabase')return db.insert('employees',record);
  return db.transaction(async()=>{
   const issued=await allocate(record),assigned_at=new Date().toISOString();
   const employee=await db.insert('employees',{...record,employee_code:issued.number,staff_id:issued.number,numbering_department_code:issued.code,numbering_hire_year:issued.year,employee_number_assigned_at:assigned_at});
   await db.insert('employee_number_registry',{id:issued.number,company_id:employee.company_id,employee_id:employee.id,department_code:issued.code,hiring_year:issued.year,sequence:issued.sequence,legacy_employee_code:record.employee_code||null,legacy_staff_id:record.staff_id||null,issued_at:assigned_at,issued_by:null});
   return employee;
  });
 },
 async assign(employeeId,code,actor){
  if(!actor?.id||!actor.company_id||!['HR','HR_MANAGER','CEO','CTO','IT_ADMIN','SUPER_ADMIN','ADMIN'].includes(actor.role_code))throw Object.assign(new Error('Not authorised to issue employee numbers.'),{status:403});
  if(db.isCloud&&db.backend==='supabase')return db.rpc('issue_employee_number',{p_employee_id:Number(employeeId),p_company_id:Number(actor.company_id),p_actor_id:Number(actor.id),p_department_code:code||null});
  return db.transaction(async()=>{
   const e=await db.findById('employees',employeeId);if(!e||Number(e.company_id)!==Number(actor.company_id))throw new Error('Employee not found.');
   const existing=await db.findOne('employee_number_registry',{employee_id:e.id});if(existing)return e;
   return issueLocal({...e,numbering_department_code:departmentCode(e.department,code)},actor.id);
  });
 },
 async preview(actor){
  const employees=await db.findAll('employees',{company_id:actor.company_id});
  return employees.filter(e=>!e.employee_number_assigned_at&&!e.deleted_at).sort((a,b)=>String(a.date_of_joining||a.hire_date||'').localeCompare(String(b.date_of_joining||b.hire_date||''))||Number(a.id)-Number(b.id)).map(e=>{
   try{return {employee_id:e.id,name:e.full_name||`${e.first_name} ${e.last_name}`,department:e.department,department_code:departmentCode(e.department,e.numbering_department_code),hiring_year:hiringYear(e),ready:true};}
   catch(error){return {employee_id:e.id,name:e.full_name||`${e.first_name} ${e.last_name}`,department:e.department,ready:false,reason:error.message};}
  });
 },
 async assignReady(actor){
  const plan=await this.preview(actor),results=[];
  for(const row of plan){if(!row.ready){results.push(row);continue;}try{const employee=await this.assign(row.employee_id,row.department_code,actor);results.push({...row,employee_number:employee.employee_code,assigned:true});}catch(error){results.push({...row,assigned:false,reason:error.message});}}
  return {assigned:results.filter(r=>r.assigned).length,pending:results.filter(r=>!r.assigned).length,results};
 }
};
