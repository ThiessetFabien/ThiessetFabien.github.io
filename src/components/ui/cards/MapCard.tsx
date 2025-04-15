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

import { cn } from '@/src/lib/utils';
import { CardProps } from '@/src/types/CardProps';

import LoadingSpinner from '../spinner/LoadingSpinner';

const DynamicLeafletMap = dynamic(() => import('../maps/LeafletMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const MapCard: React.FC<{ className?: CardProps['className'] }> = ({
  className,
}) => (
  <div className={cn(className, 'relative h-full w-full')}>
    <DynamicLeafletMap
      center={[46.6034, 3.1236]}
      zoom={8}
      flyToAnimation
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

export default React.memo(MapCard);
