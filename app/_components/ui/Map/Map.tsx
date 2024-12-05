'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import LocationEventsMap from '../../../hooks/LocationEventsMap';
import useIntersectionObserver from '@/hooks/IntersectionObserver';
import { LocationEventsMapProps } from '@/types/LocationEventsProps';

export const Map: React.FC = () => {
  const francePosition: [number, number] = [46.6034, 3.1236];
  const myPosition: [number, number] = [50.381645, 3.053234];
  const radius = 60000 / 2;

  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  return (
    <div ref={ref} className='h-[41.6rem] w-full'>
      <MapContainer
        center={francePosition}
        zoom={6}
        className='h-full w-full'
        scrollWheelZoom={false}
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
