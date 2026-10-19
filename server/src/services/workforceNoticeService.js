import { db } from '../config/database.js';
const tables={movement:'workforce_movement_notices',brief:'workforce_report_notices'};
export const workforceNoticeService={
  async list(user){
    const output=[];
    for(const [prefix,table] of Object.entries(tables)){
      if(prefix==='movement'&&process.env.WORKFORCE_GEOFENCE_ENFORCED!=='true')continue;
      if(prefix==='brief'&&process.env.WORKFORCE_REPORTS_ENABLED!=='true')continue;
      const records=await db.find(table,{company_id:Number(user.company_id),user_id:Number(user.id)},{order:{column:'created_at',ascending:false},limit:100});
      output.push(...records.map(n=>({...n,id:`${prefix}:${n.id}`,type:'HR',read:Boolean(n.read_at),link:'hr'})));
    }
    return output;
  },
  async markRead(user,id){
    const [prefix,value]=String(id).split(':'),table=tables[prefix];if(!table||!/^\d+$/.test(value))throw Object.assign(new Error('Notification not found.'),{status:404});
    const notice=await db.findById(table,Number(value));
    if(!notice||Number(notice.company_id)!==Number(user.company_id)||Number(notice.user_id)!==Number(user.id))throw Object.assign(new Error('Notification not found.'),{status:404});
    return db.update(table,notice.id,{read_at:new Date().toISOString()});
  }
};
