import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCurrentGPSLocation } from '../lib/geo';

export function useWorkplaceFence(user) {
  const [status,setStatus]=useState(null);
  useEffect(()=>{
    if(!user?.workplace_session_id){setStatus(null);return;}
    let stopped=false,busy=false,lastVerified=Date.now(),exited=false;
    const exit=message=>{
      if(exited)return;exited=true;
      localStorage.setItem('ewf_logout_reason',message);
      window.dispatchEvent(new CustomEvent('ewf_unauthorized'));
    };
    const check=async()=>{
      if(stopped||busy)return;busy=true;
      try {
        const gps=await getCurrentGPSLocation();
        if(stopped)return;
        const result=await api.post('/workplace-access/ping',gps,{signal:AbortSignal.timeout(12000)});
        if(stopped)return;
        setStatus({ok:result.inside,message:result.message});
        if(result.inside)lastVerified=Date.now();
        if(result.state==='revoked')exit(result.message);
      }catch(error){if(!stopped)setStatus({ok:false,message:'Location verification is unavailable. Enable precise GPS and keep the app connected. Unverified sessions expire after two minutes.'});}
      finally{busy=false;}
    };
    setStatus({ok:false,message:'Verifying your signed-in workplace…'});
    check();const timer=setInterval(()=>{
      if(Date.now()-lastVerified>120000){exit('Your location could not be verified. Return to an assigned workstation and sign in again.');return;}
      check();
    },15000);
    window.addEventListener('online',check);document.addEventListener('visibilitychange',check);
    return()=>{stopped=true;clearInterval(timer);window.removeEventListener('online',check);document.removeEventListener('visibilitychange',check);};
  },[user?.id,user?.workplace_session_id]);
  return status;
}
