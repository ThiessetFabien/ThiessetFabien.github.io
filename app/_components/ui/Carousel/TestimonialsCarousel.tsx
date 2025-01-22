import React, { use, useEffect, useState } from 'react';
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
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnPaddingX, cnSmallSpaceY } from '@/styles/boxModelStyles';
import type { TestimonialProps } from '@/types/TestimonialProps';
import { ActionButton } from '../CallToAction/ActionButton';

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
export const TestimonialsCarousel: React.FC<{
  testimonials: CardProps['testimonials'];
}> = ({ testimonials }) => {
  const [shuffled, setShuffled] = useState<CardProps['testimonials']>([]);
  const [previousAuthor, setPreviousAuthor] = useState<string>('');

  useEffect(() => {
    const shuffleSlides = (testimonials: TestimonialProps[]) => {
      for (let i = testimonials.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [testimonials[i], testimonials[j]] = [testimonials[j], testimonials[i]];
      }
      return testimonials;
    };

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

    const shuffled = testimonials ? shuffleSlides([...testimonials]) : [];
    const uniqueContentAndAuthor = ensureDifferentContentAndAuthor(shuffled);
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
        'min-h-full min-w-full'
      )}
    >
      <p className={cn(cnParagraph, 'max-w-full')}>
        &quot;&nbsp;
        {capitalizeFirstLetterOfPhrase(formatSpecialWords(testimonial.content))}
        &nbsp;&quot;
      </p>
      <div className='flex flex-shrink-0 items-center'>
        <a href={`${baseUrl}${testimonial.linkedin}`}>
          <div className='relative left-0 top-0'>
            <Avatar className='h-12 w-12'>
              <AvatarImage
                src={`${baseUrl}${testimonial.imageSrc}`}
                alt={capitalizeFirstLetterOfEachWord(testimonial.author)}
              />
              <AvatarFallback className={cnParagraph}>
                {capitalizeFirstLetterOfEachWord(testimonial.author)}
              </AvatarFallback>
            </Avatar>
            <ActionButton
              icon='Linkedin'
              variant='secondary'
              className={cn(
                'absolute bottom-0 right-0 z-auto',
                'h-2/5 w-2/5',
                'p-1'
              )}
            />
          </div>
        </a>
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

  return (
    <GenericCarousel
      items={items}
      delay={7000}
      fastRotate={false}
      controls='arrows'
    />
  );
};

export default TestimonialsCarousel;
