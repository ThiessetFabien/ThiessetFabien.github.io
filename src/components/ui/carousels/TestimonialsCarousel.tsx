import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ActionButton } from '@/src/components/ui/buttons/ActionButton';
import GenericCarousel from '@/src/components/ui/carousels/GenericCarousel';
import { cnBorder2, cnBorderRadiusFull } from '@/src/styles/border.style';
import {
  cnPaddingBottom,
  cnPaddingX,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import {
  cnLightTextMuted,
  cnParagraph,
  cnSmallText,
} from '@/src/styles/font.style';
import { baseUrl } from '@/src/utils/baseUrl.util';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { shuffleArray } from '@/src/utils/ShuffleArray.util';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { cn } from '@lib/utils';
import { CardProps } from '@src/types/CardProps';
import type { TestimonialProps } from '@src/types/TestimonialProps';

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
}): JSX.Element => {
  const [shuffled, setShuffled] = useState<CardProps['testimonials']>([]);

  useEffect(() => {
    const ensureDifferentContentAndAuthor = (
      testimonials: TestimonialProps[]
    ) => {
      const result: TestimonialProps[] = [];
      const usedContent = new Set<number>();
      let previousAuthor = '';

      testimonials.forEach((testimonial, index) => {
        if (!usedContent.has(index) && testimonial.author !== previousAuthor) {
          result.push(testimonial);
          usedContent.add(index);
          previousAuthor = testimonial.author;
        }
      });

      if (
        result.length > 1 &&
        result[0].author === result[result.length - 1].author
      ) {
        for (let i = 1; i < result.length - 1; i++) {
          if (
            result[i].author !== result[0].author &&
            result[i].author !== result[result.length - 1].author
          ) {
            [result[result.length - 1], result[i]] = [
              result[i],
              result[result.length - 1],
            ];
            break;
          }
        }
      }
      return result;
    };

    const shuffled = testimonials ? shuffleArray([...testimonials]) : [];
    const uniqueContentAndAuthor = ensureDifferentContentAndAuthor(
      shuffled ?? []
    );
    setShuffled(uniqueContentAndAuthor);
  }, [testimonials]);

  const items = (shuffled ?? []).map((testimonial, index) => (
    <div
      key={index}
      className={cn(
        cnFlexCol,
        'flex-wrap justify-between',
        cnSmallSpaceY,
        cnPaddingX,
        cnPaddingBottom,
        'min-h-full min-w-full'
      )}
    >
      <p className={cn(cnParagraph, 'max-w-full rounded px-1')}>
        &quot;&nbsp;
        {capitalizeFirstLetterOfPhrase(formatSpecialWords(testimonial.content))}
        &nbsp;&quot;
      </p>
      <div className={cn('flex items-center')}>
        <div className='relative left-0 top-0'>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <a
              href={`${baseUrl}${testimonial.linkedin}`}
              target='_blank'
              rel='noreferrer noopener'
            >
              <Avatar
                className={cn(
                  'relative aspect-square h-12 w-12 border border-accent',
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
              <ActionButton
                icon='Linkedin'
                variant='link'
                size='icon'
                className={cn(
                  'absolute -bottom-2 -right-2 z-auto scale-50 bg-accent',
                  cnBorderRadiusFull
                )}
              />
            </a>
          </motion.div>
        </div>
        <div className={cn(cnSmallText, 'ml-4')}>
          <p className={cn(cnFlexCol)}>
            <span className={cn(cnLightTextMuted, 'inline-block')}>
              {capitalizeFirstLetterOfEachWord(testimonial.author)}
            </span>
            <span className='inline-block font-light'>
              {capitalizeFirstLetterOfEachWord(
                formatSpecialWords(testimonial.job)
              )}
            </span>
            <span className={cn(cnLightTextMuted, 'inline-block')}>
              {capitalizeFirstLetterOfEachWord(
                formatSpecialWords(testimonial.company)
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  ));

  return <GenericCarousel items={items} delay={7000} />;
};

export default TestimonialsCarousel;
