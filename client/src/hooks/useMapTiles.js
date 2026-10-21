import {useCallback,useRef,useState} from 'react';
import L from 'leaflet';
import {attachMapSupport} from '../lib/mapSupport';
export function useMapTiles(){
  const [tileState,setTileState]=useState('loading'),support=useRef(null);
  const connectMap=useCallback(map=>{support.current=null;setTileState('loading');try{support.current=attachMapSupport(L,map,setTileState);}catch{setTileState('error');}},[]);
  const retryMap=useCallback(()=>support.current?.retry(),[]);
  return {tileState,connectMap,retryMap};
}
