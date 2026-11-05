import ExcelJS from 'exceljs';
import { db } from '../config/database.js';
import { getLagosTime } from '../utils/nigeriaTime.js';

const fail=message=>{throw Object.assign(new Error(message),{status:400});};
const day=value=>{try{return value?getLagosTime(value).dateStr:null;}catch{return null;}};
const number=value=>value==null||value===''?null:Number.isFinite(Number(value))?Number(value):null;
const table=(columns,rows)=>({columns,rows});
const employeeName=employee=>employee?[employee.first_name,employee.last_name].filter(Boolean).join(' '):'Unassigned';
function date(value) {
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)fail('Choose valid report dates.');
  return value;
}

export const operationalReportService={
  async overview({companyId,supervisorId=null,employeeId=null,dateFrom,dateTo}) {
    if(!Number.isSafeInteger(Number(companyId))||Number(companyId)<1)fail('Company context is required.');
    const start=date(dateFrom||getLagosTime().dateStr),end=date(dateTo||start);
    if(start>end)fail('Report start date must not follow its end date.');
    const scope={company_id:Number(companyId)};
    const [allEmployees,allAttendance,allOrders,allVisits,allCustomers,allCollections,products,allDeliveries,allAlerts,allLogs]=await Promise.all([
      db.find('employees',scope),db.find('attendance',scope),db.find('orders',scope),db.find('visits',scope),db.find('customers',scope),
      db.find('collections',scope),db.find('products',scope),db.find('deliveries',scope),db.find('location_alerts',scope),db.find('location_logs',scope)
    ]);
    const employees=allEmployees.filter(e=>(!supervisorId||Number(e.id)===Number(supervisorId)||Number(e.supervisor_id)===Number(supervisorId))&&(!employeeId||Number(e.id)===Number(employeeId)));
    const allowed=new Set(employees.map(e=>Number(e.id))),restricted=Boolean(supervisorId||employeeId);
    const visible=id=>!restricted||allowed.has(Number(id));
    const during=value=>{const d=day(value);return d&&d>=start&&d<=end;};
    const staff=id=>employeeName(allEmployees.find(e=>Number(e.id)===Number(id)));
    const customer=id=>allCustomers.find(c=>Number(c.id)===Number(id))?.name||'Unassigned';
    const attendance=allAttendance.filter(a=>visible(a.employee_id)&&during(a.date));
    const visibleOrders=allOrders.filter(o=>visible(o.sales_agent_id));
    const orderIds=new Set(visibleOrders.map(o=>Number(o.id)));
    const customerIds=new Set(visibleOrders.map(o=>Number(o.customer_id)));
    const orders=visibleOrders.filter(o=>during(o.order_date||o.created_at));
    const visits=allVisits.filter(v=>visible(v.agent_id)&&during(v.check_in_time||v.actual_arrival||v.planned_date||v.created_at));
    const customers=allCustomers.filter(c=>!restricted||customerIds.has(Number(c.id))||allowed.has(Number(c.registered_by)));
    const collections=allCollections.filter(c=>visible(c.agent_id)&&during(c.payment_date||c.created_at));
    const deliveries=allDeliveries.filter(d=>(!restricted||orderIds.has(Number(d.order_id)))&&during(d.actual_delivery_time||d.dispatch_time||d.created_at));
    const alerts=allAlerts.filter(a=>visible(a.employee_id)&&during(a.created_at));
    const logs=allLogs.filter(l=>visible(l.employee_id)&&during(l.timestamp||l.created_at));
    const validOrders=orders.filter(o=>!['cancelled','canceled','rejected','draft'].includes(String(o.status).toLowerCase()));
    const orderTable=table(['Order','Date','Customer','Staff','Total (NGN)','Status','Payment status'],orders.map(o=>[o.order_number,o.order_date||day(o.created_at),customer(o.customer_id),staff(o.sales_agent_id),number(o.total_amount),o.status,o.payment_status]));
    return {company_id:Number(companyId),date_from:start,date_to:end,generated_at:new Date().toISOString(),snapshot_note:'Attendance, sales, visits, collections, deliveries, alerts and GPS use the selected dates. Customer balances and inventory show current records. Missing values are not scored or estimated.',reports:{
      daily_ops:table(['Metric','Recorded value'],[['Recorded orders',orders.length],['Eligible order value (NGN)',validOrders.reduce((sum,o)=>sum+(number(o.total_amount)||0),0)],['Attendance records',attendance.length],['Visits recorded',visits.length],['Collections (NGN)',collections.reduce((sum,c)=>sum+(number(c.amount)||0),0)],['Recorded alerts',alerts.length]]),
      attendance:table(['Date','Staff','Work location','Clock in','Midday','Clock out','Hours','Status','Geofence verified'],attendance.map(a=>[a.date,staff(a.employee_id),a.location_name||a.assigned_market||a.market||null,a.clock_in_time||a.clock_in,a.midday_clock_in,a.clock_out_time||a.clock_out,number(a.working_hours),a.status,a.is_geofence_verified==null?null:Boolean(a.is_geofence_verified)])),
      agent_perf:table(['Staff','Staff code','Recorded attendance days','Completed visits','Eligible order value (NGN)'],employees.map(e=>[employeeName(e),e.employee_code,new Set(attendance.filter(a=>Number(a.employee_id)===Number(e.id)).map(a=>a.date)).size,visits.filter(v=>Number(v.agent_id)===Number(e.id)&&String(v.status).toLowerCase()==='completed').length,validOrders.filter(o=>Number(o.sales_agent_id)===Number(e.id)).reduce((sum,o)=>sum+(number(o.total_amount)||0),0)])),
      visits:table(['Visit','Date','Staff','Customer','Purpose','Minutes','Shelf share (%)','Status'],visits.map(v=>[v.id,day(v.check_in_time||v.actual_arrival||v.planned_date||v.created_at),staff(v.agent_id),customer(v.customer_id),v.visit_purpose,number(v.duration_minutes),number(v.shelf_share_percent),v.status])),
      sales:orderTable,orders:orderTable,
      customers:table(['Customer','Code','Territory','Current balance (NGN)','Credit limit (NGN)'],customers.map(c=>[c.name,c.code,c.territory,number(c.balance),number(c.credit_limit)])),
      collections:table(['Reference','Date','Staff','Customer','Amount (NGN)','Method','Status'],collections.map(c=>[c.reference_number,day(c.payment_date||c.created_at),staff(c.agent_id),customer(c.customer_id),number(c.amount),c.payment_method,c.status])),
      inventory:table(['SKU','Product','Warehouse','Quantity','Unit price (NGN)','Current stock value (NGN)','Status'],products.map(p=>[p.sku,p.name,p.warehouse_name,number(p.stock_quantity),number(p.price??p.selling_price),number(p.stock_quantity)==null||number(p.price??p.selling_price)==null?null:number(p.stock_quantity)*number(p.price??p.selling_price),p.status])),
      deliveries:table(['Delivery','Order','Customer','Driver','Dispatch','Delivered','Status'],deliveries.map(d=>[d.id,allOrders.find(o=>Number(o.id)===Number(d.order_id))?.order_number,customer(d.customer_id),d.driver_name,d.dispatch_time,d.actual_delivery_time,d.delivery_status])),
      red_flags:table(['Alert','Date','Staff','Type','Details','Status'],alerts.map(a=>[a.id,a.created_at,staff(a.employee_id),a.alert_type,a.message,a.status])),
      gps_tracking:table(['Timestamp','Staff','Address','Latitude','Longitude','Accuracy (m)','Inside geofence'],logs.map(l=>[l.timestamp||l.created_at,staff(l.employee_id),l.address,number(l.latitude),number(l.longitude),number(l.accuracy),l.is_inside_geofence==null?null:Boolean(l.is_inside_geofence)]))
    }};
  },

  async workbook(bundle,reportId) {
    if(!Object.hasOwn(bundle.reports,reportId))fail('Choose a supported report.');
    const report=bundle.reports[reportId];
    const workbook=new ExcelJS.Workbook();const sheet=workbook.addWorksheet('Operational report');
    sheet.addRow(['EdgeWForce',reportId]);sheet.addRow(['Period',bundle.date_from,bundle.date_to]);sheet.addRow(['Generated',bundle.generated_at]);sheet.addRow([bundle.snapshot_note]);sheet.addRow([]);
    const header=sheet.addRow(report.columns);header.font={bold:true};
    for(const row of report.rows){
      const excelRow=sheet.addRow(row.map(value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(value)&&Number.isFinite(Date.parse(value))?new Date(Date.parse(value)+3600000):value??null));
      excelRow.eachCell(cell=>{if(cell.value instanceof Date)cell.numFmt='yyyy-mm-dd hh:mm:ss "WAT"';});
    }
    sheet.columns.forEach(column=>{column.width=24;});sheet.views=[{state:'frozen',ySplit:6}];
    sheet.autoFilter={from:{row:6,column:1},to:{row:6,column:report.columns.length}};
    return Buffer.from(await workbook.xlsx.writeBuffer());
  }
};
