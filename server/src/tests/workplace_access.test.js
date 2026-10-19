import test from 'node:test';
import assert from 'node:assert/strict';
import { db,resetTestData } from './helpers/database.js';
import { authService } from '../services/authService.js';
import { workplaceAccessService as service } from '../services/workplaceAccessService.js';
import { executiveReportService as reports } from '../services/executiveReportService.js';
import { workforceNoticeService } from '../services/workforceNoticeService.js';
import { locationService } from '../services/locationService.js';
import { requireAuth,signUserToken } from '../middleware/auth.js';

test('Market boundaries, server session revocation, re-entry and executive summaries',async t=>{
  t.mock.timers.enable({apis:['Date'],now:Date.parse('2026-10-19T07:30:00Z')});
  process.env.WORKFORCE_GEOFENCE_ENFORCED='true';process.env.WORKFORCE_REPORTS_ENABLED='true';
  await resetTestData();
  const staff=await db.findById('users',4),admin=await db.findById('users',1),hr=await db.findById('users',3);
  const employee=await db.findOne('employees',{user_id:staff.id});
  const market=await locationService.createLocation({name:'Market A',location_type:'Market',latitude:6.6,longitude:3.4,geofence_radius:150},admin);
  const other=await locationService.createLocation({name:'Market B',location_type:'Market',latitude:6.6,longitude:3.41},admin);
  await locationService.assignEmployeeLocation({employee_id:employee.id,location_id:market.id},admin);
  const noProfileHr=await db.insert('users',{company_id:1,email:'hr-noprofile@example.test',full_name:'HR without profile',role_code:'HR_MANAGER',status:'active'});
  const foreign=await db.insert('users',{company_id:2,email:'foreign-report@example.test',full_name:'Foreign HR',role_code:'HR_MANAGER',status:'active'});
  const gps=(latitude=6.6,longitude=3.4,accuracy=5)=>({latitude,longitude,accuracy,timestamp:Date.now()});
  const credentials=()=>authService.login(staff.email,'ChangeMe123!');
  const start=async()=>service.challenge(await credentials());
  const authorize=async token=>{
    const req={headers:{authorization:'Bearer '+token},originalUrl:'/api/auth/me'},res={code:null,body:null,status(n){this.code=n;return this;},json(b){this.body=b;}};
    let accepted=false;await requireAuth(req,res,()=>{accepted=true;});return {accepted,req,res};
  };
  let challenge,access,second,actor;
  await t.test('All markets use 300 metres and HR/admin accounts remain available',async()=>{
    assert.equal(market.geofence_radius,300);assert.equal(other.geofence_radius_meters,300);
    assert.equal((await service.challenge(await authService.login(admin.email,'ChangeMe123!'))).location_required,undefined);
  });
  await t.test('Credentials alone issue a short-lived challenge, never an app token',async()=>{
    challenge=await start();assert.equal(challenge.location_required,true);assert.equal(challenge.token,undefined);assert.equal(challenge.refresh_token,undefined);
    assert.equal((await authorize(challenge.challenge)).accepted,false);
    assert.equal((await authorize(signUserToken(staff))).res.code,401);
  });
  await t.test('Outside, stale and uncertain GPS cannot complete sign-in',async()=>{
    await assert.rejects(service.complete(challenge.challenge,gps(6.6,3.41)),/inside/);
    await assert.rejects(service.complete(challenge.challenge,gps(6.6,3.4,200)),/precise GPS/);
    await assert.rejects(service.complete(challenge.challenge,{...gps(),timestamp:Date.now()-61000}),/stale/);
    access=await service.complete(challenge.challenge,gps());
    assert.equal(access.auth_mode,'workplace_session');
    const authenticated=await authorize(access.token);assert.equal(authenticated.accepted,true);actor=authenticated.req.user;
    await assert.rejects(service.complete(challenge.challenge,gps()),/no longer valid/);
  });
  await t.test('A single outside or overlapping boundary fix does not force a logout',async()=>{
    const first=await service.ping(actor,gps(6.604,3.4));assert.equal(first.state,'active');
    t.mock.timers.tick(15000);
    const uncertain=await service.ping(actor,gps(6.6027,3.4,40));assert.equal(uncertain.state,'active');
    assert.equal((await db.find('workforce_movement_events')).filter(e=>e.kind==='workplace_departure').length,0);
    await service.ping(actor,gps());
  });
  await t.test('Two accurate outside fixes revoke every device and notify both HR and admin in the same company',async()=>{
    second=await service.complete((await start()).challenge,gps());
    await service.ping(actor,gps(6.6,3.41));t.mock.timers.tick(15000);
    const outside=await service.ping(actor,gps(6.6,3.41));assert.equal(outside.state,'revoked');
    const event=(await db.find('workforce_movement_events')).find(e=>e.kind==='workplace_departure');
    assert.equal(event.details.detected_location_name,'Market B');
    for(const recipient of [hr,admin,noProfileHr])assert.equal((await workforceNoticeService.list(recipient)).length,1);
    assert.equal((await workforceNoticeService.list(foreign)).length,0);
    assert.equal((await authorize(access.token)).res.body.error.code,'WORKPLACE_SESSION_REVOKED');
    assert.equal((await authorize(second.token)).accepted,false);
    await assert.rejects(service.ping(actor,gps()),/ended/);
    assert.equal((await db.find('workforce_movement_events')).filter(e=>e.kind==='workplace_departure').length,1);
  });
  await t.test('Restoring an old token cannot bypass logout; a fresh inside sign-in is required',async()=>{
    const newChallenge=await start();
    await assert.rejects(service.complete(newChallenge.challenge,gps(6.6,3.41)),/inside/);
    const returned=await service.complete(newChallenge.challenge,gps());assert.equal((await authorize(returned.token)).accepted,true);
    const returnedActor=(await authorize(returned.token)).req.user;
    await service.logout(returnedActor);assert.equal((await authorize(returned.token)).accepted,false);
  });
  await t.test('Moving to another assigned market still requires a new session at that market',async()=>{
    await locationService.assignEmployeeLocation({employee_id:employee.id,location_id:other.id,assignment_type:'secondary'},admin);
    const startAtA=await service.complete((await start()).challenge,gps());const user=(await authorize(startAtA.token)).req.user;
    await service.ping(user,gps(6.6,3.41));t.mock.timers.tick(15000);assert.equal((await service.ping(user,gps(6.6,3.41))).state,'revoked');
    const freshAtB=await service.complete((await start()).challenge,gps(6.6,3.41));assert.equal((await db.findById('workforce_access_sessions',freshAtB.workplace_session_id)).location_id,other.id);
  });
  await t.test('Unverified sessions expire on the server and cannot be revived through a ping',async()=>{
    const entry=await service.complete((await start()).challenge,gps());t.mock.timers.tick(121000);
    const expired=await authorize(entry.token);assert.equal(expired.res.body.error.code,'LOCATION_REQUIRED');
    await assert.rejects(service.ping({...staff,employee,workplace_session_id:entry.workplace_session_id},gps()),/ended/);
  });
  await t.test('Reports contain only company facts and do not expose them to staff or another tenant',async()=>{
    const today=await reports.today(hr);assert.equal(today.report.facts.confirmed_departures,2);assert.ok(today.summary.includes('do not establish absence'));
    await assert.rejects(reports.today(staff),/Only HR/);
    const foreignReport=await reports.today(foreign);assert.equal(foreignReport.report.facts.confirmed_departures,0);assert.deepEqual(foreignReport.movements,[]);
    const notice=(await workforceNoticeService.list(hr))[0];await assert.rejects(workforceNoticeService.markRead(foreign,notice.id),/not found/);await workforceNoticeService.markRead(hr,notice.id);
  });
  await t.test('Real AI transport uses aggregate facts, validates evidence and limits duplicate generation',async()=>{
    process.env.OPENAI_API_KEY='test-provider-key';process.env.AI_EXECUTIVE_MODEL='test-model';process.env.EXECUTIVE_AI_PROVIDER='openai';
    let calls=0;
    const fake=async(url,options)=>{
      calls++;const payload=JSON.parse(options.body);assert.equal(url,'https://api.openai.com/v1/responses');assert.equal(payload.store,false);assert.equal(payload.model,'test-model');
      for(const privateValue of [staff.email,employee.first_name,'latitude','longitude','Market A'])assert.ok(!payload.input.includes(privateValue));
      return {ok:true,json:async()=>({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({overview:'Recorded activity includes confirmed workplace movements.',observations:[{text:'Confirmed movements need contextual review.',evidence_keys:['confirmed_departures']}],recommended_actions:['Review movement context with staff.'],limitations:['App records alone do not prove misconduct.']})}]}]})};
    };
    const generated=await Promise.allSettled([reports.generate(hr,fake),reports.generate(hr,fake)]);assert.equal(calls,1);assert.equal(generated.filter(r=>r.status==='fulfilled').length,1);assert.equal(generated.find(r=>r.status==='fulfilled').value.report.source,'openai');
    t.mock.timers.tick(901000);
    await assert.rejects(reports.generate(hr,async()=>({ok:false})),/no AI report was fabricated/);
  });
  await t.test('HTTP sign-in requires location and the API rejects a token after confirmed departure',async()=>{
    process.env.NODE_ENV='test';
    const {default:app}=await import('../index.js');const server=app.listen(0);
    await new Promise(resolve=>server.once('listening',resolve));
    const base=`http://127.0.0.1:${server.address().port}/api`;
    const call=async(path,token,body)=>{const response=await fetch(base+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:response.status,body:await response.json()};};
    try {
      const login=await call('/auth/login',null,{identifier:staff.email,password:'ChangeMe123!'});
      assert.equal(login.status,200);assert.equal(login.body.data.location_required,true);assert.equal(login.body.token,undefined);
      const challenge=login.body.data.challenge;
      assert.equal((await call('/auth/location-login',null,{challenge,...gps(6.7,3.4)})).status,403);
      const entry=await call('/auth/location-login',null,{challenge,...gps()});assert.equal(entry.status,200);
      const token=entry.body.data.token;assert.equal((await call('/auth/me',token)).body.data.workplace_session_id,entry.body.data.workplace_session_id);
      await call('/workplace-access/ping',token,gps(6.6,3.41));t.mock.timers.tick(16000);
      assert.equal((await call('/workplace-access/ping',token,gps(6.6,3.41))).body.data.state,'revoked');
      assert.equal((await call('/auth/me',token)).status,401);
      assert.equal((await call('/executive-reports/today',token)).status,401);
    } finally {await new Promise(resolve=>server.close(resolve));}
  });
});
