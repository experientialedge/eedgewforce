import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('Offline data and actions stay with their original company and user after logout',async()=>{
 const values=new Map(),stores=new Map();
 globalThis.localStorage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
 globalThis.window={dispatchEvent:()=>{}};globalThis.CustomEvent=class{constructor(type,details){this.type=type;this.detail=details;}};
 const localforage={createInstance:({storeName})=>{const data=new Map();stores.set(storeName,data);return {setItem:async(k,v)=>data.set(k,v),getItem:async k=>data.get(k),keys:async()=>[...data.keys()],removeItem:async k=>data.delete(k)};}};
 globalThis.__offlineTestStores=localforage;
 const source=(await fs.readFile(new URL('../../../client/src/lib/offline.js',import.meta.url),'utf8')).replace("import localforage from 'localforage';",'const localforage=globalThis.__offlineTestStores;');
 const offline=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 const login=(company,id)=>{values.set('ewf_token','signed-in');values.set('ewf_user',JSON.stringify({company_id:company,id}));};
 login(1,4);await offline.cacheApiResponse('/customers',[{name:'Original company customer'}]);
 await offline.enqueueOfflineAction('/orders','POST',{order:'first'});
 stores.get('offline_action_queue').set('queue:legacy',{id:'queue:legacy',path:'/orders',payload:{order:'unowned'}});
 values.delete('ewf_token');assert.equal(await offline.getCachedApiResponse('/customers'),null);assert.deepEqual(await offline.getQueuedActions(),[]);
 login(2,4);assert.equal(await offline.getCachedApiResponse('/customers'),null);assert.deepEqual(await offline.getQueuedActions(),[]);
 await offline.cacheApiResponse('/customers',['Company two']);assert.equal((await offline.getCachedApiResponse('/customers'))[0],'Company two');
 login(1,5);assert.equal(await offline.getCachedApiResponse('/customers'),null);assert.deepEqual(await offline.getQueuedActions(),[]);
 login(1,4);assert.equal((await offline.getCachedApiResponse('/customers'))[0].name,'Original company customer');assert.equal((await offline.getQueuedActions()).length,1);
 Object.defineProperty(globalThis,'navigator',{value:{onLine:true},configurable:true});
 let calls=0;await offline.flushOfflineQueue({post:async()=>{calls++;throw Object.assign(new Error('Session revoked'),{status:401});}});
 assert.equal(calls,1);assert.equal((await offline.getQueuedActions()).length,1);assert.equal(stores.get('offline_action_queue').size,2);
 login(2,4);await offline.flushOfflineQueue({post:async()=>{calls++;}});assert.equal(calls,1);
});
