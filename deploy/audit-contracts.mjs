import fs from 'node:fs';import path from 'node:path';import {parse} from '@babel/parser';
const schema=JSON.parse(fs.readFileSync('reports/observed-schema.json'));const target=JSON.parse(fs.readFileSync('server/src/config/mysqlSchema.json'));const parents=new WeakMap(),functions=[],operations=[],routes=[],files=[];
function tree(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory()){if(!['tests','node_modules','dist','data'].includes(e.name))tree(p);}else if(/\.(?:js|jsx|mjs)$/.test(p))files.push(p);}}
tree('server/src');tree('client/src');tree('deploy');files.push('server.js','app.cjs');
const isFn=n=>['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression','ObjectMethod','ClassMethod'].includes(n.type);
const key=n=>n?.name??n?.value;
function walk(n,cb,p=null){if(!n||typeof n!=='object'||!n.type)return;if(p)parents.set(n,p);cb(n);for(const [k,v]of Object.entries(n)){if(['loc','start','end','extra','comments','tokens'].includes(k))continue;if(Array.isArray(v))v.forEach(c=>walk(c,cb,n));else if(v?.type)walk(v,cb,n);}}
function owner(n){while(n&&!isFn(n))n=parents.get(n);return n;}
function fnName(n){const p=parents.get(n);return key(n.id)||key(n.key)||key(p?.id)||key(p?.key)||(p?.type==='CallExpression'?'callback:'+key(p.callee?.property||p.callee):'anonymous')||'anonymous';}
for(const file of files){let ast;try{ast=parse(fs.readFileSync(file,'utf8'),{sourceType:'module',plugins:['jsx','importAttributes']});}catch(e){throw Error(file+': '+e.message);}
 const vars=[],declarations=[],assignments=[];walk(ast,n=>{if(n.type==='VariableDeclarator'&&n.id.type==='Identifier')vars.push(n);if(n.type==='FunctionDeclaration')declarations.push(n);if(n.type==='AssignmentExpression'&&n.left.type==='Identifier')assignments.push(n);});
 function resolve(n,seen=new Set()){
  if(!n)return {keys:[],dynamic:false};
  if(n.type==='Identifier'){
   if(seen.has(n.name))return {keys:[],dynamic:true};seen.add(n.name);
   const scopes=[];let scope=n;while(scope){if(isFn(scope))scopes.push(scope);scope=parents.get(scope);}const v=[...vars].reverse().find(v=>v.id.name===n.name&&(scopes.includes(owner(v))||!owner(v))&&v.start<n.start);
   if(!v)return {keys:[],dynamic:true};const result=resolve(v.init,seen);if(assignments.some(a=>a.left.name===n.name&&a.start>v.start&&a.start<n.start&&(scopes.includes(owner(a))||!owner(a))))result.dynamic=true;return result;
  }
  if(n.type==='ConditionalExpression'){const a=resolve(n.consequent,new Set(seen)),b=resolve(n.alternate,new Set(seen));return {keys:[...a.keys,...b.keys],dynamic:a.dynamic||b.dynamic};}
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'){const fn=declarations.find(f=>f.id.name===n.callee.name);if(fn){const returns=[];walk(fn.body,x=>{if(x.type==='ReturnStatement'&&owner(x)===fn)returns.push(resolve(x.argument,new Set(seen)));});return {keys:returns.flatMap(r=>r.keys),dynamic:returns.some(r=>r.dynamic)};}}
  if(n.type==='ObjectExpression'){let result={keys:[],dynamic:false};for(const p of n.properties){if(p.type==='SpreadElement'){const s=resolve(p.argument,new Set(seen));result.keys.push(...s.keys);result.dynamic||=s.dynamic;}else if(p.computed)result.dynamic=true;else result.keys.push(key(p.key));}return result;}
  return {keys:[],dynamic:true};
 }
 walk(ast,n=>{
  if(isFn(n))functions.push({file,line:n.loc.start.line,name:fnName(n),node:n,operations:[]});
  if(n.type!=='CallExpression'&&n.type!=='OptionalCallExpression')return;
  const method=key(n.callee?.property),object=n.callee?.object?.name;
  if(['router','app'].includes(object)&&['get','post','put','patch','delete'].includes(method)&&typeof n.arguments[0]?.value==='string')routes.push({file,line:n.loc.start.line,method:method.toUpperCase(),path:n.arguments[0].value,handler:n.arguments.slice(1).map(x=>x.type==='MemberExpression'?key(x.object)+'.'+key(x.property):key(x)||x.type).join(', ')});
  if(!['db','tx','trx'].includes(object)||!['find','findOne','findAll','findById','insert','update','delete','rpc'].includes(method))return;
  const table=n.arguments[0]?.value,physical=table==='alerts'?'idle_alerts':table,definition=schema.definitions?.[physical];
  const fields=['find','findOne','findAll','insert','update'].includes(method)?resolve(n.arguments[method==='update'?2:1]):{keys:[],dynamic:false};
  if(['find','findAll'].includes(method)&&n.arguments[2]?.type==='ObjectExpression'){for(const p of n.arguments[2].properties){const name=key(p.key);if(name==='order'&&p.value?.type==='ObjectExpression'){const c=p.value.properties.find(x=>key(x.key)==='column')?.value?.value;if(c)fields.keys.push(c);}if(name==='select'&&typeof p.value?.value==='string'&&p.value.value!=='*')fields.keys.push(...p.value.value.split(',').map(k=>k.trim()));if(['gt','gte','lt'].includes(name))fields.keys.push(...resolve(p.value).keys);}}
  const aliases=table==='attendance'?['attendance_date','clock_in_lat','clock_in_lng','clock_out_lat','clock_out_lng']:[];
  if (method==='rpc') {const body=schema.paths['/rpc/'+table]?.post?.parameters?.find(p=>p.in==='body'); const args=resolve(n.arguments[1]); fields.keys=args.keys;fields.dynamic=args.dynamic; fields.rpcProperties=body?.schema?.properties || {}; }
  const missing=fields.keys.filter(k=>method==='rpc'?!Object.hasOwn(fields.rpcProperties,k):definition&&!definition.properties[k]&&!aliases.includes(k));
  const requiredMissing=method==='insert'&&!fields.dynamic?(definition?.required||[]).filter(k=>k!=='id'&&!Object.hasOwn(definition.properties[k]||{},'default')&&!fields.keys.includes(k)):[];
  const exists=method==='rpc'?Boolean(schema.paths['/rpc/'+table]):Boolean(definition);
  const planned=missing.length&&missing.every(k=>target[physical]?.columns[k]);
  const status=typeof table!=='string'?'DYNAMIC':!exists?'MISSING TABLE/RPC':requiredMissing.length?'REQUIRED FIELDS MISSING':missing.length?(planned?'MIGRATION REQUIRED':'MISMATCH'):fields.dynamic?'DYNAMIC FIELDS':'SCHEMA MATCH';
  operations.push({file,line:n.loc.start.line,functionNode:owner(n),method,table:table??'(dynamic)',fields:[...new Set(fields.keys)],missing:[...new Set([...missing,...requiredMissing.map(k=>'required:'+k)])],status});
 });
}
for(const f of functions){f.operations=operations.filter(o=>o.functionNode===f.node);f.status=f.operations.some(o=>/MISMATCH|MISSING|MIGRATION/.test(o.status))?'SCHEMA CHANGE REQUIRED':f.operations.some(o=>o.status.startsWith('DYNAMIC'))?'DYNAMIC REVIEW':f.operations.length?'SCHEMA MATCH (STATIC)':'NO DIRECT DATABASE ACCESS';delete f.node;}
const summary={files:files.length,functions:functions.length,routes:routes.length,databaseOperations:operations.length,pendingMigrations:operations.filter(o=>o.status==='MIGRATION REQUIRED').length,mismatches:operations.filter(o=>/MISMATCH|MISSING/.test(o.status)).length,dynamic:operations.filter(o=>o.status.startsWith('DYNAMIC')).length};
const publicOps=operations.map(({functionNode,...o})=>o);
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/application-schema-audit.json',JSON.stringify({summary,functions,operations:publicOps,routes},(k,v)=>k==='functionNode'?undefined:v,2));
const lines=['# EdgeWForce complete application function and schema inventory','',JSON.stringify(summary),'','Observed schema captured at '+schema.observedAt+'. Static matches verify referenced tables and literal fields against the observed Supabase schema. MIGRATION REQUIRED means the committed target schema is repaired but the live database still needs migration 017. They do not prove end-to-end behavior. Dynamic payloads require runtime verification. Functions without direct database calls may call other functions. Tests and generated code are excluded.','', '## Every application function','', '| File:line | Function | Schema status | Direct operations |','|---|---|---|---|'];
for(const f of functions)lines.push(`| ${f.file}:${f.line} | ${f.name} | ${f.status} | ${f.operations.map(o=>o.method+':'+o.table).join(', ')} |`);
lines.push('','## Every API route declaration','','| Method | Declared path | File:line | Handler |','|---|---|---|---|');for(const r of routes)lines.push(`| ${r.method} | ${r.path} | ${r.file}:${r.line} | ${r.handler} |`);
lines.push('','## Every direct database operation','','| File:line | Operation | Table/RPC | Fields | Missing | Status |','|---|---|---|---|---|---|');for(const o of publicOps)lines.push(`| ${o.file}:${o.line} | ${o.method} | ${o.table} | ${o.fields.join(', ')} | ${o.missing.join(', ')} | ${o.status} |`);
fs.writeFileSync('reports/application-functions.csv', [['File','Line','Function','Schema status','Direct operations'],...functions.map(f=>[f.file,f.line,f.name,f.status,f.operations.map(o=>o.method+':'+o.table).join('; ')])].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
fs.writeFileSync('reports/application-schema-audit.md',lines.join('\n')+'\n');console.log(JSON.stringify(summary));console.log(JSON.stringify(publicOps.filter(o=>/MISMATCH|MISSING/.test(o.status)),null,2));

if(process.argv.includes('--check')&&summary.mismatches)process.exitCode=1;
