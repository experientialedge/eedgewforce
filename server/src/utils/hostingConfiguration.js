export function proxyHops(env=process.env){
  if(env.TRUST_PROXY_HOPS==null||env.TRUST_PROXY_HOPS==='')return env.VERCEL?1:0;
  if(!/^[0-5]$/.test(String(env.TRUST_PROXY_HOPS)))throw new Error('TRUST_PROXY_HOPS must be a number from 0 to 5.');
  return Number(env.TRUST_PROXY_HOPS);
}

export function clientCacheHeaders(res,filePath){
  if(/(?:^|[/\\])(?:index\.html|sw\.js|manifest\.json)$/.test(filePath))res.setHeader('Cache-Control','no-cache');
  else if(/[/\\]assets[/\\]/.test(filePath))res.setHeader('Cache-Control','public, max-age=31536000, immutable');
}
