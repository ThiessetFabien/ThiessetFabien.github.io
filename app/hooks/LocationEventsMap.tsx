import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LocationEvents } from '@/types/LocationEventsProps';

/**
 * @file LocationEvents.tsx
 * @description This component handles map events such as flying to a specific position.
 */

/**
 * LocationEvents component.
 * @param {LocationEventsProps} props - The props for the component.
 * @returns {null} The component does not render anything.
 */

const LocationEventsMap: React.FC<LocationEvents> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 9, {
      duration: 1,
    });
  }, [map, position]);

  return null;
};

export default LocationEventsMap;
