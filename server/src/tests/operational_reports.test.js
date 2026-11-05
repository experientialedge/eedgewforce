import test from 'node:test';import assert from 'node:assert/strict';import ExcelJS from 'exceljs';
import {db,resetTestData} from './helpers/database.js';
import {operationalReportService as service} from '../services/operationalReportService.js';
import {fieldController} from '../controllers/fieldController.js';

test('Operational report choices use the right data, dates, company and real Excel format',async t=>{
 await resetTestData();
 await db.update('employees',4,{supervisor_id:7});await db.update('employees',8,{supervisor_id:3});
 const customer=await db.insert('customers',{company_id:1,name:'Fixture customer',code:'R-C1',balance:0,credit_limit:100});
 await db.insert('customers',{company_id:2,name:'Foreign private customer',code:'R-C2',balance:999});
 await db.insert('attendance',{company_id:1,employee_id:4,date:'2026-11-05',clock_in_time:'2026-11-05T07:00:00Z',location_name:'Fixture office',working_hours:0,is_geofence_verified:false});
 await db.insert('attendance',{company_id:1,employee_id:8,date:'2026-11-05',clock_in_time:'2026-11-05T07:00:00Z'});
 await db.insert('attendance',{company_id:1,employee_id:4,date:'2026-11-01'});
 await db.insert('orders',{company_id:1,customer_id:customer.id,sales_agent_id:4,order_number:'VISIBLE',order_date:'2026-11-05',total_amount:'100',status:'confirmed'});
 await db.insert('orders',{company_id:1,customer_id:customer.id,sales_agent_id:4,order_number:'REJECTED',order_date:'2026-11-05',total_amount:200,status:'REJECTED'});
 await db.insert('orders',{company_id:2,sales_agent_id:4,order_number:'FOREIGN-ORDER',order_date:'2026-11-05',total_amount:999,status:'paid'});
 await db.insert('visits',{company_id:1,agent_id:4,customer_id:customer.id,check_in_time:'2026-11-05T09:00:00Z',shelf_share_percent:null,duration_minutes:0,status:'completed'});
 await db.insert('collections',{company_id:1,agent_id:4,customer_id:customer.id,amount:0,payment_date:'2026-11-05',reference_number:'COLLECTION-REF',status:'pending'});
 await db.insert('products',{company_id:1,sku:'STOCK-1',name:'Stock fixture',stock_quantity:0,price:50});
 await db.insert('products',{company_id:2,sku:'FOREIGN-STOCK',name:'Foreign inventory',stock_quantity:999,price:999});
 await db.insert('location_logs',{company_id:1,employee_id:4,timestamp:'2026-11-05T09:00:00Z',latitude:0,longitude:0,accuracy:0,is_inside_geofence:false});
 const options={companyId:1,dateFrom:'2026-11-05',dateTo:'2026-11-05'};
 const bundle=await service.overview(options);
 await t.test('All twelve report choices have matching columns and source rows',()=>{
  assert.equal(Object.keys(bundle.reports).length,12);
  for(const report of Object.values(bundle.reports))for(const row of report.rows)assert.equal(row.length,report.columns.length);
  assert.equal(bundle.reports.attendance.rows.length,2);
  assert.equal(bundle.reports.sales.rows.length,2);
  assert.equal(bundle.reports.visits.rows.length,1);
  assert.equal(bundle.reports.collections.rows[0][0],'COLLECTION-REF');
  assert.equal(bundle.reports.customers.rows[0][0],'Fixture customer');
  assert.equal(bundle.reports.inventory.rows[0][0],'STOCK-1');
  assert.equal(bundle.reports.visits.rows[0][6],null,'Missing shelf share must not become an invented 50%');
  assert.equal(bundle.reports.daily_ops.rows.find(r=>r[0]==='Eligible order value (NGN)')[1],100);
  assert.ok(!JSON.stringify(bundle).includes('FOREIGN'));
 });
 await t.test('Supervisor scope and invalid dates cannot widen the report',async()=>{
  const own=await service.overview({...options,supervisorId:7});assert.equal(own.reports.attendance.rows.length,1);
  assert.equal(own.reports.agent_perf.rows.some(row=>row[0]==='Test8 Employee'),false);
  await assert.rejects(service.overview({...options,dateFrom:'2026-11-06'}),/start date/);
  await assert.rejects(service.overview({...options,dateFrom:'2026-02-30'}),/valid report dates/);
  await assert.rejects(service.overview({...options,companyId:null}),/Company context/);
 });
 await t.test('Each export is a real workbook for the selected report and preserves zero/false values',async()=>{
  for(const id of Object.keys(bundle.reports)){
   const bytes=await service.workbook(bundle,id),workbook=new ExcelJS.Workbook();await workbook.xlsx.load(bytes);
   assert.deepEqual(workbook.worksheets[0].getRow(6).values.slice(1),bundle.reports[id].columns);
  }
  const bytes=await service.workbook(bundle,'gps_tracking'),workbook=new ExcelJS.Workbook();await workbook.xlsx.load(bytes);
  assert.equal(workbook.worksheets[0].getCell('D7').value,0);assert.equal(workbook.worksheets[0].getCell('G7').value,false);
  assert.equal(workbook.worksheets[0].getCell('A7').value.toISOString(),'2026-11-05T10:00:00.000Z');
  assert.match(workbook.worksheets[0].getCell('A7').numFmt,/WAT/);
  await assert.rejects(service.workbook(bundle,'constructor'),/supported report/);
 });
 await t.test('The controller denies staff the management bundle even with a forged company query',async()=>{
  const user=await db.findById('users',4),employee=await db.findById('employees',4);
  const res={statusCode:200,status(code){this.statusCode=code;return this;},json(body){this.body=body;return this;}};
  await fieldController.getReports({user:{...user,employee},query:{reportType:'overview',companyId:2,dateFrom:options.dateFrom,dateTo:options.dateTo}},res);
  assert.equal(res.statusCode,403);
 });
});
