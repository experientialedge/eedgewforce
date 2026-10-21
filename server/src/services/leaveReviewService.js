import {db} from '../config/database.js';
import {recordAudit} from '../middleware/auditLogger.js';
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
export async function reviewLeave(actor,requestId,approve,reason='',req=null){
  const user=actor?.id?await db.findById('users',Number(actor.id)):null;
  if(!user||user.status!=='active'||(actor.company_id&&Number(user.company_id)!==Number(actor.company_id))||!['HR','HR_MANAGER','ADMIN','SUPER_ADMIN','CEO','CTO','IT_ADMIN','MANAGER'].includes(user.role_code))fail('Authorized HR reviewer required.',403);
  if(typeof reason!=='string'||reason.length>2000)fail('Review notes must be up to 2,000 characters.');
  let result;
  if(db.isCloud)result=await db.rpc('hr_review_leave',{p_company_id:user.company_id,p_actor_id:user.id,p_request_id:Number(requestId),p_approve:approve,p_reason:reason});
  else result=await db.transaction(async()=>{
    const request=await db.findOne('leave_requests',{id:Number(requestId),company_id:user.company_id});
    if(!request)fail('Leave request not found.',404);
    if(request.status!=='pending')fail('Leave request has already been reviewed.',409);
    if(approve&&['annual','sick','casual'].includes(request.leave_type.toLowerCase())){
      const balance=await db.findOne('leave_balances',{employee_id:request.employee_id,year:Number(request.start_date.slice(0,4))}),key=request.leave_type.toLowerCase();
      if(!balance||Number(balance[key])<request.days)fail('Leave balance is missing or insufficient. Update the balance before approval.');
      await db.update('leave_balances',balance.id,{[key]:Number(balance[key])-request.days});
    }
    const updated=await db.update('leave_requests',request.id,{status:approve?'approved':'rejected',reviewed_by:user.id,reviewed_at:new Date().toISOString(),review_notes:reason});
    await db.insert('notifications',{company_id:user.company_id,employee_id:request.employee_id,type:'Leave',title:approve?'Leave approved':'Leave request update',body:`${request.leave_type} leave (${request.start_date} to ${request.end_date}): ${updated.status}. ${reason}`});
    return updated;
  });
  await recordAudit(user,approve?'LEAVE_APPROVED':'LEAVE_REJECTED','leave_requests',result.id,{days:result.days},req);
  return result;
}
