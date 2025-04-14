/**
 * @component
 * @name MapCard
 * @description A React functional component that renders a map card with a dynamic Leaflet map.
 * The map is loaded dynamically to avoid server-side rendering (SSR) issues.
 *
 * @returns {JSX.Element} A JSX element containing a dynamic Leaflet map and a footer with mobility zone information.
 *
 * @example
 * <MapCard />
 *
 * @remarks
 * - The map is centered at coordinates [50.381645, 3.053234] with a zoom level of 9.
 * - A single marker is displayed on the map with a circular overlay representing a 30-minute car mobility zone.
 * - The map uses a custom loading spinner while being dynamically loaded.
 *
 * @dependencies
 * - `next/dynamic` for dynamic imports.
 * - `../spinner/LoadingSpinner` for the loading spinner component.
 * - `../maps/DynamicLeaflet` for the dynamic Leaflet map component.
 */
/**
 * @file MapCard.tsx
 * @description This component renders a map card with a dynamic leaflet map.
 */
import dynamic from 'next/dynamic';
import React from 'react';

import LoadingSpinner from '../spinner/LoadingSpinner';

const DynamicLeafletMap = dynamic(() => import('../maps/DynamicLeaflet'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const MapCard: React.FC = () => {
  return (
    <div className='relative h-full w-full'>
      <DynamicLeafletMap
        center={[50.381645, 3.053234]}
        zoom={8}
        flyToAnimation={true}
        markers={[
          {
            position: [50.381645, 3.053234],
            circle: {
              radius: 30000,
              color: '#4F46E5',
              fillColor: '#4F46E5',
              fillOpacity: 0.15,
              weight: 3,
            },
          },
        ]}
      />
    </div>
  );
};

export default React.memo(MapCard);
