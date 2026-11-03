import {db} from '../config/database.js';
export const LEAVE_DEFAULTS={annual:20,sick:12,casual:5};
export async function ensureLeaveBalances(employeeId,companyId,year){
  return db.transaction(async()=>{
    const scope={employee_id:Number(employeeId),company_id:Number(companyId),year:Number(year)};
    const rows=(await db.find('leave_balances',{employee_id:scope.employee_id,year:scope.year})).filter(r=>r.company_id==null||Number(r.company_id)===scope.company_id);
    const legacy=rows.find(row=>row.annual!==undefined);
    if(legacy)return legacy;
    const result={employee_id:scope.employee_id,year:scope.year};
    for(const [type,days] of Object.entries(LEAVE_DEFAULTS)){
      let row=rows.find(r=>String(r.leave_type).toLowerCase()===type);
      if(!row)row=await db.insert('leave_balances',{...scope,leave_type:type,allocated_days:days,used_days:0,remaining_days:days});
      result[type]=Number(row.remaining_days??Number(row.allocated_days)-Number(row.used_days||0));
    }
    return result;
  });
}
export async function deductLeaveBalance(employeeId,companyId,year,type,days){
  const rows=(await db.find('leave_balances',{employee_id:Number(employeeId),year:Number(year)})).filter(r=>r.company_id==null||Number(r.company_id)===Number(companyId));
  const row=rows.find(r=>String(r.leave_type).toLowerCase()===type)||rows.find(r=>r[type]!==undefined);
  const available=Number(row?.remaining_days??row?.[type]);
  if(!row||!Number.isFinite(available)||available<days)throw new Error('Leave balance is missing or insufficient. Update the balance before approval.');
  return row.leave_type?db.update('leave_balances',row.id,{used_days:Number(row.used_days||0)+days,remaining_days:available-days}):db.update('leave_balances',row.id,{[type]:available-days});
}
