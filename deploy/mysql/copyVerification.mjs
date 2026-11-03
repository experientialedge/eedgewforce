import {createHash} from 'node:crypto';
import {tableDefinition,encodeMysqlValue,isJson} from '../../server/src/config/mysqlSchema.js';
export const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
export function copyDigest(table,rows){
  const definition=tableDefinition(table),ordered=[...rows].sort((a,b)=>Number(a[definition.primaryKey])-Number(b[definition.primaryKey]));
  const values=ordered.map(row=>Object.fromEntries(Object.entries(definition.columns).map(([name,column])=>[name,encodeMysqlValue(column,isJson(column)?stable(row[name]):row[name])])));
  return createHash('sha256').update(JSON.stringify(stable(values))).digest('hex');
}
