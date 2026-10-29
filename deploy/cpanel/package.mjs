import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import archiver from 'archiver';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
if(!fs.existsSync(path.join(root,'client/dist/index.html')))throw new Error('Build the website first: npm run build');
if(!process.env.npm_execpath)throw new Error('Run this through npm run package:cpanel.');
const generated=path.join(root,'.system_generated');fs.mkdirSync(generated,{recursive:true});
const stage=fs.mkdtempSync(path.join(generated,'cpanel-package-'));
const lock=JSON.parse(fs.readFileSync(path.join(root,'package-lock.json'),'utf8'));
const backend=JSON.parse(fs.readFileSync(path.join(root,'server/package.json'),'utf8'));
const dependencies=Object.fromEntries(Object.keys(backend.dependencies).map(name=>{
  const entry=lock.packages[`server/node_modules/${name}`]||lock.packages[`node_modules/${name}`];
  if(!entry?.version)throw new Error('Missing locked server dependency: '+name);
  return [name,entry.version];
}));
fs.writeFileSync(path.join(stage,'package.json'),JSON.stringify({name:'edgewforce-cpanel',version:'1.0.0',private:true,type:'module',main:'app.cjs',engines:{node:'^22.16.0 || ^24.0.0'},scripts:{start:'node app.cjs',preflight:'node deploy/cpanel/preflight.mjs','job:reports':'node deploy/cpanel/run-job.mjs hr-reports','job:reminders':'node deploy/cpanel/run-job.mjs reminders'},dependencies,overrides:{uuid:'^11.1.1'}},null,2)+'\n');
execFileSync(process.execPath,[process.env.npm_execpath,'install','--package-lock-only','--omit=dev','--ignore-scripts','--no-audit','--no-fund'],{cwd:stage,stdio:'pipe',timeout:180000});
const entries=[];
function add(file,name=file){entries.push({file:path.join(root,file),name});}
function tree(relative){for(const item of fs.readdirSync(path.join(root,relative),{withFileTypes:true})){
  if(item.isSymbolicLink())throw new Error('Symlink excluded from deployment: '+relative+'/'+item.name);
  if(item.name==='tests'||item.name.startsWith('.env')||(relative==='server/src'&&item.name==='data'))continue;
  const file=relative+'/'+item.name;if(item.isDirectory())tree(file);else add(file);
}}
tree('server/src');tree('client/dist');tree('templates');
for(const file of ['app.cjs','server.js','CPANEL_SETUP.md','NEXUS_SETUP.md','deploy/cpanel/preflight.mjs','deploy/cpanel/run-job.mjs','deploy/cpanel/.env.example'])add(file);
add('deploy/cpanel/.env.example','.env.example');
for(const name of ['package.json','package-lock.json'])entries.push({file:path.join(stage,name),name});
// A package contains only runtime code, browser assets and blank configuration templates.
for(const entry of entries){
  if(/(^|\/)(node_modules|uploads|data|tests|\.git|\.vercel|\.system_generated)(\/|$)/.test(entry.name)||/(^|\/)\.env$/.test(entry.name))throw new Error('Private/runtime path in package.');
  if(/\.(?:js|mjs|cjs|json|html|md|example)$/.test(entry.name)){
    const text=fs.readFileSync(entry.file,'utf8');
    if(/sb_secret_[A-Za-z0-9_-]+|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text))throw new Error('Private key detected in '+entry.name);
  }
}
const outputDir=path.join(root,'release');fs.mkdirSync(outputDir,{recursive:true});
const target=path.join(outputDir,'edgewforce-cpanel.zip'),zip=archiver('zip',{zlib:{level:9}}),out=fs.createWriteStream(target);
const complete=new Promise((resolve,reject)=>{out.on('close',resolve);out.on('error',reject);zip.on('error',reject);});
zip.pipe(out);for(const entry of entries)zip.file(entry.file,{name:entry.name});await zip.finalize();await complete;
console.log(JSON.stringify({file:target,entries:entries.length,bytes:fs.statSync(target).size,sha256:createHash('sha256').update(fs.readFileSync(target)).digest('hex')},null,2));
