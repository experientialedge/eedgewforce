const number = value => value == null || value === '' || !Number.isFinite(Number(value)) ? null : Number(value);
export const recordedScore = value => {
  const score = number(value);
  return score !== null && score >= 0 && score <= 100 ? score : null;
};
const day = value => {
  if (!value || !Number.isFinite(Date.parse(value))) return null;
  return new Intl.DateTimeFormat('en-CA', {timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
};
export function salesPeriod(filter = 'today', now = new Date()) {
  const today = day(now), end = new Date(today + 'T12:00:00Z');
  const start = new Date(end);
  if (filter === 'yesterday') { start.setUTCDate(start.getUTCDate()-1); end.setUTCDate(end.getUTCDate()-1); }
  if (filter === 'this_week') start.setUTCDate(start.getUTCDate()-((start.getUTCDay()+6)%7));
  if (filter === 'this_month') start.setUTCDate(1);
  return {start:start.toISOString().slice(0,10),end:end.toISOString().slice(0,10),today};
}
const regions = {SW:/south.?west|\bsw\b|lagos|ogun|oyo|osun|ondo|ekiti/i, NC:/north.?central|\bnc\b|abuja|fct|kwara|kogi|niger|benue|plateau|nasarawa/i, SS:/south.?south|\bss\b|rivers|delta|edo|bayelsa|akwa ibom|cross river/i};
export const inRegion = (record, region) => !region || region === 'all' || !!regions[region]?.test([record?.region,record?.territory,record?.state,record?.store?.state,record?.customer?.state,record?.customer?.territory].filter(Boolean).join(' '));
export function commandCenterMetrics({team=[],orders=[],stores=[],payments=[],customers=[]}, {dateFilter='today',regionFilter='all',now=new Date()}={}) {
  const period=salesPeriod(dateFilter,now);
  const during = value => {const date=day(value);return date && date>=period.start && date<=period.end;};
  const teamList=team.filter(t=>inRegion(t,regionFilter)).map(m=>({...m,id:m.id||m.employee_id,first_name:m.first_name||m.name?.split(' ')[0]||'Agent',last_name:m.last_name||m.name?.split(' ').slice(1).join(' ')||'',status_color:m.status_color||'GREY',performance_score:recordedScore(m.performance_score)}));
  const orderList=orders.filter(o=>during(o.order_date||o.created_at)&&inRegion(o,regionFilter));
  const booked=orderList.filter(o=>!['cancelled','canceled','rejected'].includes(String(o.status).toLowerCase()));
  const sales=booked.reduce((sum,o)=>sum+(number(o.total_amount)||0),0);
  const checked=teamList.filter(t=>!!t.check_in_time),active=checked.filter(t=>!t.check_out_time);
  const durations=checked.map(t=>(Date.parse(t.check_out_time||now)-Date.parse(t.check_in_time))/3600000).filter(h=>Number.isFinite(h)&&h>=0);
  const visits=teamList.reduce((sum,t)=>sum+(number(t.visits_total)||0),0),completed=teamList.reduce((sum,t)=>sum+(number(t.visits_completed)||0),0);
  const customerList=customers.filter(c=>inRegion(c,regionFilter));
  const outstanding=customerList.reduce((sum,c)=>sum+Math.max(0,number(c.balance)||0),0);
  const collected=payments.filter(p=>during(p.payment_date||p.created_at)&&inRegion(p,regionFilter)&&!['failed','cancelled','canceled','rejected','reversed'].includes(String(p.status).toLowerCase())).reduce((sum,p)=>sum+(number(p.amount)||0),0);
  return {period,team:teamList,orders:orderList,stores:stores.filter(s=>inRegion(s,regionFilter)),metrics:{
    workforce:{totalAgents:teamList.length,activeAgents:active.length,checkedIn:checked.length,notCheckedIn:teamList.length-checked.length,onField:active.filter(t=>t.location_status==='At Location').length,idle:0,avgHours:durations.length?(durations.reduce((sum,h)=>sum+h,0)/durations.length).toFixed(1)+'h':'Not recorded'},
    field:{plannedVisits:visits,completedVisits:completed,missedVisits:null,shortVisits:null,completionPercent:visits?Math.round(completed/visits*100):null,newCustomers:null},
    sales:{salesToday:sales,targetToday:null,achievementPercent:null,totalOrders:orderList.length,approvedOrders:orderList.filter(o=>['approved','delivered','paid'].includes(String(o.status).toLowerCase())).length,avgOrderValue:booked.length?sales/booked.length:0},
    payments:{totalReceivable:outstanding,collectedToday:collected,outstanding,overdue:null,dueToday:null}
  }};
}
