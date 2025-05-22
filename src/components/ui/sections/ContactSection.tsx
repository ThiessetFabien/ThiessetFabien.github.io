import dynamic from 'next/dynamic';
import { memo } from 'react';

import { cn } from '@lib/utils';
import { TestimonialsCarousel } from '@src/components/ui/carousels/TestimonialsCarousel';
import { cnSizeFull } from '@styles/size.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';

import { ContactForm } from '@src/components/ui/forms/ContactForm';

const MapCard = dynamic(() => import('../cards/MapCard'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

/**
 * A responsive grid layout component displaying contact information, testimonials, and a map.
 *
 * This component organizes three cards in a responsive grid:
 * - A ContactForm for contact information
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
export const ContactSection = memo(
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
      <section
        id='contact'
        aria-labelledby='contact-heading'
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
        <ContactForm
          className={cn(styleColumn, 'border-r bg-card-foreground text-card')}
        />

        <MapCard className={cn(styleColumn, 'bg-card-foreground text-card')} />
      </section>
    );
  }
);

ContactSection.displayName = 'ContactSection';

export default ContactSection;
