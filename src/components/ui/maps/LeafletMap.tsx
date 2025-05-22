import L, { type Map as LeafletMapType } from 'leaflet';
import React, { memo, useEffect, useRef } from 'react';

import type { LeafletMapProps, MapMarker } from '@src/types/LeafletMapProps';

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [50.3675, 3.0803],
  zoom = 9,
  markers = [
    {
      position: [50.381645, 3.053234],
    },
  ],
  scrollWheelZoom = false,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapType | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current as HTMLElement, {
        preferCanvas: true,
        attributionControl: true,
        zoomControl: true,
        scrollWheelZoom,
        dragging: true,
        touchZoom: true,
      }).setView(center, zoom);

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: 0,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.invalidateSize();

      const addCircle = (marker: MapMarker, mapInstance: LeafletMapType) => {
        if (marker.circle) {
          // console.log('Adding circle with options:', marker.circle);

          const circleOptions = {
            radius: marker.circle.radius,
            color: marker.circle.color,
            fillColor: marker.circle.fillColor || marker.circle.color,
            fillOpacity: marker.circle.fillOpacity || 0.15,
            weight: marker.circle.weight || 3,
            opacity: marker.circle.opacity || 1,
            interactive: false,
            className: 'mobility-zone-circle',
          };

          if (circleRef.current) {
            // console.log('Removing existing circle');
            circleRef.current.remove();
          }

          try {
            const circle = L.circle(marker.position, circleOptions);
            circleRef.current = circle;
            circle.addTo(mapInstance);
            // console.log('Circle added successfully');

            // Forcer la mise à jour du cercle
            requestAnimationFrame(() => {
              if (circleRef.current) {
                circleRef.current.setStyle(circleOptions);
                mapInstance.invalidateSize();
              }
            });
          } catch (error) {
            console.error('Error adding circle:', error);
          }
        } else {
          // console.log('No circle configuration found in marker');
        }
      };

      // Ajouter le cercle immédiatement
      addCircle(markers[0], mapInstanceRef.current);

      // S'assurer que la carte est bien rendue
      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    };

    loadMap().catch((error) => {
      console.error('Error while loading the map :', error);
    });

    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        if (circleRef.current) {
          circleRef.current.setLatLng(center);
          mapInstanceRef.current.invalidateSize();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.remove();
        circleRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [center, zoom, markers, scrollWheelZoom]);

  return (
    <div
      ref={mapRef}
      className='h-full w-full overflow-hidden'
      style={{ position: 'relative', touchAction: 'manipulation' }}
    />
  );
};

export default memo(LeafletMap);
