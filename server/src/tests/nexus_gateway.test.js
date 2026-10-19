import test from 'node:test';
import assert from 'node:assert/strict';
test('Private model gateway protects the model, routes and payload boundaries',async t=>{
  process.env.NEXUS_GATEWAY_TEST='true';process.env.NEXUS_MODEL_API_KEY='synthetic-gateway-test-key-123456789';process.env.NEXUS_MODEL='synthetic-model';
  const {server}=await import('../../../deploy/nexus/gateway.mjs');server.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
  const realFetch=globalThis.fetch,base=`http://127.0.0.1:${server.address().port}`,headers={Authorization:'Bearer '+process.env.NEXUS_MODEL_API_KEY,'Content-Type':'application/json'};
  const model=t.mock.method(globalThis,'fetch',async(url,options)=>{assert.equal(url,'http://ollama:11434/api/chat');assert.equal(options.headers.Authorization,undefined);return {ok:true,text:async()=>JSON.stringify({done:true,message:{content:'{}'}})};});
  try {
    assert.equal((await realFetch(base+'/health')).status,401);
    assert.equal((await realFetch(base+'/health',{headers})).status,200);
    assert.equal((await realFetch(base+'/api/pull',{method:'POST',headers,body:'{}'})).status,404);
    assert.equal((await realFetch(base+'/api/chat',{method:'POST',headers,body:JSON.stringify({model:'other-model',stream:false,messages:[]})})).status,400);
    assert.equal((await realFetch(base+'/api/chat',{method:'POST',headers,body:'x'.repeat(65000)})).status,413);
    const response=await realFetch(base+'/api/chat',{method:'POST',headers,body:JSON.stringify({model:'synthetic-model',stream:false,messages:[]})});assert.equal(response.status,200);assert.equal((await response.json()).done,true);assert.equal(model.mock.callCount(),1);
  }finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});
