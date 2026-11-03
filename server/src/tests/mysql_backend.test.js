import test from 'node:test';
import assert from 'node:assert/strict';
import {mysqlConfiguration,createMysqlDatabase} from '../config/mysqlDatabase.js';
import {mysqlSchema,mysqlCreateTable,mysqlRecord,decodeMysqlRow,encodeMysqlValue,sqlIdentifier} from '../config/mysqlSchema.js';
import {copyDigest} from '../../../deploy/mysql/copyVerification.mjs';

test('MySQL is explicit, requires private credentials and verifies TLS for remote connections',()=>{
  assert.throws(()=>mysqlConfiguration({}),/requires/);
  const env={MYSQL_DATABASE:'edgewforce_test',MYSQL_USER:'test',MYSQL_PASSWORD:'private-test-password'};
  assert.equal(mysqlConfiguration(env).host,'127.0.0.1');assert.equal(mysqlConfiguration(env).multipleStatements,false);
  assert.throws(()=>mysqlConfiguration({...env,MYSQL_HOST:'remote.example'}),/verified TLS/);
  assert.equal(mysqlConfiguration({...env,MYSQL_HOST:'remote.example',MYSQL_SSL:'true'}).ssl.rejectUnauthorized,true);
  assert.throws(()=>mysqlConfiguration({...env,MYSQL_PORT:'-1'}),/port/);
});
test('Relational schemas preserve integer IDs, JSON, microseconds and safe application defaults',()=>{
  for(const table of Object.keys(mysqlSchema)){const ddl=mysqlCreateTable(table);assert.match(ddl,/ENGINE=InnoDB/);assert.doesNotMatch(ddl,/\bBIGINT\b/i);}
  assert.throws(()=>sqlIdentifier('users; DROP TABLE users'),/identifier/);
  assert.equal(encodeMysqlValue({format:'timestamp with time zone'},'2026-11-03T08:00:00.123456+01:00'),'2026-11-03 07:00:00.123456');
  assert.throws(()=>encodeMysqlValue({type:'integer'},2147483648),/integer range/);
  const task=mysqlRecord('collaboration_tasks',{company_id:1,project_id:1,title:'Example',assignee_ids:[1,2]},{defaults:true});
  assert.equal(task.status,'todo');assert.equal(task.version,1);assert.equal(task.assignee_ids,'[1,2]');assert.ok(task.series_id);
  assert.throws(()=>mysqlRecord('users',{unknown:'value'}),/Unknown/);
  const presence=decodeMysqlRow('workforce_activity_presence',{id:1,sequence:3,stopped_at:null,last_seen_at:'2026-11-03 07:00:00.123456'});
  assert.equal(presence.last_seen_at,'2026-11-03T07:00:00.123456Z');
  assert.equal(decodeMysqlRow('users',{status:'active',requires_password_change:0}).requires_password_change,false);
});
test('Copy checksums preserve nulls, JSON and timestamp precision across database representations',()=>{
  const source={id:1,company_id:1,project_id:1,title:'Example',assignee_ids:[2,1],created_at:'2026-11-03T07:00:00.123456+00:00'};
  const target=decodeMysqlRow('collaboration_tasks',{...source,assignee_ids:'[2,1]',created_at:'2026-11-03 07:00:00.123456'},{aliases:false});
  assert.equal(copyDigest('collaboration_tasks',[source]),copyDigest('collaboration_tasks',[target]));
  assert.notEqual(copyDigest('collaboration_tasks',[source]),copyDigest('collaboration_tasks',[{...source,title:'Changed'}]));
});
test('MySQL parameterizes filters and gives nested operations one cross-process transaction lock',async()=>{
  const calls=[];
  const connection={execute:async(sql,params)=>{calls.push({sql,params});return [sql.includes('GET_LOCK')?[{acquired:1}]:[]];},beginTransaction:async()=>calls.push('begin'),commit:async()=>calls.push('commit'),rollback:async()=>calls.push('rollback'),release:()=>calls.push('release'),destroy:()=>calls.push('destroy')};
  const pool={execute:connection.execute,getConnection:async()=>connection,end:async()=>{}};
  const db=createMysqlDatabase({database:'edgewforce_test'},{pool});
  const malicious="nobody' OR 1=1 --";
  await db.find('users',{email:malicious},{select:'id,email',limit:2});
  assert.ok(!calls[0].sql.includes(malicious));assert.deepEqual(calls[0].params,[malicious]);
  await assert.rejects(db.find('users',{no_such_column:1}),/Unknown/);
  calls.length=0;
  await db.transaction(async()=>db.transaction(async()=>db.find('users',{id:1})));
  assert.equal(calls.filter(c=>c==='begin').length,1);assert.equal(calls.filter(c=>c==='commit').length,1);assert.equal(calls.filter(c=>c.sql?.includes('GET_LOCK')).length,1);
  calls.length=0;
  await assert.rejects(db.transaction(async()=>{throw Error('Fixture rollback');}),/Fixture rollback/);
  assert.ok(calls.includes('rollback'));assert.ok(calls.at(-2).sql.includes('RELEASE_LOCK'));assert.equal(calls.at(-1),'release');
});
