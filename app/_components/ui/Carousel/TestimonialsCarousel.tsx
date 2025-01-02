import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Linkedin } from 'lucide-react';
import GenericCarousel from './GenericCarousel';
import { baseUrl } from '@/utils/constants/baseUrl';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types/CardProps';
import {
  cnLightTextMuted,
  cnParagraph,
  cnSmallText,
} from '@/styles/fontStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnPadding, cnSpaceY } from '@/styles/boxModelStyles';

/**
 * @file TestimonialsCarousel.tsx
 * @description This file exports a component that renders a carousel of testimonials.
 */

/**
 * TestimonialsCarousel component.
 * @param {Object} props - The props for the component.
 * @param {Testimonials[]} props.testimonials - An array of testimonials to be displayed.
 * @param {string} props.className - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered TestimonialsCarousel component.
 * @example
 * <TestimonialsCarousel testimonials={testimonials} className="custom-class" />
 */
export const TestimonialsCarousel: React.FC<CardProps> = ({
  testimonials,
  className,
}) => {
  // const shuffledTestimonial = testimonials
  //   ? testimonials.sort(() => Math.random() - 0.5)
  //   : [];

  const items =
    testimonials &&
    testimonials.map((testimonial, index) => (
      <div key={index} className={cn(cnSpaceY, cnPadding, 'h-auto min-w-full')}>
        <div className='lex-shrink-0 flex items-center'>
          <a href={`${baseUrl}${testimonial.linkedin}`}>
            <div className='relative left-0 top-0'>
              <Avatar className='h-12 w-12'>
                <AvatarImage
                  src={`${baseUrl}${testimonial.imageSrc}`}
                  alt={testimonial.name}
                />
                <AvatarFallback className={cnSmallText}>
                  {testimonial.name}
                </AvatarFallback>
              </Avatar>
              <Button
                variant='default'
                className={cn(
                  'absolute bottom-0 right-0 z-auto',
                  'h-2/5 w-2/5',
                  'p-1'
                )}
              >
                <Linkedin
                  size={14}
                  className={cn('rounded-full', 'font-bold text-background')}
                />
              </Button>
            </div>
          </a>
          <div className={cn(cnFlexCol, 'ml-4')}>
            <p className={cnSmallText}>{testimonial.name}</p>
            <p className={cn(cnSmallText, cnLightTextMuted)}>
              {testimonial.context}
            </p>
          </div>
        </div>
        <p className={cnParagraph}>&quot;{testimonial.content}&quot;</p>
      </div>
    ));

  return <GenericCarousel items={items} className={className} delay={7000} />;
};

export default TestimonialsCarousel;
