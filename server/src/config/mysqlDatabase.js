import {AsyncLocalStorage} from 'node:async_hooks';
import {createHash} from 'node:crypto';
import mysql from 'mysql2/promise';
import {tableDefinition,columnDefinition,sqlIdentifier,encodeMysqlValue,decodeMysqlRow,mysqlRecord,mysqlSchema} from './mysqlSchema.js';

export function mysqlConfiguration(env=process.env){
  if(!env.MYSQL_DATABASE||!env.MYSQL_USER||!env.MYSQL_PASSWORD)throw new Error('MySQL requires MYSQL_DATABASE, MYSQL_USER and MYSQL_PASSWORD.');
  const host=env.MYSQL_HOST||'127.0.0.1',port=Number(env.MYSQL_PORT||3306);
  if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Invalid MySQL port.');
  const local=['localhost','127.0.0.1','::1'].includes(host);
  if(!local&&env.MYSQL_SSL!=='true')throw new Error('A remote MySQL connection requires verified TLS (MYSQL_SSL=true).');
  return {host,port,database:env.MYSQL_DATABASE,user:env.MYSQL_USER,password:env.MYSQL_PASSWORD,waitForConnections:true,connectionLimit:5,queueLimit:100,connectTimeout:15000,charset:'utf8mb4',timezone:'Z',dateStrings:true,decimalNumbers:true,multipleStatements:false,...(env.MYSQL_SSL==='true'?{ssl:{rejectUnauthorized:true}}:{})};
}

export function createMysqlDatabase(config,{pool=mysql.createPool(config)}={}){
  const context=new AsyncLocalStorage();
  const lock='edgewforce:'+createHash('sha256').update(config.database).digest('hex').slice(0,40);
  const query=async(sql,values=[])=>{
    const [rows]=await (context.getStore()||pool).execute(sql,values);return rows;
  };
  const column=(table,name)=>{columnDefinition(table,name);return sqlIdentifier(name);};
  const db={
    backend:'mysql',isCloud:false,
    async ready(){
      const rows=await query('SELECT table_name FROM information_schema.tables WHERE table_schema = ?',[config.database]);
      const present=new Set(rows.map(r=>r.TABLE_NAME||r.table_name));
      if(Object.keys(mysqlSchema).some(name=>!present.has(name))||!present.has('edgewforce_files'))throw new Error('The MySQL schema and copy verification must be installed before activation.');
      const manifest=await query('SELECT state FROM edgewforce_copy_manifest WHERE id = 1');
      if(manifest[0]?.state!=='verified')throw new Error('MySQL data copy has not been verified.');
      return true;
    },
    async find(table,filter={},options={}){
      const definition=tableDefinition(table),values=[],where=[];
      for(const [operator,conditions] of [['=',filter],['>',options.gt||{}],['>=',options.gte||{}],['<',options.lt||{}]])for(const [name,value] of Object.entries(conditions)){
        if(value==null)continue;
        where.push(column(table,name)+' '+operator+' ?');values.push(encodeMysqlValue(definition.columns[name],value));
      }
      const selection=options.select&&options.select!=='*'?options.select.split(',').map(name=>column(table,name.trim())).join(','):'*';
      let sql='SELECT '+selection+' FROM '+sqlIdentifier(definition.table)+(where.length?' WHERE '+where.join(' AND '):'');
      if(options.order)sql+=' ORDER BY '+column(table,options.order.column)+(options.order.ascending===false?' DESC':' ASC');
      if(options.limit!==undefined||options.offset!==undefined){
        const limit=options.limit??2147483647,offset=options.offset??0;
        if(!Number.isSafeInteger(limit)||limit<1||!Number.isSafeInteger(offset)||offset<0)throw new Error('Invalid database page.');
        sql+=' LIMIT '+limit+' OFFSET '+offset;
      }
      return (await query(sql,values)).map(row=>decodeMysqlRow(table,row));
    },
    async findOne(table,filter={}){return (await this.find(table,filter,{limit:1}))[0]||null;},
    async findById(table,id){return this.findOne(table,{[tableDefinition(table).primaryKey]:id});},
    async insert(table,record){
      return this.transaction(async()=>{
        const definition=tableDefinition(table),data=mysqlRecord(table,record,{defaults:true}),names=Object.keys(data);
        if(!names.length)throw new Error('An application record is required.');
        const result=await query('INSERT INTO '+sqlIdentifier(definition.table)+' ('+names.map(sqlIdentifier).join(',')+') VALUES ('+names.map(()=>'?').join(',')+')',Object.values(data));
        return this.findById(table,data[definition.primaryKey]??result.insertId);
      });
    },
    async update(table,id,updates){
      return this.transaction(async()=>{
        const definition=tableDefinition(table),data=mysqlRecord(table,updates);
        if(Object.hasOwn(data,definition.primaryKey)&&String(data[definition.primaryKey])!==String(id))throw new Error('Record identifiers cannot change.');
        delete data[definition.primaryKey];
        if(definition.columns.updated_at)data.updated_at=encodeMysqlValue(definition.columns.updated_at,new Date().toISOString());
        const names=Object.keys(data);
        if(names.length)await query('UPDATE '+sqlIdentifier(definition.table)+' SET '+names.map(name=>sqlIdentifier(name)+' = ?').join(',')+' WHERE '+sqlIdentifier(definition.primaryKey)+' = ?',[...Object.values(data),id]);
        return this.findById(table,id);
      });
    },
    async delete(table,id){
      return this.transaction(async()=>{
        const definition=tableDefinition(table),result=await query('DELETE FROM '+sqlIdentifier(definition.table)+' WHERE '+sqlIdentifier(definition.primaryKey)+' = ?',[id]);return result.affectedRows>0;
      });
    },
    async transaction(callback){
      if(context.getStore())return callback(this);
      const connection=await pool.getConnection();let acquired=false,begun=false;
      try{
        const [result]=await connection.execute('SELECT GET_LOCK(?, 30) AS acquired',[lock]);
        if(Number(result[0]?.acquired)!==1)throw new Error('Database is busy. Please retry.');
        acquired=true;await connection.beginTransaction();begun=true;
        const value=await context.run(connection,()=>callback(this));
        await connection.commit();begun=false;return value;
      }catch(error){if(begun)await connection.rollback().catch(()=>{});throw error;}
      finally{
        try{if(acquired)await connection.execute('SELECT RELEASE_LOCK(?)',[lock]).catch(()=>connection.destroy());}
        finally{connection.release();}
      }
    },
    async storeFile(name,contentType,bytes){
      if(!/^[a-zA-Z0-9._-]+$/.test(name)||!Buffer.isBuffer(bytes)||bytes.length>10*1024*1024)throw new Error('Invalid attachment.');
      await query('INSERT INTO edgewforce_files (name,content_type,payload,sha256) VALUES (?,?,?,?)',[name,contentType,bytes,createHash('sha256').update(bytes).digest('hex')]);
      return '/uploads/'+name;
    },
    async getFile(name){return (await query('SELECT content_type,payload,sha256 FROM edgewforce_files WHERE name = ?',[name]))[0]||null;},
    async deleteFile(name){return (await query('DELETE FROM edgewforce_files WHERE name = ?',[name])).affectedRows>0;},
    async close(){await pool.end();}
  };
  return db;
}
