import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useMapTiles} from '../../hooks/useMapTiles';
import {mapPoint,mapRadius,escapeMapText as esc} from '../../lib/mapSupport';
import MapTileStatus from './MapTileStatus';

// Custom SVG map icons
const createCustomIcon = (color = '#F57C00', label = '') => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 11px;
        border: 2px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      ">
        ${label}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const agentRadarIcon = L.divIcon({
  className: 'custom-radar-marker',
  html: `
    <div style="position: relative; width: 24px; height: 24px;">
      <div style="
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #F57C00;
        opacity: 0.75;
        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      <div style="
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: #E65100;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(245, 124, 0, 0.8);
      "></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

export default function FieldMap({ route = [], agentLocation = null, height = '400px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const dataLayerRef=useRef(null),lastFitRef=useRef(null),boundsRef=useRef([]);
  const {tileState,connectMap,retryMap}=useMapTiles();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Cleanup previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center: Lagos Commercial Axis
    const defaultCenter = [6.4281, 3.4219];
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: true
    }).setView(defaultCenter, 13);

    connectMap(map);
    dataLayerRef.current=L.layerGroup().addTo(map);
    mapInstanceRef.current=map;
    return ()=>{map.remove();mapInstanceRef.current=null;dataLayerRef.current=null;lastFitRef.current=null;};
  }, [connectMap]);

  useEffect(()=>{
    const map=mapInstanceRef.current,layer=dataLayerRef.current;
    if(!map||!layer)return;
    layer.clearLayers();

    const latLngPoints = [];

    // 1. Plot Agent Live Location
    const agentLatLng=mapPoint(agentLocation?.latitude,agentLocation?.longitude);
    if (agentLatLng) {
      L.marker(agentLatLng, { icon: agentRadarIcon,title:'Your latest recorded location' })
        .addTo(layer)
        .bindPopup(`<b>Your latest recorded GPS location</b><br>Accuracy: ${Number.isFinite(Number(agentLocation.accuracy))?`±${Math.round(Number(agentLocation.accuracy))}m`:'not recorded'}`);
      latLngPoints.push(agentLatLng);
    }

    // 2. Plot Route Customer Stops & 150m Geofence Circles
    route.forEach((stop, index) => {
      const cust = stop.customer;
      const point=mapPoint(cust?.latitude,cust?.longitude);
      if (point) {
        const [lat,lng]=point;
        latLngPoints.push(point);

        const isCompleted = String(stop.status).toLowerCase() === 'completed';
        const markerColor = isCompleted ? '#10B981' : (stop.priority === 'URGENT' ? '#EF4444' : '#F57C00');

        const marker = L.marker(point, {
          icon: createCustomIcon(markerColor, String(index + 1)),title:`Stop ${index+1}: ${cust.name||'Customer'}`
        }).addTo(layer);

        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
            <b style="font-size: 13px; color: #111;">${esc(cust.name)}</b><br>
            <span style="color: #666;">${esc(cust.address || 'Address not recorded')}</span><br>
            <div style="margin-top: 4px;">
              <b>Status:</b> ${esc(stop.status)} | <b>Priority:</b> ${esc(stop.priority || 'Normal')}
            </div>
            <div style="margin-top: 6px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="color: #F57C00; font-weight: bold; text-decoration: none;">
                🧭 Open Directions
              </a>
            </div>
          </div>
        `);

        // Draw 150-Meter Geofence Circle
        L.circle(point, {
          radius: mapRadius(cust),
          color: markerColor,
          weight: 1.5,
          fillColor: markerColor,
          fillOpacity: 0.08
        }).addTo(layer);
      }
    });

    // 3. Draw Route Polyline
    if (latLngPoints.length > 1) {
      L.polyline(latLngPoints, {
        color: '#F57C00',
        weight: 3,
        opacity: 0.7,
        dashArray: '6, 6'
      }).addTo(layer);
    }

    // 4. Fit bounds
    const routeKey=JSON.stringify(route.map(stop=>[stop.id,stop.customer?.latitude,stop.customer?.longitude]));
    boundsRef.current=latLngPoints;
    if (latLngPoints.length > 0 && lastFitRef.current!==routeKey) {
      map.fitBounds(latLngPoints, { padding: [40, 40],maxZoom:16 });
      lastFitRef.current=routeKey;
    }
  }, [route, agentLocation]);

  return (
    <div className="relative z-0 isolate surface-card rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-end border-b border-zinc-200 dark:border-zinc-700 px-3 py-2"><button type="button" onClick={()=>{if(boundsRef.current.length)mapInstanceRef.current?.fitBounds(boundsRef.current,{padding:[40,40],maxZoom:16});}} className="text-xs font-semibold text-orange-700 dark:text-orange-300">Recenter route</button></div>
      <MapTileStatus state={tileState} onRetry={retryMap}/>
      <div ref={mapContainerRef} style={{ height, width: '100%' }} />
    </div>
  );
}
