import dynamic from 'next/dynamic';

import LoadingSpinner from '../LoadingSpinner';

// Importer Leaflet de manière dynamique
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false, // Désactiver le SSR pour Leaflet
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const DynamicLeaflet = () => {
  return;
  <LeafletMap />;
};

export default DynamicLeaflet;
