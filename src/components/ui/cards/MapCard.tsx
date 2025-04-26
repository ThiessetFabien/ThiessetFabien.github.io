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
import { cnPaddingY, cnPadding } from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import { CardProps } from '@src/types/CardProps';

import LoadingSpinner from '../spinner/LoadingSpinner';

import { Header2Card } from './layouts.cards/Header2Card';

const DynamicLeafletMap = dynamic(() => import('../maps/LeafletMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const MapCard: React.FC<{ className?: CardProps['className'] }> = ({
  className,
}) => {
  return (
    <div className={cn(className, 'h-full')}>
      <Card className={cn(cnPadding, cnBorderNone, cnFlexCol, 'h-full flex-1')}>
        <Header2Card
          title='Où je travaille ?'
          description='Douai, Nord, France'
          className={cnPaddingY}
        />
        <CardContent
          className={cn('flex-1 overflow-hidden p-0', 'min-h-[300px]')}
        >
          <DynamicLeafletMap
            center={[50.381645, 3.053234]}
            zoom={9}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(MapCard);
