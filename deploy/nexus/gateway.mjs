import http from 'node:http';
import {timingSafeEqual} from 'node:crypto';
const key=process.env.NEXUS_MODEL_API_KEY,upstream=process.env.OLLAMA_UPSTREAM||'http://ollama:11434';
if(!key||key.length<32)throw new Error('Set a private gateway key of at least 32 characters.');
const expected=Buffer.from('Bearer '+key);
let inFlight=0;
export const server=http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  const supplied=Buffer.from(req.headers.authorization||'');
  if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected)){res.writeHead(401);res.end('Unauthorized');return;}
  if(req.method==='GET'&&req.url==='/health'){res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({gateway:true,model_health:'not_checked'}));return;}
  if(req.method!=='POST'||req.url!=='/api/chat'){res.writeHead(404);res.end('Not found');return;}
  if(inFlight>=2){res.writeHead(503);res.end('Model busy');return;}
  inFlight++;
  let size=0;const chunks=[];
  try {
    for await(const chunk of req){size+=chunk.length;if(size>64000){res.writeHead(413);res.end('Request too large');return;}chunks.push(chunk);}
    const body=JSON.parse(Buffer.concat(chunks).toString());
    if(body.stream!==false||body.model!==process.env.NEXUS_MODEL||!Array.isArray(body.messages)){res.writeHead(400);res.end('Invalid model request');return;}
    const response=await fetch(upstream+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),redirect:'error',signal:AbortSignal.timeout(24000)});
    if(!response.ok)throw new Error('Model unavailable');
    const result=await response.text();if(result.length>64000)throw new Error('Model response too large');
    res.writeHead(200,{'Content-Type':'application/json'});res.end(result);
  }catch{res.writeHead(502);res.end('Private model unavailable');}
  finally{inFlight--;}
});
server.requestTimeout=30000;server.headersTimeout=10000;
if(process.env.NEXUS_GATEWAY_TEST!=='true')server.listen(8080,'0.0.0.0',()=>console.log('NEXUS private gateway listening; request content is not logged.'));
