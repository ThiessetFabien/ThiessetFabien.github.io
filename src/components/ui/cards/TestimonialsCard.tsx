import dynamic from 'next/dynamic';
import { memo } from 'react';

import { cn } from '@lib/utils';
import { TestimonialsCarousel } from '@src/components/ui/carousels/TestimonialsCarousel';
import { cnSizeFull } from '@src/styles/size.style';
import { TestimonialProps } from '@src/types/TestimonialProps';

import { ContactCard } from '../cards/ContactCard';

const MapCard = dynamic(() => import('../cards/MapCard'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

export const TestimonialsCard = memo(
  ({
    testimonials,
    className,
  }: {
    testimonials: TestimonialProps[];
    className?: string;
  }): JSX.Element => {
    const styleColumn = cn(
      cnSizeFull,
      'p-0 overflow-hidden border-none rounded-none transition-all duration-300',
      'col-span-1 md:col-span-2 lg:col-span-1',
      'h-[90dvh] max-h-[90dvh]'
    );

    return (
      <div
        className={cn(
          className,
          cnSizeFull,
          'grid grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-3'
        )}
      >
        <ContactCard
          className={cn(styleColumn, 'bg-card-foreground text-card')}
        />

        <TestimonialsCarousel
          testimonials={testimonials}
          className={cn(styleColumn)}
        />

        <MapCard className={styleColumn} />
      </div>
    );
  }
);

TestimonialsCard.displayName = 'TestimonialsCard';

export default TestimonialsCard;
