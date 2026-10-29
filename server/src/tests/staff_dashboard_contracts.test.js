import test from 'node:test';import assert from 'node:assert/strict';
import {loadOperationsData,FIELD_SOURCES,SALES_SOURCES,paymentAttempt,responseList} from '../../../client/src/lib/operationsData.js';
import {startShiftTelemetry} from '../../../client/src/lib/shiftTelemetry.js';
import {db,resetTestData} from './helpers/database.js';
import {authService} from '../services/authService.js';

test('Field screen loads actual response data and uses registered staff routes',async()=>{
 const expected={route:[{id:1}],shift:{id:2,clock_in:'2026-10-27T07:30:00Z'},stores:[{id:3}],windowStatus:{can_record:false},customers:[{id:4}],deliveries:[{id:5}],collections:[{id:6}],alerts:[{id:7}],tasks:[{id:8}],sosHistory:[]};
 const byPath=new Map(FIELD_SOURCES.map(([key,path])=>[path,expected[key]])),seen=[];
 const result=await loadOperationsData(async path=>{seen.push(path);assert.ok(byPath.has(path));return byPath.get(path);},FIELD_SOURCES);
 assert.deepEqual(result.failures,[]);assert.equal(result.values.route[0].id,1);assert.equal(result.values.stores[0].id,3);assert.equal(result.values.shift.clock_in_time,'2026-10-27T07:30:00Z');assert.equal(result.values.deliveries[0].id,5);
 for(const path of ['/delivery','/sales/payments','/tasks?mine=true','/field/alerts'])assert.ok(seen.includes(path));
 for(const path of ['/delivery/orders','/sales/collections','/tasks/my','/field/supervisor/alerts'])assert.ok(!seen.includes(path));
 assert.equal(responseList({data:[{id:9}]})[0].id,9);assert.equal(responseList([{id:10}])[0].id,10);
});
test('Failed staff refreshes omit only failed fields so recorded shifts and lists can be retained',async()=>{
 const old={shift:{id:5},route:[{id:6}]};
 const result=await loadOperationsData(async path=>{if(path.includes('current')||path.includes('manifest'))throw Error('Connection unavailable');return path.includes('window')?{}:[];},FIELD_SOURCES);
 const next={...old,...result.values};assert.deepEqual(next.shift,old.shift);assert.deepEqual(next.route,old.route);assert.ok(result.failures.includes('shift'));assert.ok(result.failures.includes('route'));
});
test('Sales screen restores an unwrapped active shift and preserves an explicit empty shift',async()=>{
 const result=await loadOperationsData(async path=>path==='/field/shifts/current'?{clock_in:'2026-10-27T07:30:00Z',clock_out:'2026-10-27T16:30:00Z'}:path.includes('report')?{}:path.includes('window')?{}:[],SALES_SOURCES);
 assert.equal(result.values.shift.clock_out_time,'2026-10-27T16:30:00Z');assert.deepEqual(result.failures,[]);
 const empty=await loadOperationsData(async()=>({data:null}),[['shift','/field/shifts/current']]);assert.equal(empty.values.shift,null);
});
test('GPS updates do not restart telemetry deadlines; stopping prevents future reports',async()=>{
 let location=null,tick,intervals=0,cleared=0;const sent=[];
 const stop=startShiftTelemetry({getLocation:()=>location,send:async gps=>sent.push(gps),runtime:{setInterval(fn,ms){tick=fn;intervals++;assert.equal(ms,45000);return 1;},clearInterval(){cleared++;}}});
 for(let i=0;i<100;i++)location={latitude:0,longitude:i/10,accuracy:8};
 await tick();assert.equal(intervals,1);assert.equal(sent.length,1);assert.equal(sent[0].longitude,9.9);
 stop();await tick();assert.equal(sent.length,1);assert.equal(cleared,1);
});
test('Telemetry does not overlap requests and recovers after a failed send',async()=>{
 let tick,release,count=0,errors=0;
 const stop=startShiftTelemetry({getLocation:()=>({latitude:6,longitude:3}),send:()=>{count++;return new Promise((resolve,reject)=>{release=reject;});},onError:()=>errors++,runtime:{setInterval(fn){tick=fn;return 1;},clearInterval(){}}});
 await tick();assert.equal(count,1);release(Error('Offline'));await new Promise(resolve=>setImmediate(resolve));assert.equal(errors,1);
 const pending=tick();assert.equal(count,2);stop();release(Error('Stopped'));await pending;assert.equal(errors,1);
});
test('Retrying an unchanged payment reuses its idempotency key while a new payment gets a new key',()=>{
 let keys=0;const payload={customer_id:1,amount:50,reference_number:'Receipt A'};
 const first=paymentAttempt(null,payload,()=>String(++keys)),retry=paymentAttempt(first,payload,()=>String(++keys));
 assert.equal(retry.payload.idempotency_key,first.payload.idempotency_key);assert.equal(keys,1);
 assert.notEqual(paymentAttempt(first,{...payload,amount:100},()=>String(++keys)).payload.idempotency_key,first.payload.idempotency_key);
});

test('Staff shift, route, personal alerts and GPS report HTTP flows enforce linked identity and company/team boundaries',async t=>{
 await resetTestData();t.mock.timers.enable({apis:['Date'],now:Date.parse('2026-10-27T07:30:00Z')});
 const oldEnforcement=process.env.WORKFORCE_GEOFENCE_ENFORCED;process.env.WORKFORCE_GEOFENCE_ENFORCED='false';
 await db.update('employees',5,{supervisor_id:7});await db.update('employees',4,{supervisor_id:8});
 await db.insert('attendance',{company_id:1,employee_id:5,date:'2026-10-27',clock_in:'2026-10-27T07:10:00Z'});
 await db.insert('visits',{company_id:1,agent_id:5,status:'planned'});await db.insert('visits',{company_id:2,agent_id:5,status:'planned'});
 await db.insert('location_alerts',{company_id:1,employee_id:5,alert_type:'TEST',message:'Own alert'});await db.insert('location_alerts',{company_id:1,employee_id:4,alert_type:'TEST',message:'Other staff alert'});await db.insert('location_alerts',{company_id:2,employee_id:5,alert_type:'TEST',message:'Other company alert'});
 for(const row of [{id:901,employee_id:5,latitude:null,longitude:null,accuracy:null},{id:902,employee_id:5,latitude:0,longitude:0,accuracy:0,distance_from_store:0,is_inside_geofence:true},{id:903,employee_id:4,latitude:6,longitude:3}])await db.insert('location_logs',{company_id:1,timestamp:'2026-10-27T07:15:00Z',...row});
 const original=await db.findById('users',1);await db.insert('users',{id:9001,company_id:1,email:'unlinked-fixture@example.test',full_name:'Unlinked fixture',status:'active',role_code:'ADMIN',password_hash:original.password_hash});
 await db.insert('employees',{id:9001,company_id:2,status:'active',first_name:'Foreign employee'});await db.insert('attendance',{company_id:2,employee_id:9001,date:'2026-10-27',clock_in:'2026-10-27T07:00:00Z'});
 const previousNodeEnv=process.env.NODE_ENV;process.env.NODE_ENV='test';
 const {default:app}=await import('../index.js');const server=app.listen(0);await new Promise(resolve=>server.once('listening',resolve));
 const base=`http://127.0.0.1:${server.address().port}/api`;
 const token=async email=>(await authService.login(email,'ChangeMe123!')).token;
 const get=async(path,auth)=>{const r=await fetch(base+path,{headers:auth?{Authorization:'Bearer '+auth}:{}});return {status:r.status,body:await r.json()};};
 try{
  const staff=await token('field@edgewforce.com'),supervisor=await token('supervisor@edgewforce.com'),admin=await token('it@edgewforce.com'),unlinked=await token('unlinked-fixture@example.test');
  assert.equal((await get('/field/alerts')).status,401);
  const alerts=await get('/field/alerts',staff);assert.equal(alerts.status,200);assert.equal(alerts.body.data.length,1);assert.equal(alerts.body.data[0].message,'Own alert');
  const shift=await get('/field/shifts/current',staff);assert.equal(shift.body.data.clock_in_time,'2026-10-27T07:10:00Z');assert.equal((await get('/field/route-manifest',staff)).body.data.length,1);
  assert.equal((await get('/field/shifts/current',unlinked)).body.data,null);assert.deepEqual((await get('/field/route-manifest',unlinked)).body.data,[]);
  const own=await get('/field/geolocation-report?employee_id=4',staff);assert.equal(own.status,200);assert.deepEqual(own.body.data.map(r=>r.id).sort(),[901,902]);
  const missing=own.body.data.find(r=>r.id===901);assert.equal(missing.latitude,null);assert.equal(missing.accuracy,null);assert.equal(missing.distance_meters,null);assert.equal(missing.geofence_status,'Not recorded');
  const zero=own.body.data.find(r=>r.id===902);assert.equal(zero.latitude,0);assert.equal(zero.accuracy,0);assert.equal(zero.distance_meters,0);
  assert.equal((await get('/field/geolocation-report',supervisor)).body.data.length,2);assert.equal((await get('/field/geolocation-report?employee_id=4',supervisor)).status,403);assert.equal((await get('/field/geolocation-report',admin)).body.data.length,3);
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));if(previousNodeEnv===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=previousNodeEnv;if(oldEnforcement===undefined)delete process.env.WORKFORCE_GEOFENCE_ENFORCED;else process.env.WORKFORCE_GEOFENCE_ENFORCED=oldEnforcement;}
});
