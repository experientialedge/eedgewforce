// Deterministic calculations. The language model never calculates or chooses data access.
export const nexusMetrics = {
  clocked_in:{label:'Recorded staff clock-ins',source:'Attendance',tab:'people'},
  late_arrivals:{label:'Late arrivals',source:'Attendance',tab:'people'},
  departures:{label:'Confirmed workplace departures',source:'Verified movement events',tab:'people'},
  inactivity:{label:'App inactivity flags',source:'Server activity events',tab:'idle'},
  connection_gaps:{label:'Unconfirmed connection gaps',source:'Server activity events',tab:'idle'},
  completed_tasks:{label:'Shared tasks completed',source:'Project tasks',tab:'projects'},
  planned_visits:{label:'Visits scheduled',source:'Visits grouped by planned date',tab:'manifest'},
  completed_visits:{label:'Scheduled visits completed',source:'Current status of scheduled visits',tab:'manifest'},
  order_count:{label:'Non-cancelled orders',source:'Orders grouped by order date',tab:'sales'},
  order_value:{label:'Recorded order value (NGN)',source:'Order totals; excludes cancelled/rejected orders',tab:'sales'}
};
const rounded=n=>Math.round(n*100)/100;
export function analyseNexus(snapshot,period=7) {
  const days=snapshot.days||[],current=days.slice(-period),previous=days.slice(-period*2,-period);
  const evidence=Object.entries(nexusMetrics).map(([key,meta])=>{
    const value=rounded(current.reduce((n,d)=>n+Number(d[key]||0),0)),prior=rounded(previous.reduce((n,d)=>n+Number(d[key]||0),0));
    return {id:key,...meta,value,previous:prior,delta:rounded(value-prior),percent_change:prior?rounded((value-prior)/prior*100):null,formula:'Sum of daily '+key,from:current[0]?.date,to:current.at(-1)?.date,previous_from:previous[0]?.date,previous_to:previous.at(-1)?.date};
  });
  const get=id=>evidence.find(e=>e.id===id);
  const planned=get('planned_visits').value,completed=get('completed_visits').value,arrivals=get('clocked_in').value,late=get('late_arrivals').value;
  evidence.push({id:'visit_completion_rate',label:'Scheduled visit completion',source:'Scheduled visit cohort',tab:'manifest',value:planned?rounded(completed/planned*100):null,unit:'%',formula:'Scheduled visits completed ÷ visits scheduled × 100',numerator:completed,denominator:planned,from:current[0]?.date,to:current.at(-1)?.date});
  evidence.push({id:'late_arrival_rate',label:'Late share of recorded arrivals',source:'Attendance',tab:'people',value:arrivals?rounded(late/arrivals*100):null,unit:'%',formula:'Late arrivals ÷ recorded staff clock-ins × 100',numerator:late,denominator:arrivals,from:current[0]?.date,to:current.at(-1)?.date});
  const findings=[];
  const add=(id,title,evidence_ids,priority,detail,action)=>findings.push({id,title,evidence_ids,priority,detail,action,kind:'verified_calculation'});
  if(get('departures').value)add('departures','Workplace departures need context',['departures'],'review','Accurate outside fixes confirmed departure events. These events do not establish the reason for leaving.','Review the recorded movement and speak with the staff member.');
  if(get('connection_gaps').value)add('gaps','Some app presence is unconfirmed',['connection_gaps'],'review','Connection gaps can arise from signal loss, sleep or a closed browser.','Check device connectivity before interpreting attendance.');
  if(planned&&completed<planned)add('visits','Some scheduled visits remain incomplete',['planned_visits','completed_visits','visit_completion_rate'],'review','Completion is based on the current status of visits scheduled in this period; it is not a historical completion-time measure.','Review schedules, reassignment and missing visit updates.');
  if(get('order_value').previous>0&&get('order_value').percent_change<=-20)add('orders','Recorded order value fell against the preceding period',['order_value'],'review','This comparison describes booked order values, not collected revenue or a proven cause.','Compare order mix, cancellations and coverage before choosing an intervention.');
  if(late)add('lateness','Late arrivals are recorded',['late_arrivals','late_arrival_rate'],'review','The attendance policy classifies morning arrivals from 09:00 as late.','Review arrival times and any approved exceptions.');
  if(!findings.length)add('coverage','No configured review trigger was met',Object.keys(nexusMetrics).slice(0,2),'normal','No trigger is not proof of complete data or optimal performance.','Check record coverage and operating context.');
  // A robust event-volume signal requires at least seven baseline days and a nonzero MAD.
  if(previous.length>=7){const values=previous.map(d=>Number(d.order_count||0)).sort((a,b)=>a-b),median=values[Math.floor(values.length/2)],deviations=values.map(v=>Math.abs(v-median)).sort((a,b)=>a-b),mad=deviations[Math.floor(deviations.length/2)],latest=Number(current.at(-1)?.order_count||0);if(mad>0&&Math.abs(latest-median)/(1.4826*mad)>=3.5)add('volume_signal','Latest recorded order volume differs from the baseline',['order_count'],'review','A robust median/MAD check exceeded 3.5. The current day may be incomplete and weekly seasonality is not adjusted.','Review the full day and comparable operating days before drawing conclusions.');}
  return {period,from:current[0]?.date,to:current.at(-1)?.date,evidence,findings,trend:current,active_staff:Number(snapshot.active_staff||0),generated_at:new Date().toISOString(),limitations:['Counts describe records, not employee productivity, intent or misconduct.','Clock-ins count staff-days; active staff is a current profile count, not a historical attendance denominator.','The latest day is partial. Record updates can revise earlier totals.','Order value is not collected revenue. No sales target has been assumed.','Possible causes require investigation; aggregate associations cannot establish causality.']};
}
