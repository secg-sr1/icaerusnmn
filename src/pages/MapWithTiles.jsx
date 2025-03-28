import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getTileUrl } from '../services/tiles'; // ✅ use your helper


mapboxgl.accessToken = 'pk.eyJ1IjoiczNjZyIsImEiOiJja3l1NXZzdmExYXVwMnFzMjliNW9yZHZtIn0.XyoSereFiHW-nQZpkUKv2Q'; // Add your Mapbox token if needed

const tooltipPoints = [
  { label: '1B', coords: [1.71231183, 41.288945] },
  { label: '2C', coords: [1.7138889, 41.2891667] },
  { label: '6A', coords: [1.7119502, 41.2887759] },
  { label: '9B', coords: [1.713056, 41.288889] },
  { label: '10B', coords: [1.7123702, 41.2887116] },
  { label: '14B', coords: [1.713611, 41.288889] },
  { label: '18A', coords: [1.7123735, 41.2884745] },
  { label: '18B', coords: [1.713056, 41.288611] },
  { label: '18C', coords: [1.7140583, 41.2887763] },
  { label: '23B', coords: [1.7127051, 41.2884061] },
  { label: '26B', coords: [1.7137474, 41.2886292] },
  { label: '30B', coords: [1.7134119, 41.2884559] },
  { label: '30C', coords: [1.7140275, 41.2885677] },
  { label: '32B', coords: [1.7129155, 41.2882584] },
  { label: '39A', coords: [1.7127811, 41.2881237] },
  { label: '39C', coords: [1.7132614, 41.2881917] },
  { label: 'IC1', coords: [1.7125145, 41.2886818] },
  { label: 'IC2', coords: [1.7135633, 41.2886851] },
  { label: 'IC3', coords: [1.7131824, 41.2883341] }
];


const MapWithTiles = ({ tileId, darkMode }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: darkMode
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: [1.7130175, 41.2885476],
      zoom: 17.8,
      bearing: -10
    });

    map.on('load', () => {
      // ✅ use helper to generate the tile URL
      map.addSource('orthomosaic', {
        type: 'raster',
        tiles: [
          getTileUrl(tileId)
        ],
        tileSize: 256,
        minzoom: 15,
        maxzoom: 22
      });

      map.addLayer({
        id: 'orthomosaic-layer',
        type: 'raster',
        source: 'orthomosaic',
        paint: {
          'raster-opacity': 0.7
        }
      });

      tooltipPoints.forEach(point => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerText = point.label;

        if (['IC1', 'IC2', 'IC3'].includes(point.label)) {
          el.style.backgroundColor = 'rgba(30, 144, 255, 0.75)';
        }

        new mapboxgl.Marker(el)
          .setLngLat(point.coords)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [tileId, darkMode]);

  return (
    <>
      <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />
      <style>{`
        .custom-marker {
          background-color: rgba(255, 0, 0, 0.49);
          color: white;
          padding: 4px 6px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 0 3px rgba(0,0,0,0.4);
        }
      `}</style>
    </>
  );
};


export default MapWithTiles;
