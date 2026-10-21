import React from 'react';
export default function MapTileStatus({state,onRetry}){
  if(state==='ready')return null;
  return <div role="status" className="relative z-[1001] flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-200">
    <span>{state==='error'?'Some map tiles could not load. Check your connection or retry. Markers and geofence calculations remain available.':'Loading map tiles…'}</span>
    {state==='error'&&<button type="button" onClick={onRetry} className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-3 py-1 font-semibold">Retry map</button>}
  </div>;
}
