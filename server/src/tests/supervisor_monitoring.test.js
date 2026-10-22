import test from 'node:test';import assert from 'node:assert/strict';
import {db,resetTestData} from './helpers/database.js';
import {fieldService} from '../services/fieldService.js';
import {fieldController} from '../controllers/fieldController.js';
import {supervisorScope,supervisorEmployee} from '../utils/supervisorAccess.js';
const invoke=async(method,user,{query={},params={},body={}}={})=>{let result,status=200;const res={status(code){status=code;return res;},json(value){result=value;}};await fieldController[method]({user,query,params,body},res);return {status,...result};};

test('Supervisor monitoring isolates companies and teams and preserves location evidence',async t=>{
 await resetTestData();t.mock.timers.enable({apis:['Date'],now:Date.parse('2026-10-21T23:30:00Z')});
 const sup={id:7,company_id:1,role_code:'SUPERVISOR',employee:{id:9001}},admin={id:1,company_id:1,role_code:'SUPER_ADMIN'},otherAdmin={id:2,company_id:2,role_code:'ADMIN'};
 for(const employee of [{id:9001,company_id:1,position:'Supervisor'},{id:9002,company_id:1,position:'Supervisor'},{id:9003,company_id:1,position:'Field Agent',supervisor_id:9001},{id:9004,company_id:1,position:'Field Agent',supervisor_id:9002},{id:9010,company_id:2,position:'Field Agent',supervisor_id:9001}])await db.insert('employees',{first_name:'Fixture',last_name:String(employee.id),status:'active',...employee});
 await db.insert('work_locations',{id:9001,company_id:1,name:'Fixture market',location_type:'Market',latitude:6.5,longitude:3.3,geofence_radius:150,status:'active'});
 await db.insert('employee_location_assignments',{company_id:1,employee_id:9003,location_id:9001,is_active:true,is_primary:true,start_date:'2026-10-22'});
 await db.insert('attendance',{id:9001,company_id:1,employee_id:9003,date:'2026-10-22',clock_in:'2026-10-21T23:15:00Z',status:'late'});
 await db.insert('visits',{company_id:1,agent_id:9003,status:'in_progress',check_in_time:'2026-10-21T23:20:00Z'});
 await db.insert('visits',{company_id:2,agent_id:9010,status:'in_progress',check_in_time:'2026-10-21T23:20:00Z'});
 await db.insert('location_alerts',{id:9001,company_id:1,employee_id:9004,supervisor_id:9002,status:'active'});
 await db.insert('location_alerts',{id:9010,company_id:2,employee_id:9010,supervisor_id:9001,status:'active'});

 await t.test('A supervisor cannot select another team or use an unlinked staff profile',async()=>{
  assert.equal((await supervisorScope(sup,9002)).supervisorId,9001);
  await assert.rejects(supervisorScope({...sup,employee:null}),e=>e.status===403);
  await assert.rejects(supervisorScope(admin,9010),e=>e.status===404);
  await assert.rejects(supervisorEmployee(await supervisorScope(sup),9004),e=>e.status===403);
  await assert.rejects(supervisorEmployee(await supervisorScope(sup),9010),e=>e.status===404);
 });
 await t.test('Controller reads ignore company spoofing, respect Lagos midnight and restrict visit counts',async()=>{
  const team=await invoke('getSupervisorTeamTable',sup,{query:{company_id:2,supervisor_id:9002}});
  assert.equal(team.status,200);assert.deepEqual(team.data.map(e=>e.id),[9003]);
  const metrics=await invoke('getSupervisorDashboardMetrics',sup,{query:{company_id:2,supervisor_id:9002}});
  assert.equal(metrics.data.checked_in,1);assert.equal(metrics.data.active_store_visits,1);assert.equal(metrics.data.outside_geofence,0);assert.equal(metrics.data.late,1);
  const other=await invoke('getSupervisorTeamTable',otherAdmin,{query:{company_id:1}});assert.deepEqual(other.data.map(e=>e.id),[9010]);
  assert.equal((await invoke('getSupervisorDashboardMetrics',admin,{query:{date:'2026-02-31'}})).status,400);
 });
 await t.test('Assigned workstations do not become reported GPS; valid zero coordinates and market radii survive',async()=>{
  let [record]=await fieldService.getSupervisorTeamTable({supervisor_id:9001});
  assert.equal(record.latest_coordinates,null);assert.equal(record.distance_meters,null);assert.equal(record.formatted_distance,'Not recorded');assert.equal(record.store.radius,300);
  await db.insert('location_logs',{company_id:1,employee_id:9003,latitude:0,longitude:3.3,accuracy:8,distance_from_store:0,timestamp:'2026-10-21T23:25:00Z'});
  [record]=await fieldService.getSupervisorTeamTable({supervisor_id:9001});assert.equal(record.latest_coordinates.latitude,0);assert.equal(record.distance_meters,0);
  const other=await fieldService.getSupervisorTeamTable({company_id:2});assert.equal(other[0].latest_coordinates,null);assert.equal(other[0].status_color,'GREY');
 });
 await t.test('Profile, timeline and mutation controllers deny foreign employees and other teams before writes',async()=>{
  for(const method of ['getSupervisorEmployeeProfile','getEmployeeTimeline']){
   assert.equal((await invoke(method,sup,{params:{employeeId:9004}})).status,403);
   assert.equal((await invoke(method,admin,{params:{employeeId:9010}})).status,404);
  }
  assert.equal((await invoke('resolveSupervisorAlert',sup,{params:{alertId:9001},body:{resolution_notes:'Fixture'}})).status,403);
  assert.equal((await invoke('resolveSupervisorAlert',admin,{params:{alertId:9010}})).status,404);
  assert.equal((await db.findById('location_alerts',9001)).status,'active');
  assert.equal((await invoke('overrideAttendance',otherAdmin,{body:{attendance_id:9001}})).status,404);
  const timeline=await invoke('getEmployeeTimeline',sup,{params:{employeeId:9003}});assert.ok(timeline.data.some(e=>e.type==='LOCATION_UPDATE'));
 });
 await t.test('Field exports cannot bypass company, team or individual attendance permissions',async()=>{
  await db.insert('attendance',{company_id:1,employee_id:9004,date:'2026-10-22',clock_in_time:'2026-10-21T23:16:00Z'});
  await db.insert('attendance',{company_id:2,employee_id:9010,date:'2026-10-22',clock_in_time:'2026-10-21T23:17:00Z'});
  const staff={id:99,company_id:1,role_code:'FIELD_AGENT',employee:{id:9003}};
  const report=await invoke('getReports',staff,{query:{companyId:2,employeeId:9004,reportType:'attendance'}});
  assert.equal(report.status,200);assert.equal(report.data.length,1);assert.equal(report.data[0].check_in_time,'2026-10-21T23:15:00Z');
  assert.equal((await invoke('getReports',sup,{query:{employeeId:9004}})).status,403);
  const other=await invoke('getReports',otherAdmin,{query:{companyId:1,reportType:'attendance'}});assert.equal(other.data.length,1);assert.equal(other.data[0].check_in_time,'2026-10-21T23:17:00Z');
  const activity=await invoke('getReports',sup,{query:{reportType:'activity',dateFrom:'2026-10-21',dateTo:'2026-10-21'}});assert.equal(activity.data.length,0);
 });
 await t.test('Attendance corrections require a real timestamp and reason; missing times never fabricate an eight-hour shift',async()=>{
  for(const input of [{},{clockOutTime:'invalid'},{clockOutTime:'2026-10-22T01:00:00Z'},{clockOutTime:'2026-10-21T22:00:00Z'},{clockOutTime:'2026-10-21T23:25:00Z',notes:''}])await assert.rejects(fieldService.overrideAttendance({attendanceId:9001,notes:'Verified fixture correction',...input}));
  assert.equal((await db.findById('attendance',9001)).clock_out_time,undefined);
  const corrected=await fieldService.overrideAttendance({attendanceId:9001,clockOutTime:'2026-10-21T23:25:00Z',notes:'Verified fixture correction'});assert.equal(corrected.clock_out,'2026-10-21T23:25:00.000Z');assert.equal(corrected.working_duration_text,'0h 10m');assert.equal(corrected.status,'late');
 });
});
