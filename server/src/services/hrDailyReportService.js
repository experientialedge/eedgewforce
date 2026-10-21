import ExcelJS from 'exceljs';
import { db } from '../config/database.js';
import { activityService } from './activityService.js';
import { emailService } from './emailService.js';
import { getLagosTime } from '../utils/nigeriaTime.js';

const readers = ['HR', 'HR_MANAGER', 'ADMIN', 'SUPER_ADMIN', 'CEO', 'CTO', 'IT_ADMIN'];
const admins = ['ADMIN', 'SUPER_ADMIN'];
const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
const name = e => e ? [e.first_name, e.last_name].filter(Boolean).join(' ') || e.full_name || `Staff #${e.id}` : 'Unassigned';
const dayOf = value => value ? getLagosTime(value).dateStr : null;
const stamp = value => value ? new Date(Date.parse(value) + 3600000) : null; // Excel has no timezone; display Lagos wall time.
const onDay = (value, day) => dayOf(value) === day;
export function reportDay(value = getLagosTime().dateStr) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value || value > getLagosTime().dateStr) fail('Choose a valid report date up to today.');
  return value;
}
export function reportRecipients(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 20) fail('Enter between 1 and 20 email addresses.');
  const values = [...new Set(input.map(v => String(v).trim().toLowerCase()))];
  if (values.some(v => v.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(v))) fail('Enter valid email addresses without display names.');
  return values;
}

// Pure projection: no passwords, raw GPS, chat messages, salaries or leave reasons enter the workbook.
export function projectReport(data, day, generatedAt = new Date().toISOString()) {
  const { employees, users, locations, assignments, attendance, orders, projects, tasks, leave, movements, activity, directives } = data;
  const employee = id => employees.find(e => Number(e.id) === Number(id));
  const person = id => users.find(u => Number(u.id) === Number(id))?.full_name || `Account #${id}`;
  const location = id => locations.find(l => Number(l.id) === Number(id))?.name || 'Not recorded';
  const assigned = e => assignments.filter(a => Number(a.employee_id) === Number(e.id) && a.is_active && (!a.start_date || a.start_date <= day) && (!a.end_date || a.end_date >= day)).map(a => location(a.location_id)).join(', ') || 'No active assignment';
  const dayAttendance = attendance.filter(a => (a.date || a.attendance_date) === day);
  const dayMovements = movements.filter(m => onDay(m.observed_at, day));
  const attendanceRows = employees.filter(e => e.status === 'active' || dayAttendance.some(a => Number(a.employee_id) === Number(e.id))).flatMap(e => {
    const rows = dayAttendance.filter(a => Number(a.employee_id) === Number(e.id));
    return (rows.length ? rows : [null]).map(a => {
      const clockIn = a?.clock_in || a?.clock_in_time;
      const logins = dayMovements.filter(m => Number(m.employee_id) === Number(e.id) && m.kind === 'location_login').sort((x,y) => Date.parse(x.observed_at)-Date.parse(y.observed_at));
      const login = logins.filter(m => !clockIn || Date.parse(m.observed_at) <= Date.parse(clockIn)).at(-1);
      return [e.id, name(e), e.employee_code || e.staff_id || '', assigned(e), a?.location_name || a?.clock_in_address || login?.details?.location_name || (login && location(login.location_id)) || 'Not recorded', stamp(clockIn), stamp(a?.midday_clock_in), stamp(a?.clock_out || a?.clock_out_time), a?.status || 'No attendance record', a?.working_hours == null ? null : Number(a.working_hours)];
    });
  });
  const booked = orders.filter(o => (o.order_date || dayOf(o.created_at)) === day);
  const validOrders = booked.filter(o => !['cancelled','canceled','rejected'].includes(String(o.status).toLowerCase()));
  const salesRows = booked.map(o => [o.id, o.order_number || '', person(o.sales_agent_id), o.customer_id, Number(o.total_amount || 0), o.status, o.payment_status || 'Not recorded']);
  const taskRows = [], projectRows = [];
  const openTasks = tasks.filter(t => t.status !== 'done');
  const asOf = Math.min(Date.parse(generatedAt), Date.parse(day+'T23:59:59+01:00'));
  for (const task of openTasks) {
    const project = projects.find(p => Number(p.id) === Number(task.project_id));
    for (const assignee of task.assignee_ids?.length ? [...new Set(task.assignee_ids)] : [null]) {if(taskRows.length>=100000)fail('Report exceeds 100,000 task assignment rows.',413);taskRows.push([task.id, project?.name || `Project #${task.project_id}`, task.title, assignee === null ? 'Unassigned' : person(assignee), task.status, task.priority, stamp(task.due_at), task.due_at && Date.parse(task.due_at) < asOf ? 'Overdue' : 'Open', task.assignee_ids?.length || 0]);}
  }
  for (const p of projects) {
    const pt = tasks.filter(t => Number(t.project_id) === Number(p.id));
    projectRows.push([p.id, p.name, person(p.owner_id), p.status, pt.length, pt.filter(t=>t.status==='done').length, pt.filter(t=>t.status!=='done').length]);
  }
  const leaveRows = leave.filter(l => l.status === 'pending' || (l.start_date <= day && l.end_date >= day)).map(l => [l.id, name(employee(l.employee_id)), l.leave_type, l.start_date, l.end_date, l.days, l.status]);
  const alertRows = [...dayMovements.filter(m=>m.kind==='workplace_departure').map(m=>[m.id,name(employee(m.employee_id)),'Confirmed workplace departure',m.details?.location_name || location(m.location_id),stamp(m.observed_at),m.details?.detected_location_name || 'Destination unconfirmed']), ...activity.filter(a=>onDay(a.detected_at,day)).map(a=>[a.id,name(employee(a.employee_id)),a.kind==='connection_lost'?'Unconfirmed connection gap':'App inactivity flag','',stamp(a.detected_at),a.reviewed_at?'Reviewed':'Awaiting HR review'])];
  const directiveRows = directives.filter(t=>!['completed','cancelled','canceled','done'].includes(String(t.status).toLowerCase())).map(t=>[t.id,name(employee(t.assigned_to)),t.project_name || 'General',t.title,t.status,stamp(t.due_date)]);
  return { day, generated_at: generatedAt, summary: { active_staff:employees.filter(e=>e.status==='active').length, clocked_in:new Set(dayAttendance.filter(a=>a.clock_in||a.clock_in_time).map(a=>a.employee_id)).size, late:dayAttendance.filter(a=>String(a.status).toLowerCase()==='late').length, clocked_out:dayAttendance.filter(a=>a.clock_out||a.clock_out_time).length, booked_orders:validOrders.length, booked_value:Math.round(validOrders.reduce((sum,o)=>sum+Number(o.total_amount||0),0)*100)/100, open_tasks:openTasks.length, overdue_tasks:openTasks.filter(t=>t.due_at&&Date.parse(t.due_at)<asOf).length, pending_leave:leave.filter(l=>l.status==='pending').length }, attendance:attendanceRows, sales:salesRows, tasks:taskRows, projects:projectRows, leave:leaveRows, alerts:alertRows, directives:directiveRows };
}

export async function reportWorkbook(snapshot) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'EdgeWForce'; workbook.created = new Date(snapshot.generated_at);
  const add = (title, headers, rows, dateColumns = [], moneyColumns = []) => {
    const sheet = workbook.addWorksheet(title, { views:[{state:'frozen',ySplit:4}], pageSetup:{orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0} });
    sheet.addRow([title]); sheet.mergeCells(1,1,1,headers.length);
    sheet.getCell('A1').font={name:'Aptos',bold:true,size:19,color:{argb:'FF142A3D'}}; sheet.getRow(1).height=34;
    sheet.addRow([`Report date: ${snapshot.day}. Times: Africa/Lagos (WAT). Generated: ${getLagosTime(snapshot.generated_at).dateStr} ${new Date(snapshot.generated_at).toLocaleTimeString('en-GB',{timeZone:'Africa/Lagos'})} WAT.`]);
    sheet.mergeCells(2,1,2,headers.length); sheet.getRow(2).height=32; sheet.getCell('A2').alignment={wrapText:true,vertical:'middle'};
    sheet.addRow([]); sheet.addRow(headers); sheet.getRow(4).height=32;
    sheet.columns=headers.map((h,i)=>({width: /name|title|project|location|assignment|detail|metric/i.test(h)?32:22}));
    rows.forEach(row => sheet.addRow(row.map((value,i) => dateColumns.includes(i+1)&&value ? new Date(value) : typeof value === 'string' ? value.slice(0,32767) : value)));
    sheet.autoFilter={from:{row:4,column:1},to:{row:Math.max(4,sheet.rowCount),column:headers.length}};
    sheet.eachRow((row,i)=>row.eachCell({includeEmpty:true},(cell,col)=>{
      cell.font={name:'Aptos',size:11,...(i===1?cell.font:{}),...(i===4?{bold:true,color:{argb:'FFFFFFFF'}}:{})};
      if(i===4)cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF142A3D'}};
      if(i>4){cell.alignment={vertical:'top',wrapText:true};if(i%2===1)cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFF1F5F9'}};if(dateColumns.includes(col))cell.numFmt='dd mmm yyyy hh:mm';if(moneyColumns.includes(col))cell.numFmt='"₦"#,##0.00';row.height=Math.max(row.height||36,Math.min(360,18*Math.ceil(String(cell.value??'').length/(sheet.getColumn(col).width-2))+10));}
    }));
    return sheet;
  };
  const labels={active_staff:'Active staff',clocked_in:'Staff with recorded clock-in',late:'Late arrivals',clocked_out:'Recorded clock-outs',booked_orders:'Non-cancelled orders',booked_value:'Booked order value (NGN)',open_tasks:'Incomplete collaboration tasks (distinct)',overdue_tasks:'Overdue collaboration tasks (distinct)',pending_leave:'Leave requests awaiting review'};
  const overview=add('Overview',['Metric','Value'],[...Object.entries(snapshot.summary).map(([k,v])=>[labels[k],v]),['Sales definition','Booked order value is not cash collected. Cancelled/rejected orders are excluded from the summary.'],['Task definition','One detail row per assignee. Shared tasks count once in the overview. Open work and leave statuses are a snapshot at generation, including for past report dates.'],['Attendance definition','No attendance record does not establish absence. Assigned locations are current assignments valid for the report date. Actual location is recorded clock-in address or verified sign-in location.'],['Review guidance','Inactivity and connection gaps require human review; neither establishes misconduct.']]);
  overview.getColumn(1).width=52;overview.getColumn(2).width=105;
  overview.getCell('B10').numFmt='"₦"#,##0.00';
  overview.eachRow((row,i)=>{if(i>4)row.height=i>13?65:30;});
  add('Attendance',['Staff ID','Employee name','Employee code','Assigned work locations','Recorded clock-in location','Morning clock-in','Midday clock-in','Clock-out','Status','Recorded hours'],snapshot.attendance,[6,7,8]);
  add('Sales',['Order ID','Order number','Salesperson name','Customer ID','Order value (NGN)','Order status','Payment status'],snapshot.sales,[],[5]);
  add('Incomplete tasks',['Task ID','Project name','Task title','Assignee name','Status','Priority','Due at (WAT)','Review status','Assignee count'],snapshot.tasks,[7]);
  add('Projects',['Project ID','Project name','Owner name','Status','Total tasks','Completed tasks','Incomplete tasks'],snapshot.projects);
  add('Leave requests',['Request ID','Employee name','Leave type','Start date','End date','Days','Status'],snapshot.leave);
  add('HR alerts',['Event ID','Employee name','Event type','Work location','Detected at (WAT)','Review detail'],snapshot.alerts,[5]);
  add('Staff directives',['Task ID','Employee name','Project name','Task title','Status','Due at (WAT)'],snapshot.directives,[6]);
  const bytes = Buffer.from(await workbook.xlsx.writeBuffer());
  if(bytes.length > 15*1024*1024) fail('Report attachment exceeds the 15 MB limit. Download a smaller report.',413);
  return bytes;
}

export const hrDailyReportService = {
  async authorize(actor, write=false) { const {user}=await activityService.identity(actor);if(!(write?admins:readers).includes(user.role_code))fail(write?'Only an administrator can configure or send email reports.':'HR or executive access is required.',403);return user; },
  async settings(actor) {
    const user=await this.authorize(actor), settings=await db.findOne('hr_report_settings',{company_id:user.company_id});
    const deliveries=await db.find('hr_report_deliveries',{company_id:user.company_id},{order:{column:'updated_at',ascending:false},limit:30});
    const runs=await db.find('hr_report_runs',{company_id:user.company_id},{select:'id,report_date,created_at',order:{column:'created_at',ascending:false},limit:30});
    return {settings:settings||{enabled:false,recipients:[]},can_configure:admins.includes(user.role_code),email:emailService.reportConfiguration(),schedule:'Daily after 18:00 Lagos time. Vercel Hobby runs within the scheduled hour (18:00–18:59).',deliveries:deliveries.map(d=>({...d,state:d.state==='sending'&&Date.now()-Date.parse(d.updated_at)>300000?'uncertain':d.state,report_date:runs.find(r=>r.id===d.run_id)?.report_date||'Earlier report'}))};
  },
  async save(actor,input) {
    const user=await this.authorize(actor,true);if(typeof input.enabled!=='boolean')fail('Specify whether daily delivery is enabled.');
    const recipients=reportRecipients(input.recipients),existing=await db.findOne('hr_report_settings',{company_id:user.company_id});
    const data={company_id:user.company_id,enabled:input.enabled,recipients,updated_by:user.id,updated_at:new Date().toISOString()};
    if(existing)await db.update('hr_report_settings',existing.id,data);else await db.insert('hr_report_settings',data);
    return this.settings(user);
  },
  async snapshot(companyId, day) {
    const scope={company_id:Number(companyId)};
    const start=new Date(day+'T00:00:00+01:00').toISOString(),end=new Date(Date.parse(start)+86400000).toISOString();
    const specs=[['employees','employees'],['users','users',{select:'id,full_name'}],['locations','work_locations'],['assignments','employee_location_assignments'],['attendance','attendance',{}, {...scope,date:day}],['orders','orders',{}, {...scope,order_date:day}],['projects','collaboration_projects'],['tasks','collaboration_tasks'],['leave','leave_requests'],['movements','workforce_movement_events',{gte:{observed_at:start},lt:{observed_at:end}}],['activity','workforce_activity_events',{gte:{detected_at:start},lt:{detected_at:end}}],['directives','tasks']];
    const values=await Promise.all(specs.map(async([key,table,options,filter])=>[key,await db.findAll(table,filter||scope,options)]));
    return projectReport(Object.fromEntries(values),day);
  },
  async download(actor,day) {const user=await this.authorize(actor);day=reportDay(day);return reportWorkbook(await this.snapshot(user.company_id,day));},
  async prepare(companyId,day) {
    const existing=await db.findOne('hr_report_runs',{company_id:companyId,report_date:day});if(existing)return existing;
    const snapshot=await this.snapshot(companyId,day);
    if(db.isCloud)return db.rpc('hr_report_prepare',{p_company_id:companyId,p_day:day,p_snapshot:snapshot});
    return db.transaction(async()=>await db.findOne('hr_report_runs',{company_id:companyId,report_date:day})||db.insert('hr_report_runs',{company_id:companyId,report_date:day,snapshot}));
  },
  async claim(companyId,runId,recipient) {
    if(db.isCloud)return db.rpc('hr_report_claim',{p_company_id:companyId,p_run_id:runId,p_recipient:recipient});
    return db.transaction(async()=>{const old=await db.findOne('hr_report_deliveries',{run_id:runId,recipient});if(old&&(old.state!=='failed'||Date.now()-Date.parse(old.updated_at)<300000))return null;const row={company_id:companyId,run_id:runId,recipient,state:'sending',attempts:(old?.attempts||0)+1,updated_at:new Date().toISOString()};return old?db.update('hr_report_deliveries',old.id,row):db.insert('hr_report_deliveries',row);});
  },
  async deliver(companyId,day,sender=emailService.sendDailyWorkbook.bind(emailService)) {
    const settings=await db.findOne('hr_report_settings',{company_id:companyId});
    if(!settings?.enabled)return {skipped:true,reason:'Daily email delivery is disabled.'};
    if(!emailService.reportConfiguration().configured)fail('Email delivery is unavailable. Configure SMTP_USER, SMTP_PASS and EMAIL_FROM in Vercel. Excel downloads remain available.',503);
    const recipients=reportRecipients(settings.recipients),run=await this.prepare(companyId,day),bytes=await reportWorkbook(run.snapshot),results=[];
    const sendOne=async(recipient)=>{
      const claim=await this.claim(companyId,run.id,recipient);
      if(!claim){results.push({recipient,state:'skipped',detail:'Already accepted, in progress, or awaiting delivery review/retry cooldown.'});return;}
      let result;
      try { const sent=await sender(recipient,day,bytes,run.id);result={state:'accepted',message_id:sent.messageId||null,error:null}; }
      catch(error) {result={state:error.definitive?'failed':'uncertain',error:error.definitive?'Email provider rejected delivery. Check sender credentials and provider logs.':'Delivery could not be confirmed. Check provider logs before sending another copy.'};}
      await db.update('hr_report_deliveries',claim.id,{...result,updated_at:new Date().toISOString()});results.push({recipient,...result});
    };
    for(let i=0;i<recipients.length;i+=4)await Promise.all(recipients.slice(i,i+4).map(sendOne));
    return {report_date:day,generated_at:run.snapshot.generated_at,results};
  },
  async send(actor,day){const user=await this.authorize(actor,true);day=reportDay(day);const now=getLagosTime();if(day===now.dateStr&&now.hours<18)fail('Today’s daily email becomes available after 18:00 Lagos, when clock-out closes. Download a live preview or choose an earlier date.',409);return this.deliver(user.company_id,day);},
  async daily(){const settings=await db.findAll('hr_report_settings',{enabled:true});const results=[];for(const s of settings){try{results.push({company_id:s.company_id,...await this.deliver(s.company_id,getLagosTime().dateStr)});}catch(e){results.push({company_id:s.company_id,error:e.message});}}return results;}
};
