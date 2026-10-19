import test from 'node:test';
import assert from 'node:assert/strict';
import {db,resetTestData} from './helpers/database.js';
import {nexusIntelligenceService as nexus} from '../services/nexusIntelligenceService.js';
import {nexusModelService as model} from '../services/nexusModelService.js';
import {analyseNexus} from '../services/nexusAnalytics.js';
import {adminService} from '../services/adminService.js';
import {authService} from '../services/authService.js';

test('NEXUS isolates records, verifies calculations and uses only a private model',async t=>{
  t.mock.timers.enable({apis:['Date'],now:Date.parse('2026-10-19T12:00:00Z')});
  process.env.NEXUS_ENABLED='true';await resetTestData();
  const admin=await db.findById('users',1),staff=await db.findById('users',4),hr=await db.findById('users',3);
  const foreign=await db.insert('users',{company_id:2,email:'nexus-other@example.test',role_code:'HR_MANAGER',status:'active'});
  await db.insert('attendance',{company_id:1,employee_id:4,date:'2026-10-19',clock_in:'2026-10-19T08:15:00Z',status:'late'});
  await db.insert('attendance',{company_id:2,employee_id:999,date:'2026-10-19',clock_in:'2026-10-19T08:15:00Z',status:'late'});
  await db.insert('visits',{company_id:1,planned_date:'2026-10-19',status:'completed'});await db.insert('visits',{company_id:1,planned_date:'2026-10-19',status:'planned'});
  await db.insert('orders',{company_id:1,order_date:'2026-10-19',total_amount:200,status:'APPROVED'});await db.insert('orders',{company_id:1,order_date:'2026-10-19',total_amount:900,status:'CANCELLED'});
  let view;
  await t.test('Actual company records produce transparent rates with no invented targets',async()=>{
    view=await nexus.overview(admin,7);const get=id=>view.analysis.evidence.find(e=>e.id===id);
    assert.equal(get('clocked_in').value,1);assert.equal(get('late_arrival_rate').value,100);assert.equal(get('visit_completion_rate').value,50);assert.equal(get('order_value').value,200);assert.equal(get('order_value').percent_change,null);
    assert.equal(get('visit_completion_rate').denominator,2);assert.equal(view.analysis.trend.length,7);assert.equal(view.model.configured,false);
    assert.equal(analyseNexus({days:[]}).evidence.find(e=>e.id==='visit_completion_rate').value,null);
  });
  await t.test('Staff, forged roles and foreign-company records cannot leak into executive analysis',async()=>{
    await assert.rejects(nexus.overview(staff),/requires HR/);await assert.rejects(nexus.overview({...staff,role_code:'SUPER_ADMIN'}),/requires HR/);
    assert.equal((await nexus.overview(foreign)).analysis.evidence.find(e=>e.id==='order_value').value,0);
    await assert.rejects(nexus.overview({...admin,company_id:2}),/not active/i);await assert.rejects(nexus.overview(admin,200),/7 or 30/);
  });
  await t.test('Private adapters reject OpenAI destinations and non-HTTPS remote hosts',()=>{
    process.env.NEXUS_MODEL='test-private-model';process.env.NEXUS_MODEL_URL='https://api.openai.com';assert.throws(()=>model.configuration(),/private model/);
    process.env.NEXUS_MODEL_URL='http://remote.example.test';assert.throws(()=>model.configuration(),/HTTPS/);
    process.env.NEXUS_MODEL_URL='https://private-model.example.test';process.env.NEXUS_MODEL_PROVIDER='ollama';process.env.NEXUS_MODEL_API_KEY='test-private-key';
  });
  const valid={overview:'The records support a focused operational review.',hypotheses:[{statement:'Schedule updates may explain the incomplete visits.',evidence_ids:['planned_visits','completed_visits'],investigation:'Compare approved assignments with visit updates.'}],recommended_actions:['Review scheduled visit coverage with the team.'],uncertainties:['Aggregate records cannot establish a cause.']};
  const fake=value=>async(url,options)=>{assert.equal(url,'https://private-model.example.test/api/chat');assert.equal(options.redirect,'error');const body=JSON.parse(options.body);assert.equal(body.stream,false);assert.equal(body.model,'test-private-model');const input=body.messages[1].content;for(const secret of [staff.email,'latitude','longitude','password_hash'])assert.ok(!input.includes(secret));return {ok:true,text:async()=>JSON.stringify({done:true,message:{content:JSON.stringify(value)}})};};
  await t.test('Evidence references, numeric claims and incomplete responses are checked',async()=>{
    await assert.rejects(model.reason(view.analysis,'Explain this period',fake({...valid,hypotheses:[{...valid.hypotheses[0],evidence_ids:['invented_source']}]})),/unsupported evidence/);
    await assert.rejects(model.reason(view.analysis,'Explain this period',fake({...valid,overview:'Revenue increased by 999 percent.'})),/verification gate/);
    const result=await model.reason(view.analysis,'Explain this period',fake(valid));assert.equal(result.source,'private_model');assert.equal(result.hypotheses[0].status,'unverified_hypothesis');
  });
  await t.test('Generation saves verified evidence without storing the question and limits concurrent work',async()=>{
    const attempts=await Promise.allSettled([nexus.investigate(hr,{question:'What should we review?'},fake(valid)),nexus.investigate(hr,{question:'What should we review?'},fake(valid))]);
    assert.equal(attempts.filter(a=>a.status==='fulfilled').length,1);const runs=await db.find('nexus_intelligence_runs',{company_id:1});assert.equal(runs.length,1);assert.equal(runs[0].question,undefined);assert.equal(runs[0].question_hash.length,64);
    assert.ok((await nexus.overview(admin)).reasoning);assert.equal((await nexus.overview(foreign)).reasoning,null);
    await db.insert('visits',{company_id:1,planned_date:'2026-10-19',status:'planned'});assert.equal((await nexus.overview(admin)).reasoning,null);
  });
});

test('Account password management enforces tenant and administrator boundaries',async t=>{
  await resetTestData();const admin=await db.findById('users',1),staff=await db.findById('users',4),hr=await db.findById('users',3);
  const operator=await db.insert('users',{company_id:1,email:'operator@example.test',full_name:'Operator',role_code:'ADMIN',status:'active'}),foreign=await db.insert('users',{company_id:2,email:'other@example.test',role_code:'STAFF_MEMBER',status:'active'});
  await assert.rejects(adminService.listAccessAccounts(hr),/Administrator/);
  await assert.rejects(adminService.resetAccountPassword(staff.id,'NewPassword123!',{...staff,role_code:'SUPER_ADMIN'}),/Administrator/);
  await assert.rejects(adminService.resetAccountPassword(foreign.id,'NewPassword123!',admin),/your company/);
  await assert.rejects(adminService.resetAccountPassword(admin.id,'NewPassword123!',operator),/superadmin/);
  await assert.rejects(adminService.resetAccountPassword(admin.id,'NewPassword123!',admin),/own credentials/);
  await assert.rejects(adminService.resetAccountPassword(staff.id,'short',admin),/12/);
  await adminService.resetAccountPassword(staff.id,'TemporaryPassword123!',admin);
  assert.equal((await authService.login(staff.email,'TemporaryPassword123!')).user.requires_password_change,true);
  await assert.rejects(authService.login(staff.email,'ChangeMe123!'),/Invalid/);
  assert.equal((await db.find('audit_logs',{action:'STAFF_PASSWORD_RESET'})).length,1);
  const accounts=await adminService.listAccessAccounts(admin);assert.ok(accounts.find(u=>u.id===operator.id));assert.equal(accounts[0].password_hash,undefined);
});
