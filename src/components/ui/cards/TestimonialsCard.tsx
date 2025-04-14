import React from 'react';

import { Card } from '@/src/lib/components/ui/card';
import { cnSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import { cnSizeFull } from '@/src/styles/size.style';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { TestimonialsCarousel } from '../carousels/TestimonialsCarousel';

export const TestimonialsCard: React.FC<{
  testimonials: CardProps['testimonials'];
  className?: CardProps['className'];
}> = ({ testimonials, className }) => {
  return (
    <div
      className={cn(
        className,
        cnFlexFullCenter,
        cnFlexCol,
        cnSizeFull,
        cnSpaceY,
        'xl:flex-row xl:space-y-0'
      )}
    >
      {testimonials && testimonials.length > 0 && (
        <Card
          className={cn(
            'h-full w-full flex-1 xl:w-full',
            'bg-foreground/10 backdrop-blur-sm'
          )}
        >
          <TestimonialsCarousel testimonials={testimonials} />
        </Card>
      )}
    </div>
  );
};
