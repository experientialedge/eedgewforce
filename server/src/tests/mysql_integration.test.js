import { sosService } from '../services/sosService.js';
import { idleService } from '../services/idleService.js';
import { scheduleService } from '../services/scheduleService.js';
import { notificationService } from '../services/notificationService.js';
import { emailService } from '../services/emailService.js';
import { upgradeMysqlSchedules, upgradeMysqlOperationalIndexes } from '../config/mysqlUpgrades.js';
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
import {hrService} from '../services/hrService.js';
import {staffLifecycleService} from '../services/staffLifecycleService.js';
import {employeeService} from '../services/employeeService.js';
import {reviewLeave} from '../services/leaveReviewService.js';

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
    await t.test('Permanent numbers, concurrent hires and recoverable staff removal use the internal database',async()=>{
      const hires=await Promise.all([1,2,3].map(i=>hrService.registerStaff({first_name:'Numbered',last_name:'Staff',email:`numbered${i}@mysql.example`,department:'IT',hire_date:'2026-01-01'},actor)));
      assert.deepEqual(hires.map(r=>r.employee.employee_code).sort(),['IT20260001','IT20260002','IT20260003']);
      const target=hires[0].employee,change={reason:'Employee left the organisation.',confirmation:target.employee_code};
      await staffLifecycleService.change(target.id,change,actor);
      assert.equal((await db.findById('users',target.user_id)).status,'inactive');
      assert.ok((await db.findById('employees',target.id)).deleted_at);
      assert.equal((await db.findOne('employee_number_registry',{employee_id:target.id})).id,target.employee_code);
      await staffLifecycleService.change(target.id,{...change,restore:true},actor);
      assert.equal((await db.findById('employees',target.id)).employee_code,target.employee_code);
      assert.equal((await db.findById('employees',target.id)).status,'inactive');
    });
    await t.test('Full HR registration initializes normalized balances and leave approval debits once',async()=>{
      const registered=await hrService.registerStaff({first_name:'Registered',last_name:'Staff',email:'registered@mysql.example',phone:'+2348099998811'},actor);
      assert.ok(registered.employee.id);
      const balances=await employeeService.getLeaveBalances(registered.employee.id);
      assert.equal(balances.annual,20);assert.equal(balances.sick,12);assert.equal(balances.casual,5);
      const rows=await db.find('leave_balances',{employee_id:registered.employee.id});
      assert.equal(rows.length,3);assert.ok(rows.every(r=>r.company_id===1&&r.annual===undefined));
      const leave=await db.insert('leave_requests',{company_id:1,employee_id:registered.employee.id,leave_type:'annual',start_date:'2026-11-10',end_date:'2026-11-11',days:2,status:'pending'});
      await reviewLeave(actor,leave.id,true,'Verified test');
      assert.equal((await employeeService.getLeaveBalances(registered.employee.id)).annual,18);
      await assert.rejects(reviewLeave(actor,leave.id,true));
    });
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
    await t.test('Existing MySQL schedule schemas upgrade without losing records and support both reviews',async()=>{
      const old=await db.insert('schedules',{company_id:1,employee_id:employee.id,date:'2026-11-03',tasks:[{activity:'Preserved task'}],status:'SUBMITTED'});
      for(const name of ['employee_name','employee_code','department','position','title','submitted_at','supervisor_status','hr_status'])await connection.query('ALTER TABLE schedules DROP COLUMN `'+name+'`');
      const upgradePool=mysql.createPool(config);
      try {await upgradeMysqlSchedules(upgradePool,config.database);await upgradeMysqlSchedules(upgradePool,config.database);} finally {await upgradePool.end();}
      assert.equal((await db.findById('schedules',old.id)).tasks[0].activity,'Preserved task');
      const schedule=await scheduleService.createOrUpdateSchedule(employee.id,{status:'DRAFT',title:'SQL reviewed shift'});
      await scheduleService.reviewSupervisorSchedule(schedule.id,employee.id,{status:'APPROVED'});
      await scheduleService.reviewHRSchedule(schedule.id,actor.id,{status:'ACKNOWLEDGED'});
      assert.equal((await db.findById('schedules',schedule.id)).hr_status,'ACKNOWLEDGED');
    });
    await t.test('Operational indexes upgrade an older copy and prevent duplicate leave balances',async()=>{
      const balances=await db.find('leave_balances');
      const [indexes]=await connection.query("SHOW INDEX FROM leave_balances WHERE Non_unique=0 AND Key_name <> 'PRIMARY'");
      for(const name of new Set(indexes.map(i=>i.Key_name)))await connection.query('ALTER TABLE leave_balances DROP INDEX `'+name+'`');
      await connection.query('ALTER TABLE leave_balances MODIFY COLUMN leave_type LONGTEXT NULL');
      const upgradePool=mysql.createPool(config);
      try {await upgradeMysqlOperationalIndexes(upgradePool,config.database);await upgradeMysqlOperationalIndexes(upgradePool,config.database);} finally {await upgradePool.end();}
      assert.deepEqual(await db.find('leave_balances'),balances);
      const balance=balances[0];assert.ok(balance);
      const {id,...copy}=balance;
      await assert.rejects(db.insert('leave_balances',copy),/Duplicate entry/);
      const [queueIndexes]=await connection.query("SHOW INDEX FROM notifications WHERE Key_name='edgewforce_notifications_inbox'");
      assert.equal(queueIndexes.length,2);
    });
    await t.test('Emergency dispatch, notification read-state and inactivity use actual SQL columns',async()=>{
      t.mock.method(emailService,'sendIdleAlertEmail',async()=>({skipped:true}));
      const event=await sosService.dispatch(employee.id,6.6,3.4,7,'Isolated SQL fixture');
      assert.equal((await db.findById('sos_events',event.id)).accuracy,7);
      await sosService.review(event.id,actor);await sosService.review(event.id,actor,'Isolated fixture resolved');
      const notice=await notificationService.notify(employee.id,'Tasks','Fixture task','Fixture body');
      await notificationService.markRead(notice.id,employee.id);
      assert.equal((await db.findById('notifications',notice.id)).is_read,true);
      const identity={...staff,employee};
      const idle=await idleService.startIdleSession({duration_seconds:600},identity);
      await idleService.explainIdleSession(idle.id,{reason:'Break',reason_details:'SQL explanation'},identity);
      assert.equal((await idleService.getIdleSessions({},identity)).find(r=>r.id===idle.id).reason_details,'SQL explanation');
    });
    await t.test('Excel and binary attachments are generated from the internal database',async()=>{
      const workbook=await hrDailyReportService.download(actor,'2026-11-03');assert.equal(Buffer.from(workbook).subarray(0,2).toString(),'PK');
      const bytes=Buffer.from('private fixture attachment');await db.storeFile('fixture.pdf','application/pdf',bytes);
      assert.deepEqual((await db.getFile('fixture.pdf')).payload,bytes);
    });
  }finally{Object.assign(db,saved);await Promise.all([connection.end(),backend.close(),other.close()]);}
});
