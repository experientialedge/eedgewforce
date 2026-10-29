import test from 'node:test';
import assert from 'node:assert/strict';
import {proxyHops,clientCacheHeaders} from '../utils/hostingConfiguration.js';

test('Proxy trust is explicit and cannot enable unrestricted forwarding',()=>{
  assert.equal(proxyHops({}),0);assert.equal(proxyHops({VERCEL:'1'}),1);assert.equal(proxyHops({TRUST_PROXY_HOPS:'2'}),2);
  for(const value of ['true','-1','6','1.5','loopback'])assert.throws(()=>proxyHops({TRUST_PROXY_HOPS:value}));
});
test('Browser entry points revalidate while hashed assets remain cacheable',()=>{
  const headers=new Map(),res={setHeader:(key,value)=>headers.set(key,value)};
  for(const file of ['/site/index.html','C:\\site\\sw.js','/site/manifest.json']){clientCacheHeaders(res,file);assert.equal(headers.get('Cache-Control'),'no-cache');}
  clientCacheHeaders(res,'/site/assets/dashboard-hash.js');assert.match(headers.get('Cache-Control'),/immutable/);
});
test('Standalone web server serves the site and never disguises missing API or asset paths as HTML',async()=>{
  const previous=process.env.NODE_ENV;process.env.NODE_ENV='test';
  const {default:app}=await import('../index.js');const server=app.listen(0);await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const health=await fetch(base+'/api/health');assert.equal(health.status,200);assert.equal((await health.json()).status,'healthy');
    for(const url of ['/api/does-not-exist','/api','/assets/missing-bundle.js']){const result=await fetch(base+url);assert.equal(result.status,404);assert.match(result.headers.get('content-type'),/json/);}
    // CI runs tests before building; the packaged-runtime smoke check also verifies these against the real build.
    const fs=await import('node:fs');if(fs.existsSync(new URL('../../../client/dist/index.html',import.meta.url))){
      for(const url of ['/','/projects/123','/index.html','/sw.js']){const result=await fetch(base+url);assert.equal(result.status,200);assert.equal(result.headers.get('cache-control'),'no-cache');}
    }
  }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));if(previous===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=previous;}
});
