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

import { Card, CardContent } from '@src/lib/components/ui/card';
import { cn } from '@src/lib/utils';
import { cnBorderNone } from '@src/styles/border.style';
import {
  cnPadding,
  cnPaddingX,
  cnPaddingBottom,
} from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import type { CardProps } from '@src/types/CardProps';

import LoadingSpinner from '@src/components/ui/spinner/LoadingSpinner';

import { Header2Card } from './layouts.cards/Header2Card';

const DynamicLeafletMap = dynamic(() => import('../maps/LeafletMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const MapCard: React.FC<{ className?: CardProps['className'] }> = ({
  className,
}) => (
  <Card className={cn(className, cnBorderNone, cnFlexCol, 'h-full flex-1 p-0')}>
    <Header2Card
      title='Où je travaille ?'
      description='Douai, Nord, France'
      className={cnPadding}
    />
    <CardContent
      className={cn(
        'flex-1 overflow-hidden',
        cnPaddingX,
        cnPaddingBottom,
        'min-h-[300px]'
      )}
    >
      <DynamicLeafletMap
        center={[50.381645, 3.053234]}
        zoom={9}
        markers={[
          {
            position: [50.381645, 3.053234],
            circle: {
              radius: 30000,
              color: '#4F46E5',
              fillColor: '#4F46E5',
              fillOpacity: 0.15,
              weight: 3,
              opacity: 1,
            },
          },
        ]}
      />
    </CardContent>
  </Card>
);

export default React.memo(MapCard);
