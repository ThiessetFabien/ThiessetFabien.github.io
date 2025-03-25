/**
 * @file MapCard.tsx
 * @description This component renders a map card with a dynamic leaflet map.
 */
import dynamic from 'next/dynamic';
import React from 'react';

import LoadingSpinner from '../spinner/LoadingSpinner';

// Charger la carte de façon dynamique pour éviter les problèmes SSR
const DynamicLeafletMap = dynamic(() => import('../maps/DynamicLeaflet'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const MapCard: React.FC = () => {
  return (
    <div className='block h-full w-full'>
      <DynamicLeafletMap />
    </div>
  );
};

export default React.memo(MapCard);
