import dynamic from 'next/dynamic';
import React from 'react';

import { type LeafletMapProps } from '@/src/types/LeafletMapProps';

import LoadingSpinner from '../spinner/LoadingSpinner';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

/**
 * Wrapper component to dynamically load the Leaflet map.
 *
 * @param {LeafletMapProps} props - The properties for the Leaflet map.
 * @returns {JSX.Element} The dynamically loaded Leaflet map component.
 */
const DynamicLeaflet: React.FC<LeafletMapProps> = (props) => {
  return <LeafletMap {...props} />;
};

export default DynamicLeaflet;
