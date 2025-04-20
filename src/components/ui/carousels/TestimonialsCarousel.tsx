import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { cnBorderRadiusFull, cnBorder } from '@/src/styles/border.style';
import {
  cnSmallPadding,
  cnSmallSpaceX,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import { cnParagraph, cnSmallText, cnTitle3 } from '@/src/styles/font.style';
import { cnSizeFull } from '@/src/styles/size.style';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import GenericCarousel from '@src/components/ui/carousels/GenericCarousel';
import { TestimonialImage } from '@src/components/ui/images/TestimonalImage';
import {
  useIsLg,
  useIsMd,
  useIsSm,
  useIsXl,
} from '@src/styles/mediaQueries.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';

/**
 * TestimonialsCarousel component displays a carousel of testimonials.
 *
 * @param {Object} props - Component props
 * @param {Array<TestimonialProps>} props.testimonials - List of testimonials to display
 * @param {string} [props.className] - Additional class names for styling
 * @returns {JSX.Element} The testimonials carousel
 */
export const TestimonialsCarousel: React.FC<{
  testimonials: TestimonialProps[];
  className?: string;
}> = ({ testimonials, className }) => {
  const isSm = useIsSm();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();
  const [, setCurrentSlide] = useState(0);

  const items = testimonials.map((testimonial, index) => (
    <Card
      key={index}
      className={cn(
        cnSmallPadding,
        cnSmallSpaceY,
        cnFlexCol,
        cnSizeFull,
        'relative flex justify-evenly bg-card text-center',
        'hover:bg-gradient-to-b hover:from-background hover:via-secondary/10 hover:to-primary/20'
      )}
    >
      <CardHeader
        className={cn(
          cnFlexCol,
          cnSmallSpaceY,
          cnFlexFullCenter,
          'flex- mx-auto w-full p-0'
        )}
      >
        <Avatar
          className={cn(
            'relative aspect-square',
            'bg-primary text-primary-foreground',
            cnBorderRadiusFull,
            cnBorder,
            'h-12 w-12',
            isSm ? 'sm:h-14 sm:w-14' : '',
            isMd ? 'md:h-16 md:w-16' : '',
            isLg ? 'lg:h-12 lg:w-12' : '',
            isXl ? 'xl:h-14 xl:w-14' : ''
          )}
        >
          <TestimonialImage
            src={testimonial.imageSrc}
            alt={capitalizeFirstLetterOfEachWord(testimonial.author)}
          />
          <AvatarFallback className={cnParagraph}>
            {capitalizeFirstLetterOfEachWord(testimonial.author).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className={cn(cnFlexFullCenter, 'md:justify-start')}>
            <span
              className={cn('block font-bold text-foreground', cnSmallSpaceX)}
            >
              {capitalizeFirstLetterOfEachWord(testimonial.author)}
            </span>
          </div>
          <span className={cn(cnSmallText, 'block text-muted-foreground')}>
            {/* {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.job)
              )}
              <span className='mx-1'>•</span> */}
            {capitalizeFirstLetterOfEachWord(
              formatSpecialWords(testimonial.company)
            )}
          </span>
          {testimonial.linkedin && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='inline-block'
            >
              <ActionButton
                cta='Linkedin'
                variant='outline'
                className={cn(
                  'bg-[#0A66C2] text-white hover:bg-[#004182] hover:text-white',
                  'rounded-md border-0 shadow-sm'
                )}
                size='xs'
                href={testimonial.linkedin}
                aria-label={`Profil LinkedIn de ${testimonial.author}`}
              />
            </motion.div>
          )}
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <p
          className={cn(
            cnSmallText,
            'flex hyphens-auto break-words text-justify italic text-foreground/90'
          )}
        >
          {capitalizeFirstLetterOfPhrase(
            formatSpecialWords(testimonial.content)
          )}
        </p>
      </CardContent>
    </Card>
  ));

  return (
    <Card className={cn(className)}>
      <CardTitle className={cn(cnSmallPadding, cnTitle3, 'text-center')}>
        Ce qu&apos;ils disent de mon travail
      </CardTitle>
      <CardContent className='p-0'>
        <GenericCarousel
          className={cn('w-full')}
          containerHeight={cn()}
          items={items}
          delay={7000}
          controls={true}
          showPartialNext={isMd}
          onSlideChange={setCurrentSlide}
          autoplayOptions={{
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }}
          pauseOnHover={true}
          pauseOnInteraction={false}
        />
      </CardContent>
    </Card>
  );
};

export default TestimonialsCarousel;
