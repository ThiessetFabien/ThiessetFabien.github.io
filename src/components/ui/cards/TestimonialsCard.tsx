import React from 'react';

import { Card } from '@/src/lib/components/ui/card';
import { cnBorderNone } from '@/src/styles/border.style';
import {
  cnGap,
  cnPaddingBottom,
  cnPaddingX,
} from '@/src/styles/boxModel.style';
import {
  cnFlexCenterX,
  cnFlexCenterY,
  cnFlexCol,
} from '@/src/styles/flex.style';
import { useIsLg, useIsXl } from '@/src/styles/mediaQueries.style';
import { cn } from '@lib/utils';
import MapCard from '@src/components/ui/cards/MapCard';
import type { CardProps } from '@src/types/CardProps';

import { TestimonialsCarousel } from '../carousels/TestimonialsCarousel';

import { ContactCard } from './ContactCard';

/**
 * TestimonialsCard component displays a card containing a carousel of testimonials.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.testimonials - List of testimonials to display in the carousel.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} The rendered testimonials card component.
 */
export const TestimonialsCard: React.FC<{
  testimonials: CardProps['testimonials'];
  className?: CardProps['className'];
}> = ({ testimonials, className }) => {
  const isLg = useIsLg();
  const isXl = useIsXl();

  return (
    <Card
      className={cn(
        className,
        cnPaddingX,
        cnPaddingBottom,
        cnGap,
        'container grid h-full grid-cols-1',
        'lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2'
      )}
    >
      {testimonials && testimonials.length > 0 && (
        <TestimonialsCarousel
          testimonials={testimonials}
          className={cn(
            cnFlexCenterX,
            cnFlexCol,
            cnBorderNone,
            'col-span-1 flex-1 transition-all duration-300',
            'h-full md:max-h-[30vh]',
            isLg
              ? 'lg:col-span-1 lg:row-span-1 lg:h-full lg:max-h-[calc(45vh-2rem)]'
              : '',
            isXl
              ? 'xl:col-span-2 xl:row-span-1 xl:h-full xl:max-h-[calc(45vh-2rem)]'
              : ''
          )}
        />
      )}

      <MapCard
        className={cn(
          cnBorderNone,
          'relative col-span-1 w-full flex-grow overflow-hidden transition-all duration-300',
          'md:h-full md:max-h-[30vh]',
          isLg ? 'lg:col-span-2 lg:row-span-1 lg:max-h-[calc(45vh-2rem)]' : '',
          isXl ? 'xl:col-span-2 xl:row-span-1 xl:max-h-[calc(45vh-2rem)]' : ''
        )}
      />

      <ContactCard
        className={cn(
          cnFlexCol,
          cnFlexCenterY,
          'col-span-1 rounded-lg shadow-md transition-all duration-300',
          'h-auto md:h-full md:max-h-[30vh]',
          isLg
            ? 'lg:col-span-1 lg:row-span-1 lg:h-full lg:max-h-[calc(45vh-2rem)]'
            : '',
          isXl
            ? 'xl:col-span-1 xl:row-span-2 xl:h-full xl:max-h-[calc(90vh-4rem)]'
            : ''
        )}
      />
    </Card>
  );
};
