import dynamic from 'next/dynamic';
import { memo } from 'react';

import { cn } from '@lib/utils';
import { TestimonialsCarousel } from '@src/components/ui/carousels/TestimonialsCarousel';
import { Card } from '@src/lib/components/ui/card';
import { cnSizeFull } from '@src/styles/size.style';
import { TestimonialProps } from '@src/types/TestimonialProps';

import { ContactCard } from '../cards/ContactCard';

const MapCard = dynamic(() => import('../cards/MapCard'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

/**
 * A responsive grid layout component displaying contact information, testimonials, and a map.
 *
 * This component organizes three cards in a responsive grid:
 * - A ContactCard for contact information
 * - A TestimonialsCarousel to display testimonials
 * - A MapCard showing location information
 *
 * The grid adjusts from 1 column on mobile to 2 columns on medium screens and 3 columns on large screens.
 *
 * @param props - The component props
 * @param props.testimonials - An array of testimonial items to be displayed in the carousel
 * @param props.className - Optional CSS class names to apply to the container
 * @returns A JSX element containing the three-card layout
 */
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
      <Card
        className={cn(
          className,
          cnSizeFull,
          'border-none',
          'grid grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-3'
        )}
      >
        <TestimonialsCarousel
          testimonials={testimonials}
          className={cn(styleColumn, 'bg-primary')}
        />
        <ContactCard
          className={cn(styleColumn, 'border-r bg-card-foreground text-card')}
        />

        <MapCard className={cn(styleColumn, 'bg-card-foreground text-card')} />
      </Card>
    );
  }
);

TestimonialsCard.displayName = 'TestimonialsCard';

export default TestimonialsCard;
