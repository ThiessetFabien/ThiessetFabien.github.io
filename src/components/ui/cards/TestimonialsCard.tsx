import React from 'react';

import { Card, CardContent, CardTitle } from '@/src/lib/components/ui/card';
import { cnGap, cnPaddingTop, cnPaddingX } from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import { cnTitle3 } from '@/src/styles/font.style';
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
  return (
    <div
      className={cn(
        className,
        'container grid min-w-full flex-1 grid-cols-1 xl:grid-cols-2',
        cnGap
      )}
    >
      <div className={cn(cnFlexCol, cnGap)}>
        <Card
          className={cn(cnPaddingTop, cnFlexFullCenter, cnFlexCol, 'h-content')}
        >
          <CardTitle className={cn(cnTitle3, 'text-center')}>
            Ce qu&apos;ils disent de mon travail
          </CardTitle>
          <CardContent className={cn(cnPaddingX)}>
            {testimonials && testimonials.length > 0 && (
              <TestimonialsCarousel testimonials={testimonials} />
            )}
          </CardContent>
        </Card>
        <MapCard />
      </div>
      <ContactCard />
    </div>
  );
};
