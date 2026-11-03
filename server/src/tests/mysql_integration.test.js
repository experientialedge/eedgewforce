import test from 'node:test';
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import {mysqlConfiguration,createMysqlDatabase} from '../config/mysqlDatabase.js';
import {mysqlSchemaStatements} from '../../../deploy/mysql/schema.mjs';
import {db} from '../config/database.js';
import {locationService} from '../services/locationService.js';
import {authService} from '../services/authService.js';
import {fieldService} from '../services/fieldService.js';
import {collaborationService} from '../services/collaborationService.js';
import {hrDailyReportService} from '../services/hrDailyReportService.js';

test('Real MySQL: transactions, staff sign-in, workplace attendance, collaboration and Excel', {skip:process.env.MYSQL_TESTS!=='true'}, async t=>{
  const config=mysqlConfiguration();
  if(!config.database.endsWith('_test'))throw new Error('MySQL integration tests require a dedicated database ending _test.');
  const connection=await mysql.createConnection(config),backend=createMysqlDatabase(config),other=createMysqlDatabase(config);
  const saved={...db};
  try{
    for(const statement of mysqlSchemaStatements)await connection.query(statement);
    Object.assign(db,backend);
    await db.insert('companies',{id:1,name:'Isolated MySQL test company'});
    const actor=await db.insert('users',{company_id:1,full_name:'Test administrator',email:'admin@mysql.example',role_code:'SUPER_ADMIN',password_hash:await bcrypt.hash('IsolatedMysqlTest123!',10),requires_password_change:false});
    const staff=await db.insert('users',{company_id:1,full_name:'Test staff',email:'staff@mysql.example',role_code:'STAFF_MEMBER',password_hash:await bcrypt.hash('IsolatedMysqlTest123!',10),requires_password_change:false});
    const employee=await db.insert('employees',{company_id:1,user_id:staff.id,first_name:'Test',last_name:'Staff',employee_code:'MYSQL-TEST-1',status:'active'});
    await t.test('Separate pools serialize and roll back multi-record transactions',async()=>{
      await assert.rejects(db.transaction(async()=>{await db.insert('users',{email:'rollback@mysql.example',company_id:1});throw Error('Rollback fixture');}));
      assert.equal(await db.findOne('users',{email:'rollback@mysql.example'}),null);
      const record=await db.insert('inventory',{quantity:0,company_id:1});
      await Promise.all([backend,other].map(adapter=>adapter.transaction(async()=>{const current=await adapter.findById('inventory',record.id);await adapter.update('inventory',record.id,{quantity:Number(current.quantity)+1});})));
      assert.equal((await db.findById('inventory',record.id)).quantity,2);
    });
    await t.test('Existing bcrypt sign-in and a real assigned workplace support the attendance flow',async()=>{
      t.mock.timers.enable({apis:['Date'],now:Date.parse('2026-11-03T07:30:00Z')});
      const login=await authService.login(staff.email,'IsolatedMysqlTest123!');assert.ok(login.token);
      const office=await locationService.createLocation({name:'MySQL office',latitude:6.6,longitude:3.4,geofence_radius:150},actor);
      await locationService.assignEmployeeLocation({employee_id:employee.id,location_id:office.id},actor);
      assert.equal((await locationService.getActivePermittedLocations(employee.id,1))[0].id,office.id);
      const gps={employeeId:employee.id,latitude:6.6,longitude:3.4,accuracy:8};
      const recorded=await fieldService.checkIn(gps);assert.ok(recorded.id);
      assert.equal((await db.find('attendance',{employee_id:employee.id})).length,1);
      await assert.rejects(fieldService.checkIn({...gps,latitude:7,longitude:4}));
      t.mock.timers.reset();
    });
    await t.test('Shared projects, member visibility and task JSON survive SQL round trips',async()=>{
      const project=await collaborationService.create(actor,{name:'SQL shared project',member_ids:[staff.id]});
      assert.equal((await collaborationService.overview(staff)).projects[0].id,project.id);
      const task=await collaborationService.write(actor,project.id,'task',{title:'SQL task',assignee_ids:[staff.id],priority:'normal'});
      assert.deepEqual(task.assignee_ids,[staff.id]);assert.equal(task.status,'todo');
    });
    await t.test('Excel and binary attachments are generated from the internal database',async()=>{
      const workbook=await hrDailyReportService.download(actor,'2026-11-03');assert.equal(Buffer.from(workbook).subarray(0,2).toString(),'PK');
      const bytes=Buffer.from('private fixture attachment');await db.storeFile('fixture.pdf','application/pdf',bytes);
      assert.deepEqual((await db.getFile('fixture.pdf')).payload,bytes);
    });
  }finally{Object.assign(db,saved);await Promise.all([connection.end(),backend.close(),other.close()]);}
});
