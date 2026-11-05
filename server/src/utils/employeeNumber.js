export const EMPLOYEE_DEPARTMENTS = Object.freeze({FIN:'Finance',HR:'Human Resources',IT:'Information Technology',SM:'Sales & Marketing',OPS:'Operations',STG:'Strategy',CRE:'Creative',CMP:'Compliance',PUR:'Procurement',EXE:'Executive'});
export const EMPLOYEE_NUMBER_PATTERN=/^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)(\d{4})(\d{4})$/;
const key=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const aliases={fin:'FIN',finance:'FIN',financeaccounts:'FIN',financeandaccounts:'FIN',financedepartment:'FIN',accounts:'FIN',accounting:'FIN',hr:'HR',humanresources:'HR',humanresourcedepartment:'HR',humanresourcesdepartment:'HR',it:'IT',informationtechnology:'IT',technologyit:'IT',technologyandit:'IT',informationtechnologydepartment:'IT',sm:'SM',sales:'SM',salesmarketing:'SM',salesandmarketing:'SM',commercialsales:'SM',ops:'OPS',operations:'OPS',operation:'OPS',opration:'OPS',corporateoperations:'OPS',fieldoperations:'OPS',warehouseoperations:'OPS',stg:'STG',strategy:'STG',strategyandcommunication:'STG',strategyaccounts:'STG',cre:'CRE',creative:'CRE',design:'CRE',cmp:'CMP',compliance:'CMP',compliancedepartment:'CMP',complainceoerations:'CMP',pur:'PUR',procurement:'PUR',exe:'EXE',executive:'EXE',executivemanagement:'EXE',executivegovernance:'EXE',admin:'OPS',administration:'OPS',driving:'OPS',househelp:'OPS',supplychaindistribution:'OPS',operationandaccountdepartment:'OPS',accountsstrategy:'FIN',regionalsalesmanager:'SM',sales4:'SM'};
export function departmentCode(department,explicit){
 if(explicit!==undefined&&explicit!==null&&explicit!==''){
  const code=String(explicit).toUpperCase();if(!Object.hasOwn(EMPLOYEE_DEPARTMENTS,code))throw new Error('Choose an approved department code for the employee number.');return code;
 }
 const code=aliases[key(department)];if(!code)throw new Error('This department needs an HR-approved numbering code (FIN, HR, IT, SM, OPS, STG, CRE, CMP, PUR or EXE).');return code;
}
export function hiringYear(record){
 const date=String(record.date_of_joining||record.hire_date||'').slice(0,10);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||Number(date.slice(0,4))<1900)throw new Error('A valid hiring date is required before assigning an employee number.');
 if(record.date_of_birth&&/^\d{4}-\d{2}-\d{2}/.test(String(record.date_of_birth))&&date<String(record.date_of_birth).slice(0,10))throw new Error('Hiring date precedes date of birth. Correct the hiring date first.');
 return Number(date.slice(0,4));
}
export function formatEmployeeNumber(code,year,sequence){
 if(!Object.hasOwn(EMPLOYEE_DEPARTMENTS,code)||!Number.isInteger(year)||year<1900||year>9999||!Number.isInteger(sequence)||sequence<1||sequence>9999)throw new Error('Employee number capacity exceeded or invalid number components. Maximum 9,999 hires per department/year.');
 return `${code}${year}${String(sequence).padStart(4,'0')}`;
}
