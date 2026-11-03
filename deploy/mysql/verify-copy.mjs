// Run privately on Hostinger after import, before DATA_BACKEND=mysql is enabled.
import 'dotenv/config';
import mysql from 'mysql2/promise';
import {mysqlConfiguration} from '../../server/src/config/mysqlDatabase.js';
import {mysqlSchema,decodeMysqlRow,sqlIdentifier} from '../../server/src/config/mysqlSchema.js';
import {copyDigest} from './copyVerification.mjs';
import {MYSQL_SCHEMA_VERSION} from './schema.mjs';
const connection=await mysql.createConnection(mysqlConfiguration());
let passed=false;
try{
  const [[manifest]]=await connection.execute('SELECT * FROM edgewforce_copy_manifest WHERE id=1');
  if(!manifest||manifest.schema_version!==MYSQL_SCHEMA_VERSION)throw new Error('Copy manifest/schema version is missing.');
  const expected=typeof manifest.expected==='string'?JSON.parse(manifest.expected):manifest.expected;
  for(const table of Object.keys(mysqlSchema)){
    const [rows]=await connection.execute('SELECT * FROM '+sqlIdentifier(table));
    const decoded=rows.map(row=>decodeMysqlRow(table,row,{aliases:false}));
    if(!expected.tables[table]||rows.length!==expected.tables[table].count||copyDigest(table,decoded)!==expected.tables[table].sha256)throw new Error('Copy verification failed for '+table+'. Keep Supabase active.');
    console.log('PASS '+table+': '+rows.length+' records, checksum matched');
  }
  const [[files]]=await connection.execute('SELECT COUNT(*) AS total, SUM(sha256 <> SHA2(payload,256)) AS invalid FROM edgewforce_files');
  if(Number(files.total)!==expected.files||Number(files.invalid||0)!==0)throw new Error('Attachment verification failed. Keep Supabase active.');
  await connection.execute("UPDATE edgewforce_copy_manifest SET state='verified' WHERE id=1");
  console.log('PASS copy verification: all application records and '+expected.files+' attachments matched. Supabase was not modified.');passed=true;
}finally{await connection.end();if(!passed)process.exitCode=1;}
