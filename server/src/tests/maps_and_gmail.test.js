import test from 'node:test';import assert from 'node:assert/strict';import {EventEmitter} from 'node:events';
import {mapPoint,mapRadius,escapeMapText,tileConfiguration,attachMapSupport,DEFAULT_TILE_URL} from '../../../client/src/lib/mapSupport.js';
import {smtpConfiguration} from '../utils/smtpConfiguration.js';
import nodemailer from 'nodemailer';import {emailService} from '../services/emailService.js';

test('Maps validate coordinates, radius and tile configuration',()=>{
  assert.deepEqual(mapPoint('0','3.35'),[0,3.35]);assert.deepEqual(mapPoint(-90,180),[-90,180]);
  for(const point of [[null,3],['',3],[undefined,3],[NaN,3],[91,3],[0,181],[true,3],['bad',3]])assert.equal(mapPoint(...point),null);
  assert.equal(mapRadius({location_type:'Market',geofence_radius:150}),300);assert.equal(mapRadius({geofence_radius:250}),250);assert.equal(mapRadius({geofence_radius:Infinity}),150);
  assert.equal(tileConfiguration({}).url,DEFAULT_TILE_URL);assert.match(tileConfiguration({}).attribution,/openstreetmap.org\/copyright/);
  assert.throws(()=>tileConfiguration({VITE_MAP_TILE_URL:'http://tiles.example/{z}/{x}/{y}.png'}),/HTTPS/);
  assert.throws(()=>tileConfiguration({VITE_MAP_TILE_URL:'https://tiles.example/no-coordinates'}),/HTTPS/);
  assert.equal(escapeMapText('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
});
test('Map lifecycle reports tile failures, retries, resizes and disposes listeners',()=>{
  const events=new EventEmitter(),mapEvents=new EventEmitter(),states=[];let observer,disconnected=false,resizes=0,redraws=0,online=null,deadline=null;
  const tiles={on:(name,fn)=>{events.on(name,fn);return tiles;},addTo:()=>{events.emit('loading');return tiles;},redraw:()=>{redraws++;events.emit('loading');},off:()=>events.removeAllListeners()};
  const L={tileLayer:(url,options)=>{assert.equal(url,DEFAULT_TILE_URL);assert.match(options.attribution,/OpenStreetMap/);return tiles;}};
  const map={getContainer:()=>({}),invalidateSize:()=>resizes++,once:(event,fn)=>mapEvents.once(event,fn)};
  const runtime={setTimeout:fn=>{deadline=fn;return 1;},clearTimeout:()=>deadline=null,ResizeObserver:class {constructor(fn){observer=fn;}observe(){}disconnect(){disconnected=true;}},addEventListener:(event,fn)=>online=fn,removeEventListener:()=>online=null};
  const support=attachMapSupport(L,map,s=>states.push(s),{},runtime);assert.equal(states.at(-1),'loading');deadline();assert.equal(states.at(-1),'error');events.emit('load');assert.equal(states.at(-1),'ready');events.emit('tileerror');events.emit('load');assert.equal(states.at(-1),'error');support.retry();assert.equal(redraws,1);events.emit('load');assert.equal(states.at(-1),'ready');observer();assert.ok(resizes>=2);online();assert.equal(redraws,2);mapEvents.emit('unload');assert.equal(disconnected,true);assert.equal(online,null);assert.equal(deadline,null);assert.equal(events.listenerCount('load'),0);support.retry();assert.equal(redraws,2);
});
test('Gmail supports 465 and 587 with app-password normalization; other SMTP passwords retain spaces',()=>{
  const env={SMTP_HOST:' SMTP.GMAIL.COM ',SMTP_USER:'sender@gmail.com',SMTP_PASS:'abcd efgh ijkl mnop',EMAIL_FROM:'sender@gmail.com'};
  const cfg=smtpConfiguration(env);assert.equal(cfg.configured,true);assert.equal(cfg.pass,'abcdefghijklmnop');assert.equal(cfg.secure,true);
  assert.equal(smtpConfiguration({...env,SMTP_PORT:'587'}).secure,false);
  assert.equal(smtpConfiguration({...env,SMTP_PASS:'regular-password'}).configured,false);
  assert.equal(smtpConfiguration({...env,SMTP_PORT:'25'}).configured,false);
  assert.equal(smtpConfiguration({...env,SMTP_HOST:'smtp.example.com',SMTP_PASS:' spaces matter '}).pass,' spaces matter ');
});
test('Sender verification uses TLS and never transmits an email or exposes app passwords',async t=>{
  const original={...process.env};Object.assign(process.env,{SMTP_HOST:'smtp.gmail.com',SMTP_PORT:'465',SMTP_USER:'sender@gmail.com',EMAIL_FROM:'sender@gmail.com',SMTP_PASS:'abcd efgh ijkl mnop'});
  let verified=0;const mock=t.mock.method(nodemailer,'createTransport',options=>{assert.equal(options.auth.pass,'abcdefghijklmnop');assert.equal(options.tls.rejectUnauthorized,true);assert.equal(options.secure,true);return {verify:async()=>{verified++;},sendMail:()=>{throw Error('Verification must not send an email');}};});
  try{assert.equal((await emailService.verifyReportSender()).verified,true);assert.equal(verified,1);const publicConfig=emailService.reportConfiguration();assert.equal(publicConfig.provider,'gmail');assert.ok(!JSON.stringify(publicConfig).includes('abcdefghijklmnop'));assert.ok(!Object.hasOwn(publicConfig,'pass'));}finally{mock.mock.restore();process.env=original;}
});
