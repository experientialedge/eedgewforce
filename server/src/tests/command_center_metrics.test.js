import test from 'node:test';
import assert from 'node:assert/strict';
import {commandCenterMetrics,recordedScore,salesPeriod} from '../../../client/src/lib/commandCenterMetrics.js';

test('Executive sales periods respect Lagos midnight, Monday weeks, month boundaries and regional records',()=>{
  const now=new Date('2026-10-31T23:30:00Z');
  assert.deepEqual(salesPeriod('today',now),{start:'2026-11-01',end:'2026-11-01',today:'2026-11-01'});
  assert.equal(salesPeriod('yesterday',now).start,'2026-10-31');
  assert.equal(salesPeriod('this_week',now).start,'2026-10-26');
  assert.equal(salesPeriod('this_month',now).start,'2026-11-01');
  const data={orders:[{order_date:'2026-11-01',total_amount:200,status:'approved',customer:{state:'Lagos'}},{order_date:'2026-11-01',total_amount:999,status:'cancelled',customer:{state:'Lagos'}},{order_date:'2026-10-31',total_amount:500,customer:{state:'Lagos'}},{order_date:'2026-11-01',total_amount:300,customer:{state:'Rivers'}},{order_date:'2026-11-01',total_amount:700}],payments:[{payment_date:'2026-11-01',amount:50,customer:{state:'Lagos'}},{payment_date:'2026-11-01',amount:80,status:'reversed',customer:{state:'Lagos'}}],customers:[{state:'Lagos',balance:90},{state:'Rivers',balance:120}]};
  const result=commandCenterMetrics(data,{now,regionFilter:'SW'});
  assert.equal(result.metrics.sales.salesToday,200);
  assert.equal(result.metrics.sales.totalOrders,2);
  assert.equal(result.metrics.sales.approvedOrders,1);
  assert.equal(result.metrics.payments.collectedToday,50);
  assert.equal(result.metrics.payments.outstanding,90);
  assert.equal(commandCenterMetrics(data,{now,dateFilter:'yesterday',regionFilter:'SW'}).metrics.sales.salesToday,500);
});

test('Executive workforce and visits count recorded shifts, durations and completions without invented scores or targets',()=>{
  const now=new Date('2026-10-21T12:00:00Z');
  const data={team:[{id:1,check_in_time:'2026-10-21T08:00:00Z',check_out_time:'2026-10-21T10:00:00Z',performance_score:0,visits_total:3,visits_completed:2},{id:2,check_in_time:'2026-10-21T08:00:00Z',location_status:'At Location',visits_total:1,visits_completed:0},{id:3}]};
  const {metrics,team}=commandCenterMetrics(data,{now});
  assert.equal(metrics.workforce.checkedIn,2);assert.equal(metrics.workforce.activeAgents,1);assert.equal(metrics.workforce.notCheckedIn,1);assert.equal(metrics.workforce.avgHours,'3.0h');
  assert.equal(metrics.field.completedVisits,2);assert.equal(metrics.field.completionPercent,50);
  assert.equal(team[0].performance_score,0);assert.equal(team[1].performance_score,null);
  assert.equal(metrics.sales.targetToday,null);assert.equal(metrics.sales.achievementPercent,null);
  const empty=commandCenterMetrics({}).metrics;
  assert.equal(empty.workforce.avgHours,'Not recorded');assert.equal(empty.field.completionPercent,null);assert.equal(empty.payments.overdue,null);
  for(const value of [undefined,null,'',-1,101,'invalid'])assert.equal(recordedScore(value),null);
});
