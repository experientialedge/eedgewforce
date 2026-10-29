export function responseData(value) {
  return value && !Array.isArray(value) && Object.hasOwn(value,'data') ? value.data : value;
}
export function responseList(value,key) {
  const data=responseData(value);
  if(Array.isArray(data))return data;
  if(key&&Array.isArray(data?.[key]))return data[key];
  if(data==null)return [];
  throw new Error('The server returned an unexpected list format. Refresh to retry.');
}
export function responseShift(value) {
  let shift=responseData(value);
  if(shift&&Object.hasOwn(shift,'shift'))shift=shift.shift;
  if(shift&&(typeof shift!=='object'||Array.isArray(shift)))throw new Error('The server returned an unexpected shift format.');
  return shift?{...shift,clock_in_time:shift.clock_in_time||shift.clock_in||null,clock_out_time:shift.clock_out_time||shift.clock_out||null}:null;
}
export function paymentAttempt(previous,payload,makeKey=()=>crypto.randomUUID()){
  const fingerprint=JSON.stringify(payload);
  return previous?.fingerprint===fingerprint?previous:{fingerprint,payload:{...payload,idempotency_key:makeKey()}};
}
export const FIELD_SOURCES=[
  ['route','/field/route-manifest','manifest'],['shift','/field/shifts/current'],['stores','/field/stores','stores'],
  ['windowStatus','/field/shifts/window-status'],['customers','/customers'],['deliveries','/delivery'],
  ['collections','/sales/payments'],['alerts','/field/alerts'],['tasks','/tasks?mine=true'],['sosHistory','/field/sos']
];
export const SALES_SOURCES=[
  ['report','/sales/my-report'],['customers','/sales/customers'],['products','/sales/products'],['orders','/sales/orders'],
  ['collections','/sales/payments'],['intel','/sales/competitor-intel'],['settlements','/sales/settlements'],
  ['shift','/field/shifts/current'],['windowStatus','/field/shifts/window-status']
];
export async function loadOperationsData(get,sources) {
  const results=await Promise.allSettled(sources.map(([,path])=>get(path,{signal:AbortSignal.timeout(25000)})));
  const values={},failures=[];
  results.forEach((result,i)=>{
    const [key,,listKey]=sources[i];
    if(result.status==='rejected'){failures.push(key);return;}
    try{values[key]=key==='shift'?responseShift(result.value):['report','windowStatus'].includes(key)?responseData(result.value):responseList(result.value,listKey);}
    catch{failures.push(key);}
  });
  return {values,failures};
}
