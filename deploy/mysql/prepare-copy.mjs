// Private offline conversion of the owner's read-only PostgreSQL JSON snapshot.
// Never put the input or generated SQL in Git, a source ZIP, or a public directory.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {mysqlSchema,sqlIdentifier,encodeMysqlValue} from '../../server/src/config/mysqlSchema.js';
import {mysqlSchemaStatements,MYSQL_SCHEMA_VERSION} from './schema.mjs';
import {copyDigest} from './copyVerification.mjs';

export async function prepareCopy(snapshot,{output,sourceUrl,serviceKey,fetcher=fetch}={}){
  if(!snapshot?.tables||Object.keys(mysqlSchema).some(table=>!Array.isArray(snapshot.tables[table])))throw new Error('A complete application snapshot is required.');
  const tables=structuredClone(snapshot.tables),files=[],replacements=new Map();
  let synchronizedPasswords=0;
  for(const user of tables.users){
    const identity=(snapshot.auth_passwords||[]).find(a=>a.id===(user.auth_user_id||user.uuid));
    if(identity?.encrypted_password){
      if(!/^\$2[aby]\$/.test(identity.encrypted_password))throw new Error('An account needs a supported password export before activation.');
      user.password_hash=identity.encrypted_password;synchronizedPasswords++;
    }
    if(!/^\$2[aby]\$/.test(user.password_hash||''))throw new Error('Every copied account needs a valid password hash.');
  }
  for(const object of snapshot.storage_objects||[]){
    if(!sourceUrl||!serviceKey)throw new Error('Private source configuration is required to copy existing attachments.');
    const encoded=[object.bucket_id,...object.name.split('/')].map(encodeURIComponent).join('/');
    const url=new URL('/storage/v1/object/authenticated/'+encoded,sourceUrl);
    if(url.protocol!=='https:'||url.origin!==new URL(sourceUrl).origin)throw new Error('Invalid source storage origin.');
    const response=await fetcher(url,{headers:{apikey:serviceKey,Authorization:'Bearer '+serviceKey},signal:AbortSignal.timeout(60000)});
    if(!response.ok)throw new Error('An attachment download failed; do not activate the copy.');
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length>10*1024*1024)throw new Error('An attachment exceeds the supported size; do not activate the copy.');
    const extension=path.extname(object.name).toLowerCase(),safeExtension=/^\.[a-z0-9]{1,8}$/.test(extension)?extension:'.bin';
    const name='migrated-'+createHash('sha256').update(object.bucket_id+'/'+object.name).digest('hex')+safeExtension;
    const type=object.metadata?.mimetype||response.headers.get('content-type')||'application/octet-stream';
    const allowed=['image/jpeg','image/png','image/webp','image/gif','application/pdf'];
    files.push({name,type:allowed.includes(type)?type:'application/octet-stream',bytes,sha256:createHash('sha256').update(bytes).digest('hex')});
    for(const route of ['public','authenticated','sign'])replacements.set(new URL('/storage/v1/object/'+route+'/'+encoded,sourceUrl).href,'/uploads/'+name);
  }
  const rewrite=value=>Array.isArray(value)?value.map(rewrite):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,rewrite(item)])):typeof value==='string'?(replacements.get(value.split('?')[0])||value):value;
  for(const table of Object.keys(tables))tables[table]=rewrite(tables[table]);
  const expected={tables:{},files:files.length};
  const sqlValue=value=>value==null?'NULL':typeof value==='number'?String(value):"CONVERT(0x"+Buffer.from(String(value),'utf8').toString('hex')+' USING utf8mb4)';
  const lines=['-- PRIVATE EdgeWForce copy. Import only into the new, empty Hostinger database.','SET NAMES utf8mb4;',...mysqlSchemaStatements,'START TRANSACTION;'];
  for(const table of Object.keys(mysqlSchema)){
    const columns=Object.entries(mysqlSchema[table].columns);
    for(const row of tables[table]){
      const values=columns.map(([name,column])=>sqlValue(encodeMysqlValue(column,row[name])));
      lines.push('INSERT INTO '+sqlIdentifier(table)+' ('+columns.map(([name])=>sqlIdentifier(name)).join(',')+') VALUES ('+values.join(',')+');');
    }
    expected.tables[table]={count:tables[table].length,sha256:copyDigest(table,tables[table])};
  }
  for(const file of files)lines.push('INSERT INTO edgewforce_files (name,content_type,payload,sha256) VALUES ('+[sqlValue(file.name),sqlValue(file.type),'0x'+file.bytes.toString('hex'),sqlValue(file.sha256)].join(',')+');');
  lines.push('INSERT INTO edgewforce_copy_manifest (id,schema_version,state,expected,captured_at) VALUES (1,'+[MYSQL_SCHEMA_VERSION,'imported',JSON.stringify(expected),snapshot.captured_at].map(sqlValue).join(',')+');','COMMIT;');
  fs.writeFileSync(output,lines.join('\n')+'\n',{mode:0o600});
  return {tables:Object.keys(mysqlSchema).length,records:Object.values(tables).reduce((sum,rows)=>sum+rows.length,0),files:files.length,accounts:tables.users.length,synchronizedPasswords,capturedAt:snapshot.captured_at,sha256:createHash('sha256').update(fs.readFileSync(output)).digest('hex')};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [input,output]=process.argv.slice(2);if(!input||!output)throw new Error('Usage: node deploy/mysql/prepare-copy.mjs private-snapshot.json private-copy.sql');
  console.log(JSON.stringify(await prepareCopy(JSON.parse(fs.readFileSync(input,'utf8')),{output,sourceUrl:process.env.SUPABASE_URL,serviceKey:process.env.SUPABASE_SERVICE_ROLE_KEY})));
}
