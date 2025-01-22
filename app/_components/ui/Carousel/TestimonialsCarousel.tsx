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
import { TestimonialProps } from '@/types/TestimonialProps.jsx';

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
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    CardProps['testimonials']
  >([]);
  const [availableTestimonials, setAvailableTestimonials] = useState<
    CardProps['testimonials']
  >([]);
  const [currentSlideTestimonials, setCurrentSlideTestimonials] = useState<
    CardProps['testimonials']
  >([]);

  useEffect(() => {
    const shuffleArray = (array: TestimonialProps[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const ensureDifferentAuthors = (array: TestimonialProps[]) => {
      const result = [];
      const usedAuthors = new Set();

      for (const item of array) {
        if (!usedAuthors.has(item.author)) {
          result.push(item);
          usedAuthors.add(item.author);
        }
      }

      return result;
    };
    const shuffled = testimonials ? shuffleArray([...testimonials]) : [];
    const uniqueAuthorTestimonials = ensureDifferentAuthors(shuffled);
    setShuffledTestimonials(uniqueAuthorTestimonials);
    setAvailableTestimonials(shuffled);
  }, [testimonials]);

  useEffect(() => {
    const getNextSlideTestimonials = () => {
      const result = [];
      const usedAuthors = new Set();

      for (const item of availableTestimonials ?? []) {
        if (!usedAuthors.has(item.author)) {
          result.push(item);
          usedAuthors.add(item.author);
        }
      }

      const remainingTestimonials = (availableTestimonials ?? []).filter(
        (item) => !usedAuthors.has(item.author)
      );

      setAvailableTestimonials([...remainingTestimonials, ...result]);

      return result;
    };

    if (availableTestimonials && availableTestimonials.length > 0) {
      setCurrentSlideTestimonials(getNextSlideTestimonials());
    }
  }, [availableTestimonials]);

  const items = (currentSlideTestimonials ?? []).map((testimonial, index) => (
    <div
      key={index}
      className={cn(cnSmallSpaceY, cnPaddingX, 'h-full min-w-full')}
    >
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
        <div className={cn(cnFlexCol, cnSmallText, cnLightTextMuted, 'ml-4')}>
          <p>{capitalizeFirstLetterOfEachWord(testimonial.author)}</p>
          <p>
            {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.job)
            )}
          </p>
          <p className={cnLightTextMuted}>
            {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.company)
            )}
          </p>
        </div>
      </div>
      <p className={cn(cnParagraph, 'max-w-full')}>
        &quot;&nbsp;
        {capitalizeFirstLetterOfPhrase(formatSpecialWords(testimonial.content))}
        &nbsp;&quot;
      </p>
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
