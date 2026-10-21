# Leaflet maps

Leaflet 1.9.4 is bundled with the web app. It requires no Leaflet API key. The default basemap uses `https://tile.openstreetmap.org/{z}/{x}/{y}.png` with visible OpenStreetMap attribution. No GPS or attendance authorization depends on successful tile loading.

The route map, supervisor map, workstation pin editor and location-report modal share tile loading/error states, a retry button, connection recovery and container resize handling. Zero-valued coordinates are valid; missing, non-numeric and out-of-range coordinates are omitted. Market workstation boundaries display 300 metres, consistent with server policy. Other locations use their recorded radius. Invalid radius data falls back to 150 metres.

GPS updates change route layers without recreating the map. Supervisor updates retain a user's chosen zoom/pan; **Recenter reported locations** fits the visible records. Dashed route lines join recorded stops and are not road-routing calculations. Google Maps direction links open road navigation separately. Map markers reflect received records, not proof of continuously live tracking.

## Tile provider configuration

Public OpenStreetMap tiles are a best-effort external service with no uptime SLA. For contracted production capacity, choose a provider or self-host tiles. To switch, set these Vercel build variables and redeploy:

- `VITE_MAP_TILE_URL`: HTTPS raster tile template containing `{z}`, `{x}`, `{y}`.
- `VITE_MAP_TILE_ATTRIBUTION`: required provider attribution as plain text, including OpenStreetMap attribution where the provider requires it.

These variables are browser-visible. Only put public/restricted browser tile tokens here, never server credentials or SMTP passwords. The application does not proxy tiles, prefetch offline map areas, bypass browser caching or silently switch providers.

## Verification

Check the command-centre map at desktop and phone sizes, zoom and recenter, and toggle store/agent layers. Workstation editor maps must keep the pin and boundary aligned after entering coordinates, changing radius, dragging a pin and resizing the modal. Coordinates are only saved when the user saves the workstation. Maps may show a default Lagos view when no locations exist; that default is not recorded as a staff location or a workstation coordinate.

Confirm tiles load and the copyright link is visible. If tiles fail, use **Retry map**; review network/provider settings if failure continues. Existing markers and server-side geofence checks remain separate from the basemap. No third-party basemap can guarantee GPS accuracy or prevent location spoofing.

References: [Leaflet map resizing](https://leafletjs.com/reference.html#map-invalidatesize), [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/).
