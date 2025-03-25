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
      // Utiliser un type plus spécifique pour éviter les événements récursifs
      const resizeEvent = new UIEvent('resize');
      window.dispatchEvent(resizeEvent);
    };

    // Ne pas ajouter de gestionnaire d'événements pour éviter les boucles
    // Appeler simplement après le montage
    const timeoutId = setTimeout(resizeMap, 300);

    return () => {
      clearTimeout(timeoutId);
    };
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
