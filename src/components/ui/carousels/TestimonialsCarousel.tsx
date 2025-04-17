import React, { useEffect, useState } from 'react';

import GenericCarousel from '@/src/components/ui/carousels/GenericCarousel';
import { cnBorder } from '@/src/styles/border.style';
import {
  cnMarginTop,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import { cnParagraph, cnSmallText } from '@/src/styles/font.style';
import { cnSizeFull } from '@/src/styles/size.style';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { cn } from '@lib/utils';
import { CardProps } from '@src/types/CardProps';
import type { TestimonialProps } from '@src/types/TestimonialProps';

import { ActionButton } from '../buttons/ActionButton';
import { TestimonialImage } from '../images/TestimonalImage';

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
/**
 * A React functional component that renders a carousel of testimonials.
 * The testimonials are shuffled and processed to ensure unique content and authors
 * are displayed in sequence. Each testimonial includes content, author details, and
 * a LinkedIn link with an avatar image.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {TestimonialProps[] | undefined} props.testimonials - An array of testimonials to display.
 * Each testimonial includes content, author, job, company, and LinkedIn link.
 * @param {string} [props.className] - Optional additional CSS class names for the component.
 * @returns {JSX.Element} The rendered carousel component.
 *
 * @example
 * ```tsx
 * const testimonials = [
 *   {
 *     content: "This is a great service!",
 *     author: "John Doe",
 *     job: "Software Engineer",
 *     company: "Tech Corp",
 *     linkedin: "/john-doe",
 *     imageSrc: "/images/john-doe.jpg"
 *   },
 *   {
 *     content: "Highly recommend this product.",
 *     author: "Jane Smith",
 *     job: "Product Manager",
 *     company: "Innovate Ltd",
 *     linkedin: "/jane-smith",
 *     imageSrc: "/images/jane-smith.jpg"
 *   }
 * ];
 *
 * <TestimonialsCarousel testimonials={testimonials} className="custom-class" />
 * ```
 */
export const TestimonialsCarousel: React.FC<{
  testimonials: TestimonialProps[] | undefined;
  className?: string;
}> = ({
  testimonials,
}: {
  testimonials: TestimonialProps[] | undefined;
  className?: string;
}): JSX.Element => {
  const [testimonialsList, setShuffled] = useState<CardProps['testimonials']>(
    []
  );

  useEffect(() => {
    const getOrderedTestimonials = (testimonials: TestimonialProps[]) => {
      return testimonials;
    };

    const orderedTestimonials = getOrderedTestimonials(testimonials ?? []);
    setShuffled(orderedTestimonials);
  }, [testimonials]);

  const items = (testimonialsList ?? []).map((testimonial, index) => (
    <div
      key={index}
      className={cn(
        cnSmallPadding,
        cnMarginTop,
        cnSmallSpaceY,
        cnSizeFull,
        cnFlexCol,
        cnBorder,
        'relative text-center',
        'bg-primary/80 text-primary-foreground hover:bg-gradient-to-b hover:from-background hover:via-secondary hover:to-primary'
      )}
    >
      <div
        className={cn(
          cnFlexCol,
          cnSmallSpaceY,
          cnFlexFullCenter,
          'm-auto h-full w-full max-w-[90%] flex-wrap'
        )}
      >
        <Avatar
          className={cn(
            'relative aspect-square h-16 w-16 flex-none',
            'bg-primary text-primary-foreground',
            cnBorder
          )}
        >
          <TestimonialImage
            src={testimonial.imageSrc}
            alt={capitalizeFirstLetterOfEachWord(testimonial.author)}
          />
          <AvatarFallback className={cnParagraph}>
            {capitalizeFirstLetterOfEachWord(testimonial.author)}
          </AvatarFallback>
        </Avatar>
        <p className='flex-none'>
          <span className='block font-bold text-primary-foreground'>
            {capitalizeFirstLetterOfEachWord(testimonial.author)}
            <ActionButton
              variant='outline'
              className='ml-2'
              size='xs'
              cta='LinkedIn'
              href={testimonial.linkedin}
            />
          </span>
          <span className={cn(cnSmallText, 'text-muted')}>
            {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.job)
            )}
            <span className='mx-1'>•</span>
            {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.company)
            )}
          </span>
        </p>
        <p
          className={cn(
            cnMarginTop,
            cnSmallText,
            'flex hyphens-auto break-words text-justify italic'
          )}
        >
          {capitalizeFirstLetterOfPhrase(
            formatSpecialWords(testimonial.content)
          )}
        </p>
      </div>
    </div>
  ));

  return (
    <GenericCarousel
      className=''
      containerHeight='min-h-[90dvh] sm:min-h-[60dvh] md:min-h-[338px] lg:min-h-[318px] xl:min-h-[378px]'
      items={items}
      delay={7000}
      controls={true}
    />
  );
};

export default TestimonialsCarousel;
