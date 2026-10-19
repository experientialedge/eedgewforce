import {createHash} from 'node:crypto';
import {db} from '../config/database.js';
import {activityService} from './activityService.js';
import {getLagosTime} from '../utils/nigeriaTime.js';
import {analyseNexus} from './nexusAnalytics.js';
import {nexusModelService} from './nexusModelService.js';
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const fail=(message,status=403)=>{throw Object.assign(new Error(message),{status});};
export const nexusIntelligenceService={
  async authorize(actor){const {user}=await activityService.identity(actor);if(!['SUPER_ADMIN','ADMIN','HR','HR_MANAGER','CEO','CTO','IT_ADMIN'].includes(user.role_code))fail('NEXUS requires HR or executive access.');return user;},
  enabled(){return process.env.NEXUS_ENABLED==='true';},
  async snapshot(user,period){
    if(db.isCloud)return db.rpc('nexus_operational_snapshot',{p_company_id:user.company_id,p_period:period});
    const scope={company_id:user.company_id},today=getLagosTime().dateStr;
    const [staff,attendance,movements,activity,tasks,visits,orders]=await Promise.all(['employees','attendance','workforce_movement_events','workforce_activity_events','collaboration_tasks','visits','orders'].map(t=>db.find(t,scope)));
    const dayOf=value=>value?getLagosTime(value).dateStr:null;
    const days=Array.from({length:period*2},(_,i)=>{
      const date=new Date(Date.parse(today+'T12:00:00Z')-(period*2-1-i)*86400000).toISOString().slice(0,10);
      const arrived=attendance.filter(a=>a.date===date&&(a.clock_in||a.clock_in_time)),scheduled=visits.filter(v=>v.planned_date===date),booked=orders.filter(o=>(o.order_date||dayOf(o.created_at))===date&&!['cancelled','canceled','rejected'].includes(String(o.status).toLowerCase()));
      return {date,clocked_in:new Set(arrived.map(a=>a.employee_id)).size,late_arrivals:arrived.filter(a=>String(a.status).toLowerCase()==='late').length,departures:movements.filter(m=>m.kind==='workplace_departure'&&dayOf(m.observed_at)===date).length,inactivity:activity.filter(a=>a.kind==='app_inactive'&&dayOf(a.detected_at)===date).length,connection_gaps:activity.filter(a=>a.kind==='connection_lost'&&dayOf(a.detected_at)===date).length,completed_tasks:tasks.filter(t=>t.status==='done'&&dayOf(t.completed_at)===date).length,planned_visits:scheduled.length,completed_visits:scheduled.filter(v=>String(v.status).toLowerCase()==='completed').length,order_count:booked.length,order_value:booked.reduce((sum,o)=>sum+Number(o.total_amount||0),0)};
    });return {active_staff:staff.filter(s=>s.status==='active').length,days};
  },
  async overview(actor,input=7){
    const user=await this.authorize(actor);if(!this.enabled())return {enabled:false,message:'NEXUS awaits database activation.'};
    const period=Number(input);if(![7,30].includes(period))fail('Choose a 7 or 30 day period.',400);
    const analysis=analyseNexus(await this.snapshot(user,period),period),evidenceHash=hash(analysis.evidence);
    let config=null,configurationError=false;try{config=nexusModelService.configuration();}catch{configurationError=true;}
    const runs=await db.find('nexus_intelligence_runs',{company_id:user.company_id,period_days:period},{order:{column:'created_at',ascending:false},limit:10});
    const matching=runs.find(r=>r.evidence_hash===evidenceHash);
    return {enabled:true,analysis,evidence_hash:evidenceHash,model:{configured:Boolean(config),status:configurationError?'configuration_error':config?'configured_not_health_verified':'not_configured',name:config?.model||null},reasoning:matching?{...matching.result,created_at:matching.created_at,run_id:matching.id}:null};
  },
  async investigate(actor,input={},fetcher=fetch){
    const user=await this.authorize(actor);if(!this.enabled())fail('NEXUS is not activated.',503);
    const question=input.question===undefined?'What should we investigate in these operational records?':input.question;
    if(typeof question!=='string'||!question.trim()||question.length>1000)fail('Use a question of 1–1000 characters.',400);
    const view=await this.overview(user,input.period||7);
    if(!nexusModelService.configuration())fail('Configure the private NEXUS model server. Verified analytics remain available.',503);
    let claimed;
    if(db.isCloud)claimed=await db.rpc('nexus_claim_generation',{p_company_id:user.company_id});
    else claimed=await db.transaction(async()=>{const lease=await db.findOne('nexus_generation_leases',{company_id:user.company_id});if(lease&&Date.now()-Date.parse(lease.last_attempt_at)<60000)return false;const data={company_id:user.company_id,last_attempt_at:new Date().toISOString()};if(lease)await db.update('nexus_generation_leases',lease.id,data);else await db.insert('nexus_generation_leases',data);return true;});
    if(!claimed)fail('NEXUS is serving a recent investigation. Retry after one minute.',429);
    let result;try{result=await nexusModelService.reason(view.analysis,question.trim(),fetcher);}catch{fail('The private model could not produce a verified response. Your factual analysis remains available.',502);}
    const run=await db.insert('nexus_intelligence_runs',{company_id:user.company_id,user_id:user.id,period_days:view.analysis.period,question_hash:hash(question.trim()),evidence_hash:view.evidence_hash,result,evidence:view.analysis.evidence,created_at:new Date().toISOString()});
    return {...view,reasoning:{...result,created_at:run.created_at,run_id:run.id}};
  }
};
