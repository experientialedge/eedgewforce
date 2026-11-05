import test from 'node:test';
import assert from 'node:assert/strict';
import { db, resetTestData } from './helpers/database.js';
import { employeeController } from '../controllers/employeeController.js';
import { activeEmployeeId } from '../utils/staffIdentity.js';

function response() { return { statusCode: 200, status(code) { this.statusCode=code; return this; }, json(body) { this.body=body; return this; } }; }

test('Personal workforce records require the actual active employee linked to the authenticated company', async t => {
  await resetTestData();
  await db.update('employees',4,{user_id:888});
  const unlinked={id:4,company_id:1,role_code:'SALES_AGENT',employee:{id:4}};
  const methods=['getDashboard','getAttendance','verifyFaceBiometric','getLeaveBalances','applyLeave','getLeaveRequests','getLatestPayslip','getPayslips','getOKRs','updateOKR','getTasks','updateTask'];
  for(const method of methods) {
    await t.test(method+' rejects a coinciding user ID and stale employee object', async () => {
      const res=response();
      await employeeController[method]({user:unlinked,params:{id:'1'},body:{},headers:{}},res);
      assert.equal(res.statusCode,403); assert.match(res.body.error.message,/linked employee/);
    });
  }
  await t.test('An employee in another company cannot satisfy the staff link', async () => {
    await db.insert('employees',{company_id:2,user_id:4,employee_code:'OTHER-4',first_name:'Other',last_name:'Company',status:'active'});
    await assert.rejects(activeEmployeeId(unlinked),{status:403});
    assert.equal(await activeEmployeeId({...unlinked,company_id:2}),10);
    await db.update('employees',10,{status:'inactive'});
    await assert.rejects(activeEmployeeId({...unlinked,company_id:2}),{status:403});
  });
  await t.test('Linked staff can still read their own task list and apply for leave', async () => {
    const user=await db.findById('users',8);
    const task=await db.insert('tasks',{company_id:1,assigned_to:8,title:'Own fixture task',status:'pending'});
    await db.insert('tasks',{company_id:1,assigned_to:4,title:'Other fixture task',status:'pending'});
    const tasks=response(); await employeeController.getTasks({user},tasks);
    assert.equal(tasks.statusCode,200); assert.deepEqual(tasks.body.data.map(row=>row.id),[task.id]);
    const leave=response(); await employeeController.applyLeave({user,headers:{},body:{leave_type:'Annual',start_date:'2026-11-09',end_date:'2026-11-09',reason:'Fixture request'}},leave);
    assert.equal(leave.statusCode,201); assert.equal(leave.body.data.employee_id,8);
  });
});
