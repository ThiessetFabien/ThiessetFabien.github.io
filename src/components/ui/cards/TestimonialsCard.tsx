import React from 'react';

import { Card } from '@/src/lib/components/ui/card';
import { cnSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { TestimonialsCarousel } from '../carousels/TestimonialsCarousel';

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
    <div className={cn(className, cnFlexFullCenter, cnFlexCol, cnSpaceY)}>
      {testimonials && testimonials.length > 0 && (
        <Card className={cn('w-full', 'bg-foreground/10 backdrop-blur-sm')}>
          <TestimonialsCarousel testimonials={testimonials} />
        </Card>
      )}
    </div>
  );
};
