import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LocationEventsMapProps } from '@/types/LocationEventsProps';

const LocationEventsMap: React.FC<LocationEventsMapProps> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 10);
  }, [map, position]);

  return null;
};

export default LocationEventsMap;
