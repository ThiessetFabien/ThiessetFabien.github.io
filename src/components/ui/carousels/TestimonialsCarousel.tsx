import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ActionButton } from '@/src/components/ui/buttons/ActionButton';
import GenericCarousel from '@/src/components/ui/carousels/GenericCarousel';
import { cnBorder, cnBorder2 } from '@/src/styles/border.style';
import {
  cnGap,
  cnMarginLeft,
  cnPadding,
  cnPaddingTop,
  cnPaddingX,
  cnPaddingY,
  cnSmallSpaceY,
  cnSpaceY,
} from '@/src/styles/boxModel.style';
import {
  cnFlexCenterY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/src/styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@/src/styles/font.style';
import { baseUrl } from '@/src/utils/baseUrl.util';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { cn } from '@lib/utils';
import { CardProps } from '@src/types/CardProps';
import type { TestimonialProps } from '@src/types/TestimonialProps';

import { ContactForm } from '../../forms/ContactForm';
import MapCard from '../cards/MapCard';
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
    <div key={index} className={cn('relative flex h-full min-w-full flex-col')}>
      <p
        className={cn(
          cnSmallText,
          cnPaddingX,
          'relative flex flex-grow items-center justify-center overflow-auto italic'
        )}
      >
        <span className='max-w-[90%] text-center'>
          {capitalizeFirstLetterOfPhrase(
            formatSpecialWords(testimonial.content)
          )}
        </span>
      </p>

      <div className={cn('w-full', cnFlexFullCenter)}>
        <Avatar
          className={cn(
            'relative aspect-square h-10 w-10 border border-primary shadow-sm',
            cnBorder2
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
        <div className={cn(cnSmallText, cnFlexCol, cnMarginLeft)}>
          <div className={cnFlexCenterY}>
            <span className={cn('font-bold text-primary')}>
              {capitalizeFirstLetterOfEachWord(testimonial.author)}
            </span>
            <a
              href={`${baseUrl}${testimonial.linkedin}`}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`Profil LinkedIn de ${capitalizeFirstLetterOfEachWord(testimonial.author)}`}
              className='ml-1.5'
            >
              <motion.div
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ActionButton
                  variant='outline'
                  cta='LinkedIn'
                  size='xs'
                  className='ml-0.5 items-baseline px-1.5 py-0 text-[0.65rem] text-foreground'
                />
              </motion.div>
            </a>
          </div>
          <div className={'flex text-xs text-muted'}>
            <span className='inline-block font-medium'>
              {capitalizeFirstLetterOfEachWord(
                formatSpecialWords(testimonial.job)
              )}
            </span>
            <span className='mx-1'>•</span>
            <span className={cn('inline-block')}>
              {capitalizeFirstLetterOfEachWord(
                formatSpecialWords(testimonial.company)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div
      className={cn(
        'container mx-auto grid grid-cols-1 lg:grid-cols-2',
        cnPaddingX,
        cnGap
      )}
    >
      <div
        className={cn(
          cnFlexCol,
          cnSmallSpaceY,
          cnGap,
          'h-auto min-h-[420px] md:h-[calc(100dvh-120px)]'
        )}
      >
        <div
          className={cn(
            cnBorder,
            cnPaddingTop,
            'flex-grow overflow-hidden rounded-lg border-muted',
            'bg-foreground/80 text-background'
          )}
        >
          <h3 className={cn(cnTitle3, 'text-center')}>
            Ce qu&apos;ils disent de mon travail
          </h3>
          <GenericCarousel items={items} delay={7000} controls={true} />
        </div>
        <div
          className={cn(
            cnBorder,
            cnPaddingY,
            cnSpaceY,
            'bg-foreground/80 text-background',
            'h-[325px] overflow-hidden rounded-lg border-muted'
          )}
        >
          <h3 className={cn(cnTitle3, 'text-center')}>
            Où je travaille localement ?
          </h3>
          <div className='h-[285px]'>
            <MapCard />
          </div>
        </div>
      </div>

      <div className={cnFlexCol}>
        <div
          className={cn(cnPadding, cnBorder, 'h-full rounded-lg border-muted')}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
