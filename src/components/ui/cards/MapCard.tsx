/**
 * @file Map.tsx
 * @description This component renders a map with a specific position and radius.
 */
import L from 'leaflet';
import React, { useEffect } from 'react';
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';

import useIntersectionObserver from '@/src/hooks/IntersectionObserver.hook';
import { useIsClient } from '@/src/hooks/useIsClient.hook';
import type { LocationEventsProps } from '@/src/types/LocationEventsProps';

// Import Leaflet styles
import '@/src/styles/leaflet.css';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet icons
const icon = L.icon({
  iconUrl: '/images/leaflet/marker-icon.png',
  iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
  tooltipAnchor: [16, -28],
});

L.Icon.Default.mergeOptions({
  iconUrl: '/images/leaflet/marker-icon.png',
  iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});

L.Marker.prototype.options.icon = icon;

/**
 * Map component.
 * @returns {JSX.Element} The rendered component.
 */

export const Map: React.FC = () => {
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  const LocationEventsMap: React.FC<{
    position: LocationEventsProps['position'];
  }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, 9, {
        duration: 1,
      });
    }, [map, position]);

    return null;
  };

  const isClient = useIsClient();

  const francePosition: [number, number] = [46.6034, 3.1236];
  const position: [number, number] = [50.381645, 3.053234];
  const radius = 60000 / 2;

  return (
    <div ref={ref}>
      {isClient ? (
        <MapContainer
          center={francePosition}
          zoom={4}
          scrollWheelZoom={false}
          className={'h-full min-h-80 w-full'}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {isIntersecting && <LocationEventsMap position={position} />}
          <Circle
            center={position}
            radius={radius}
            color='green'
            fillColor='green'
            fillOpacity={0.3}
          />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Map;
