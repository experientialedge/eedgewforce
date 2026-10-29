import {useEffect,useRef} from 'react';
import {api} from '../lib/api';
import {startShiftTelemetry} from '../lib/shiftTelemetry';
export function useShiftTelemetry(shift,location,user,activity){
  const latest=useRef(location);
  useEffect(()=>{latest.current=location;},[location]);
  const clockIn=shift?.clock_in_time||shift?.clock_in,clockOut=shift?.clock_out_time||shift?.clock_out;
  useEffect(()=>{
    if(!clockIn||clockOut||user?.workplace_session_id)return;
    return startShiftTelemetry({getLocation:()=>latest.current,send:gps=>api.post('/field/location-ping',{...gps,current_activity:activity},{requireOnline:true}),onError:error=>console.warn('Location update could not be sent:',error.message)});
  },[clockIn,clockOut,user?.id,user?.workplace_session_id,activity]);
}
