import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import LoadingSpinner from '../spinner/LoadingSpinner';

// Importer Leaflet de manière dynamique
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false, // Désactiver le SSR pour Leaflet
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const DynamicLeaflet = () => {
  // Ajouter un état pour suivre le montage du composant côté client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Corrige un problème courant avec Leaflet sur mobile
    const resizeMap = () => {
      // Déclenche un événement de redimensionnement pour que Leaflet recalcule sa taille
      window.dispatchEvent(new Event('resize'));
    };

    window.addEventListener('resize', resizeMap);
    // Appeler une fois après montage
    setTimeout(resizeMap, 300);

    return () => window.removeEventListener('resize', resizeMap);
  }, []);

  if (!mounted) {
    return <LoadingSpinner size='lg' message='Preparing map...' />;
  }

  return (
    <div className='h-full min-h-[350px] w-full'>
      <LeafletMap />
    </div>
  );
};

export default DynamicLeaflet;
