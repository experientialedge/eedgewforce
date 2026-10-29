// The interval reads the latest fix; changing GPS observations must not restart its deadline.
export function startShiftTelemetry({getLocation,send,onError=()=>{},intervalMs=45000,runtime=globalThis}) {
  let stopped=false,inFlight=false;
  const ping=async()=>{
    const location=getLocation();
    if(stopped||inFlight||!location)return;
    inFlight=true;
    try{await send(location);}catch(error){if(!stopped)onError(error);}finally{inFlight=false;}
  };
  const timer=runtime.setInterval(ping,intervalMs);
  ping();
  return ()=>{stopped=true;runtime.clearInterval(timer);};
}
