import path from 'node:path';
import {fileURLToPath} from 'node:url';
import dotenv from 'dotenv';
dotenv.config({path:path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../.env')});
process.env.NODE_ENV||='production';
const job=process.argv[2];
try{
  if(job==='hr-reports'){
    const {hrDailyReportService}=await import('../../server/src/services/hrDailyReportService.js');
    const results=await hrDailyReportService.daily();
    if(results.some(r=>r.error||r.results?.some(d=>['failed','uncertain'].includes(d.state))))throw new Error('Report delivery needs review.');
    console.log('Daily report cycle completed. Check delivery history in the HR dashboard.');
  }else if(job==='reminders'){
    const {reminderWorker}=await import('../../server/src/services/reminderWorker.js');
    await reminderWorker.processDueReminders({throwOnError:true});
    console.log('Task reminder cycle completed.');
  }else throw new Error('Unknown job. Use hr-reports or reminders.');
}catch{
  console.error('Scheduled job failed. Review the private job log and the dashboard delivery history.');
  process.exitCode=1;
}
