/**
 * @file Map.tsx
 * @description This component renders a map with a specific position and radius.
 */
import React from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import LocationEventsMap from '@/hooks/LocationEventsMap';
import useIntersectionObserver from '@/hooks/IntersectionObserver';
import {
  francePosition,
  myPosition,
  radius,
} from '@/utils/constants/positions';
import { cnMarginBottom } from '@/styles/boxModelStyles';
import { cn } from '@/lib/utils';
import { HeaderCard } from '@/ui/Card/LayoutCard/HeaderCard';
import { CardContent } from '@/lib/components/ui/card';
import { CardProps } from '@/types/CardProps';

/**
 * Map component.
 * @returns {JSX.Element} The rendered component.
 */

export const Map: React.FC<CardProps> = ({ title, description }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  return (
    <>
      <HeaderCard title={title} description={description} />
      <CardContent ref={ref} className='container overflow-hidden'>
        <MapContainer
          center={francePosition}
          zoom={4}
          scrollWheelZoom={false}
          className={cn(cnMarginBottom, 'min-h-[20rem] w-auto rounded-xl')}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {isIntersecting && <LocationEventsMap position={myPosition} />}
          <Circle
            center={myPosition}
            radius={radius}
            color='purple'
            fillColor='purple'
            fillOpacity={0.3}
          />
        </MapContainer>
      </CardContent>
    </>
  );
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});
