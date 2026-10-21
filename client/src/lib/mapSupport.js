export const DEFAULT_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

export function mapPoint(latitude, longitude) {
  if ([latitude, longitude].some(v => v == null || typeof v==='boolean' || String(v).trim() === '')) return null;
  const point = [Number(latitude), Number(longitude)];
  return point.every(Number.isFinite) && Math.abs(point[0]) <= 90 && Math.abs(point[1]) <= 180 ? point : null;
}
export const escapeMapText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function mapRadius(record, fallback = 150) {
  fallback=Number(fallback);if(!Number.isFinite(fallback)||fallback<=0||fallback>10000)fallback=150;
  if (String(record?.location_type).toLowerCase() === 'market') return 300;
  const radius = Number(record?.geofence_radius ?? record?.geofence_radius_meters ?? record?.permitted_radius ?? fallback);
  return Number.isFinite(radius) && radius > 0 && radius <= 10000 ? radius : fallback;
}
export function tileConfiguration(env = import.meta.env || {}) {
  const url = env.VITE_MAP_TILE_URL || DEFAULT_TILE_URL;
  if (!url.startsWith('https://') || !['{z}','{x}','{y}'].every(p => url.includes(p))) throw Error('Map tiles require an HTTPS URL with {z}, {x} and {y}.');
  if(url!==DEFAULT_TILE_URL&&!env.VITE_MAP_TILE_ATTRIBUTION)throw Error('A custom map provider requires its attribution text.');
  const attribution = env.VITE_MAP_TILE_ATTRIBUTION || OSM_ATTRIBUTION;
  // The provider label is plain text. Only our built-in OSM link uses HTML.
  return {url, attribution:env.VITE_MAP_TILE_ATTRIBUTION?escapeMapText(attribution):attribution};
}

// Reusable lifecycle for every map: visible attribution, tile failures and container resizing.
export function attachMapSupport(L, map, onState = () => {}, env, runtime = globalThis) {
  const config = tileConfiguration(env);
  let alive = true, failed = false, frame = null, tileTimer = null;
  const publish = state => { if (alive) onState(state); };
  const tiles = L.tileLayer(config.url, {maxZoom:19, attribution:config.attribution});
  const clearTimer=()=>{if(tileTimer!=null)runtime.clearTimeout?.(tileTimer);tileTimer=null;};
  tiles.on('loading', () => { failed=false;publish('loading');clearTimer();tileTimer=runtime.setTimeout?.(()=>{tileTimer=null;publish('error');},20000); });
  tiles.on('tileerror', () => { failed=true;clearTimer();publish('error'); });
  tiles.on('load', () => {clearTimer();publish(failed?'error':'ready');});
  tiles.addTo(map);
  const resize = () => {
    if(frame !== null)runtime.cancelAnimationFrame?.(frame);
    if(runtime.requestAnimationFrame)frame=runtime.requestAnimationFrame(()=>{frame=null;if(alive)map.invalidateSize({pan:false,animate:false});});
    else if(alive)map.invalidateSize({pan:false,animate:false});
  };
  const observer=runtime.ResizeObserver?new runtime.ResizeObserver(resize):null;
  observer?.observe(map.getContainer());
  const retry=()=>{if(!alive)return;failed=false;publish('loading');resize();tiles.redraw();};
  runtime.addEventListener?.('online',retry);
  const dispose=()=>{alive=false;clearTimer();observer?.disconnect();if(frame!==null)runtime.cancelAnimationFrame?.(frame);runtime.removeEventListener?.('online',retry);tiles.off();};
  map.once('unload',dispose);
  resize();
  return {retry,dispose};
}
