'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import LocationEventsMap from '../../../hooks/LocationEventsMap';
import useIntersectionObserver from '@/hooks/IntersectionObserver';
import { LocationEventsMapProps } from '@/types/LocationEventsProps';
import {
  francePosition,
  myPosition,
  radius,
} from '@/utils/constants/positions';

/**
 * @file Map.tsx
 * @description This component renders a map with a specific position and radius.
 */

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

  return (
    <div ref={ref}>
      <MapContainer
        center={francePosition}
        zoom={6}
        scrollWheelZoom={false}
        className='mb-4 h-[41.6rem] w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {isIntersecting && <LocationEventsMap position={myPosition} />}
        <Circle
          center={myPosition}
          radius={radius}
          color='blue'
          fillColor='blue'
          fillOpacity={0.2}
        />
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
