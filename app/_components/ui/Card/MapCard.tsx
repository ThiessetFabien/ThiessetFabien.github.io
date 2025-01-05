/**
 * @file Map.tsx
 * @description This component renders a map with a specific position and radius.
 */
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { Map as MapType } from 'leaflet';
import LocationEventsMap from '@/hooks/LocationEventsMap';
import useIntersectionObserver from '@/hooks/IntersectionObserver';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
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
  const [isMounted, setIsMounted] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return <div className='h-full w-full animate-pulse' />;

  return (
    <>
      <HeaderCard title={title} description={description} />
      <CardContent ref={ref} className='container overflow-hidden'>
        <MapContainer
          key={isMounted.toString()}
          center={francePosition}
          zoom={4}
          scrollWheelZoom={false}
          className={cn(cnMarginBottom, 'min-h-[20rem] w-auto rounded-xl')}
          suppressHydrationWarning={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            suppressHydrationWarning={true}
          />
          {isIntersecting && <LocationEventsMap position={myPosition} />}
          <Circle
            center={myPosition}
            radius={radius}
            color='purple'
            fillColor='purple'
            fillOpacity={0.3}
            suppressHydrationWarning={true}
          />
        </MapContainer>
      </CardContent>
    </>
  );
};
