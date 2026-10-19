import test from 'node:test';
import assert from 'node:assert/strict';
import { db, resetTestData } from './helpers/database.js';
import { fieldService } from '../services/fieldService.js';
import { locationService } from '../services/locationService.js';
import { getLagosTime, determineShiftAttendanceWindow } from '../utils/nigeriaTime.js';

test('Staff attendance follows server windows, geofences and ownership', async t => {
  await resetTestData();
  const employee = await db.findById('employees',3);
  const staff = { user: { id: employee.user_id, company_id:1, role_code:'STAFF_MEMBER', employee } };
  const office = await locationService.createLocation({name:'Attendance Test Office',latitude:6.6,longitude:3.4});
  const unassigned = await locationService.createLocation({name:'Unassigned Test Office',latitude:6.8,longitude:3.6});
  await locationService.assignEmployeeLocation({employee_id:3,location_id:office.id});
  const gps={employeeId:3,latitude:6.6,longitude:3.4,accuracy:5,req:staff};
  await t.test('Midnight uses hour zero and closes attendance until 8 AM',()=>{
    const midnight=getLagosTime('2026-10-12T23:00:00Z');assert.equal(midnight.hours,0);assert.equal(midnight.dateStr,'2026-10-13');assert.equal(determineShiftAttendanceWindow(midnight.date).allowed,false);
  });
  await t.test('Corporate staff cannot clock in before the window',async()=>{
    await assert.rejects(fieldService.checkIn({...gps,testDate:'2026-10-13T06:59:59Z'}),/8:00 AM/);
    assert.equal((await db.find('attendance',{employee_id:3})).length,0);
  });
  let original;
  await t.test('Concurrent morning requests persist exactly one clock-in',async()=>{
    const results=await Promise.allSettled([1,2].map(()=>fieldService.checkIn({...gps,testDate:'2026-10-13T07:00:00Z'})));
    assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(results.filter(r=>r.status==='rejected').length,1);
    original=(await db.findOne('attendance',{employee_id:3})).clock_in_time;
  });
  await t.test('Checkout stays closed until 5:00 PM',async()=>{
    await assert.rejects(fieldService.checkOut({...gps,testDate:'2026-10-13T15:59:59Z'}),/5:00 PM/);
  });
  await t.test('Midday button records attendance without ending the shift',async()=>{
    const result=await fieldService.toggleShift(3,6.6,3.4,'Test',staff,'2026-10-13T11:00:00Z');
    assert.ok(result.midday_clock_in);assert.equal(result.clock_in_time,original);assert.ok(!result.clock_out_time);
    const status=await fieldService.getShiftWindowStatus(3,1,'2026-10-13T11:01:00Z');assert.equal(status.can_record,false);assert.match(status.action_message,/already recorded/);
  });
  await t.test('Checkout requires valid GPS within an assigned office',async()=>{
    await assert.rejects(fieldService.checkOut({...gps,latitude:undefined,testDate:'2026-10-13T16:00:00Z'}),/GPS/);
    await assert.rejects(fieldService.checkOut({...gps,latitude:6.8,longitude:3.6,testDate:'2026-10-13T16:00:00Z'}),/CHECK-OUT BLOCKED/);
    assert.ok(!(await db.findOne('attendance',{employee_id:3})).clock_out_time);
  });
  await t.test('Evening button closes the shift and calculates duration from morning',async()=>{
    const status=await fieldService.getShiftWindowStatus(3,1,'2026-10-13T16:00:00Z');assert.equal(status.can_record,true);
    const result=await fieldService.toggleShift(3,6.6,3.4,'Test',staff,'2026-10-13T16:00:00Z');assert.ok(result.evening_clock_out);assert.equal(result.working_hours,9);
    const completed=await fieldService.getShiftWindowStatus(3,1,'2026-10-13T16:00:00Z');assert.equal(completed.can_record,false);assert.match(completed.button_label,/COMPLETED/);
  });
  await t.test('Evening cannot create attendance without a prior clock-in',async()=>{
    await assert.rejects(fieldService.checkIn({...gps,testDate:'2026-10-14T16:00:00Z'}),/No active shift/);
    assert.equal(await db.findOne('attendance',{employee_id:3,date:'2026-10-14'}),null);
  });
  await t.test('Staff cannot impersonate another employee or override geofencing',async()=>{
    await assert.rejects(fieldService.checkIn({...gps,employeeId:1,testDate:'2026-10-14T07:30:00Z'}),/own attendance/);
    await assert.rejects(fieldService.checkIn({...gps,isOverride:true,testDate:'2026-10-14T07:30:00Z'}),/authorized supervisor/);
    await assert.rejects(fieldService.checkIn({...gps,storeId:unassigned.id,latitude:6.8,longitude:3.6,testDate:'2026-10-14T07:30:00Z'}),/not assigned/);
  });
  await t.test('A 9:15 arrival is late and midday preserves the original lateness without duplicate alerts',async()=>{
    const arrival=await fieldService.checkIn({...gps,testDate:'2026-10-15T08:15:00Z'});
    assert.equal(arrival.status,'late');
    const midday=await fieldService.checkIn({...gps,testDate:'2026-10-15T11:30:00Z'});
    assert.equal(midday.status,'late');assert.equal(midday.clock_in_time,arrival.clock_in_time);
    const alerts=(await db.find('location_alerts',{employee_id:3,alert_type:'LATE_CHECKIN'}));
    assert.equal(alerts.length,1);assert.equal(alerts[0].details.late_minutes,15);
  });
});
