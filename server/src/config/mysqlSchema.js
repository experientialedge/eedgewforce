import fs from 'node:fs';
import {randomUUID} from 'node:crypto';

export const mysqlSchema=JSON.parse(fs.readFileSync(new URL('./mysqlSchema.json',import.meta.url),'utf8'));
export const MYSQL_SCHEMA_VERSION='edgewforce-mysql-2026-11-03';
export const sqlIdentifier=name=>{
  if(typeof name!=='string'||!/^[a-z][a-z0-9_]*$/.test(name))throw new Error('Invalid database identifier.');
  return '`'+name+'`';
};
export function tableDefinition(name){
  const table=name==='alerts'?'idle_alerts':name;
  if(!Object.hasOwn(mysqlSchema,table))throw new Error('Unknown application table: '+table);
  return {table,...mysqlSchema[table]};
}
export function columnDefinition(table,name){
  const definition=tableDefinition(table);
  if(!Object.hasOwn(definition.columns,name))throw new Error('Unknown application column: '+name);
  return definition.columns[name];
}
export const isJson=column=>column.format==='jsonb'||column.type==='array'||column.format?.endsWith('[]');
export function encodeMysqlValue(column,value){
  if(value==null)return null;
  if(isJson(column))return JSON.stringify(value);
  if(column.type==='boolean'){
    if(typeof value!=='boolean')throw new Error('A boolean value is required.');
    return value?1:0;
  }
  if(column.type==='integer'){
    if(!Number.isSafeInteger(Number(value))||Number(value)<-2147483648||Number(value)>2147483647)throw new Error('Identifier exceeds the supported integer range.');
    return Number(value);
  }
  if(column.type==='number'){
    if(!Number.isFinite(Number(value)))throw new Error('A finite numeric value is required.');
    return Number(value);
  }
  if(column.format==='timestamp with time zone'){
    if(!Number.isFinite(Date.parse(value)))throw new Error('A valid timestamp is required.');
    const fraction=String(value).match(/\.(\d+)/)?.[1]||'';
    return new Date(value).toISOString().slice(0,23).replace('T',' ')+fraction.padEnd(6,'0').slice(3,6);
  }
  return String(value);
}
export function decodeMysqlRow(table,row,{aliases=true}={}){
  const definition=tableDefinition(table),result={};
  for(const [name,value] of Object.entries(row)){
    const column=definition.columns[name];
    if(value==null||!column){result[name]=value;continue;}
    if(isJson(column))result[name]=typeof value==='string'?JSON.parse(value):value;
    else if(column.type==='boolean')result[name]=Boolean(Number(value));
    else if(column.type==='number'||column.type==='integer')result[name]=Number(value);
    else if(column.format==='timestamp with time zone')result[name]=String(value).replace(' ','T')+'Z';
    else result[name]=value;
  }
  // This lease uses company_id as its natural primary key in PostgreSQL.
  if(definition.primaryKey!=='id')result.id=result[definition.primaryKey];
  if(aliases&&table==='attendance')Object.assign(result,{date:result.date||result.attendance_date,clock_in_time:result.clock_in||result.clock_in_time,clock_out_time:result.clock_out||result.clock_out_time,clock_in_lat:result.clock_in_latitude,clock_in_lng:result.clock_in_longitude});
  return result;
}
export function mysqlRecord(table,record,{defaults=false}={}){
  const definition=tableDefinition(table),data={...record};
  if(table==='attendance'){
    for(const [alias,column] of Object.entries({attendance_date:'date',clock_in_lat:'clock_in_latitude',clock_in_lng:'clock_in_longitude',clock_out_lat:'clock_out_latitude',clock_out_lng:'clock_out_longitude'})){
      if(data[alias]!==undefined&&data[column]===undefined)data[column]=data[alias];
      delete data[alias];
    }
    if(data.clock_in_time!=null&&data.clock_in==null)data.clock_in=data.clock_in_time;
    if(data.clock_out_time!=null&&data.clock_out==null)data.clock_out=data.clock_out_time;
  }
  if(definition.primaryKey!=='id'&&data.id!==undefined){data[definition.primaryKey]??=data.id;delete data.id;}
  if(defaults)for(const [name,column] of Object.entries(definition.columns)){
    if(data[name]!==undefined||column.default===undefined)continue;
    const value=column.default;
    data[name]=['now()',"timezone('utc'::text, now())"].includes(value)?new Date().toISOString():value==='gen_random_uuid()'?randomUUID():value==='CURRENT_DATE'?new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Lagos'}).format(new Date()):value;
  }
  for(const name of Object.keys(data))columnDefinition(table,name);
  return Object.fromEntries(Object.entries(data).filter(([,value])=>value!==undefined).map(([name,value])=>[name,encodeMysqlValue(definition.columns[name],value)]));
}

// Application invariants that need uniqueness even across separate Node/cron processes.
export const mysqlUniqueKeys={employee_number_counters:[['department_code','hiring_year']],employee_number_registry:[['employee_id'],['department_code','hiring_year','sequence']],users:[['email']],employees:[['user_id'],['employee_code']],leave_balances:[['company_id','employee_id','year','leave_type']],attendance:[['employee_id','date']],employee_location_assignments:[],collaboration_members:[['project_id','user_id']],collaboration_messages:[['project_id','user_id','client_nonce']],collaboration_notices:[['user_id','source_key']],workforce_activity_presence:[['user_id','client_id']],workforce_activity_notices:[['user_id','event_id']],workforce_movement_notices:[['user_id','event_id']],workforce_report_notices:[['user_id','report_id']],workforce_executive_reports:[['company_id','report_date']],hr_report_settings:[['company_id']],hr_report_runs:[['company_id','report_date']],hr_report_deliveries:[['run_id','recipient']]};
export function mysqlForeignKeys(table){
  return Object.entries(tableDefinition(table).columns).filter(([,column])=>column.type==='integer'&&column.references&&mysqlSchema[column.references.table]?.primaryKey===column.references.column);
}

export function mysqlCreateTable(table){
  const definition=tableDefinition(table),uniqueKeys=mysqlUniqueKeys[table]||[];
  const indexedText=new Set(uniqueKeys.flat().filter(name=>definition.columns[name]?.type==='string'));
  const fields=Object.entries(definition.columns).map(([name,column])=>{
    let type=name===definition.primaryKey&&column.type==='string'?'VARCHAR(191)':isJson(column)?'JSON':column.type==='integer'?'INT':column.type==='number'?'DECIMAL(38,18)':column.type==='boolean'?'TINYINT(1)':column.format==='timestamp with time zone'?'DATETIME(6)':column.format==='date'?'DATE':column.format==='uuid'?'VARCHAR(36)':indexedText.has(name)?'VARCHAR(255)':'LONGTEXT';
    return sqlIdentifier(name)+' '+type+(name===definition.primaryKey?' NOT NULL'+(name==='id'&&column.type==='integer'?' AUTO_INCREMENT':''):' NULL');
  });
  fields.push('PRIMARY KEY ('+sqlIdentifier(definition.primaryKey)+')');
  for(const [i,columns] of uniqueKeys.entries())if(columns.every(name=>definition.columns[name]))fields.push('UNIQUE KEY '+sqlIdentifier('uq_'+table.slice(0,35)+'_'+i)+' ('+columns.map(sqlIdentifier).join(',')+')');
  for(const [name,column] of Object.entries(definition.columns))if(column.type==='integer'&&name!==definition.primaryKey)fields.push('KEY '+sqlIdentifier('ix_'+name)+' ('+sqlIdentifier(name)+')');
  for(const [name,column] of mysqlForeignKeys(table))fields.push('CONSTRAINT '+sqlIdentifier('fk_'+table.slice(0,25)+'_'+name.slice(0,25))+' FOREIGN KEY ('+sqlIdentifier(name)+') REFERENCES '+sqlIdentifier(column.references.table)+' ('+sqlIdentifier(column.references.column)+')');
  return 'CREATE TABLE IF NOT EXISTS '+sqlIdentifier(table)+' (\n  '+fields.join(',\n  ')+'\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;';
}
