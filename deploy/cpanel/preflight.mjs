import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import dotenv from 'dotenv';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
dotenv.config({path:path.join(root,'.env')});
const checks=[];
function check(name,passed){checks.push({name,passed:Boolean(passed)});}
const origin=value=>{try{const u=new URL(value);return u.protocol==='https:'&&u.pathname==='/'&&!u.username&&!u.password&&!u.search&&!u.hash;}catch{return false;}};
check('Node.js 22 or 24',[22,24].includes(Number(process.versions.node.split('.')[0])));
check('Production mode',process.env.NODE_ENV==='production');
check('Website build exists',fs.existsSync(path.join(root,'client/dist/index.html')));
check('HTTPS website origin',process.env.CLIENT_URL?.split(',').every(v=>origin(v.trim())));
check('Private JWT signing secret',process.env.JWT_SECRET?.length>=32&&!/^(your_|replace|example|changeme)/i.test(process.env.JWT_SECRET));
check('Supabase URL',origin(process.env.SUPABASE_URL));
check('Supabase server key',process.env.SUPABASE_SERVICE_ROLE_KEY?.length>20);
check('Proxy configuration',/^[0-5]$/.test(process.env.TRUST_PROXY_HOPS||'0'));
check('Cron owns background reminders',process.env.REMINDER_WORKER_ENABLED==='false');
if(process.env.HR_DAILY_REPORTS_ENABLED==='true'){
  check('Report email sender settings',process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS&&process.env.EMAIL_FROM&&[465,587].includes(Number(process.env.SMTP_PORT)));
}
for(const c of checks)console.log(`${c.passed?'PASS':'FAIL'} ${c.name}`);
console.log('Checks validate local configuration only. Verify the HTTPS site, database readiness, SMTP authentication and cron on the purchased host before launch.');
if(checks.some(c=>!c.passed))process.exitCode=1;
