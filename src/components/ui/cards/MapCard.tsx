/**
 * @file Map.tsx
 * @description This component renders a map with a specific position and radius.
 */
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { Circle, MapContainer, TileLayer, useMap } from 'react-leaflet';

import useIntersectionObserver from '@/src/hooks/IntersectionObserver.hook';
import { useIsClient } from '@/src/hooks/useIsClient.hook';
import type { LocationEventsProps } from '@/src/types/LocationEventsProps';

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
