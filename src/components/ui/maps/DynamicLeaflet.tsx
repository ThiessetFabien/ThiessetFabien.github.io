import dynamic from 'next/dynamic';
import React from 'react';

import { type LeafletMapProps } from '@/src/types/LeafletMapProps';

import LoadingSpinner from '../spinner/LoadingSpinner';

// Import dynamique du composant LeafletMap pour éviter les problèmes SSR
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

/**
 * Composant enveloppeur pour charger dynamiquement la carte Leaflet
 */
const DynamicLeaflet: React.FC<LeafletMapProps> = (props) => {
  return <LeafletMap {...props} />;
};

export default DynamicLeaflet;
