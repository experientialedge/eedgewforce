import {db} from '../config/database.js';
const fail=(message,status)=>{throw Object.assign(new Error(message),{status});};
const identifier=value=>{const id=Number(value);if(!Number.isSafeInteger(id)||id<1)fail('Invalid record identifier.',400);return id;};
const roles=['SUPERVISOR','MANAGER','HR','HR_MANAGER','IT_ADMIN','CEO','CTO','SUPER_ADMIN','ADMIN'];
export async function supervisorScope(user,requestedSupervisorId){
  if(!user||!roles.includes(user.role_code))fail('Supervisor or management access is required.',403);
  const companyId=identifier(user.company_id),restricted=user.role_code==='SUPERVISOR';
  const requested=restricted?user.employee?.id:requestedSupervisorId;
  if(restricted&&!requested)fail('A linked supervisor staff profile is required.',403);
  const supervisorId=requested==null||requested===''?null:identifier(requested);
  if(supervisorId){const employee=await db.findById('employees',supervisorId);if(!employee||Number(employee.company_id)!==companyId)fail('Supervisor not found.',404);if(restricted&&employee.status!=='active')fail('The supervisor profile is not active.',403);}
  return {companyId,supervisorId,restricted};
}
export async function supervisorEmployee(scope,employeeId){
  const employee=await db.findById('employees',identifier(employeeId));
  if(!employee||Number(employee.company_id)!==scope.companyId)fail('Employee not found.',404);
  if(scope.restricted&&Number(employee.id)!==scope.supervisorId&&Number(employee.supervisor_id)!==scope.supervisorId)fail('This employee is outside your team.',403);
  return employee;
}
export async function supervisorRecord(scope,table,recordId){
  const record=await db.findById(table,identifier(recordId));
  if(!record||Number(record.company_id)!==scope.companyId)fail('Record not found.',404);
  if(record.employee_id)await supervisorEmployee(scope,record.employee_id);
  else if(scope.restricted&&Number(record.supervisor_id)!==scope.supervisorId)fail('This record is outside your team.',403);
  return record;
}
