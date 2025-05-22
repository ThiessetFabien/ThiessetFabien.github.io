import { motion } from 'framer-motion';
import React from 'react';

import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { Button } from '@lib/components/ui/button';
import { Card, CardContent } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { TestimonialImage } from '@src/components/ui/images/TestimonalImage';
import { cnBorderRadiusFull, cnBorder } from '@styles/border.style';
import {
  cnPadding,
  cnPaddingTop,
  cnPaddingX,
  cnSmallGap,
  cnSmallPadding,
} from '@styles/boxModel.style';
import { cnFlexCenterY, cnFlexBetweenX } from '@styles/flex.style';
import { cnParagraph, cnSmallText } from '@styles/font.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

import { LinkedinIcon } from '@src/components/ui/svg/Linkedin';

const slideVariants = {
  enter: { opacity: 0, y: 15 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

interface TestimonialItemProps {
  testimonial: TestimonialProps;
  index: number;
  isPartial: boolean;
}

export const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  index,
  isPartial,
}) => {
  const testimonialId = `testimonial-item-${index}`;
  const authorId = `testimonial-author-${index}`;
  const jobId = `testimonial-job-${index}`;

  return (
    <motion.div
      key={`${testimonial.author}-${index}`}
      initial='enter'
      animate='center'
      exit='exit'
      variants={slideVariants}
      transition={{ duration: 0.4 }}
      className={cn('w-full', isPartial && 'opacity-70')}
      id={testimonialId}
      aria-labelledby={authorId}
    >
      <Card
        className={cn(
          cnSmallPadding,
          'relative rounded-none bg-card text-center',
          'transition-colors duration-200 hover:bg-card/90',
          'flex h-auto flex-col justify-between',
          isPartial
            ? 'max-h-[90px] min-h-[90px] overflow-hidden'
            : 'min-h-[200px]'
        )}
      >
        <div
          className={cn(cnFlexCenterY, cnFlexBetweenX, cnPadding, 'border-b')}
        >
          <div className={cn(cnFlexCenterY, cnSmallGap)}>
            <Avatar
              className={cn(
                'relative aspect-square',
                'bg-primary text-primary-foreground',
                cnBorderRadiusFull,
                cnBorder
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

            <div className='text-left'>
              <div
                id={authorId}
                className={cn(cnSmallText, 'font-semibold leading-tight')}
              >
                {capitalizeFirstLetterOfEachWord(testimonial.author)}
              </div>
              <div
                id={jobId}
                className='font-sans text-xs leading-tight text-muted-foreground'
                aria-describedby={authorId}
              >
                {capitalizeFirstLetterOfEachWord(
                  formatSpecialWords(testimonial.company)
                )}
              </div>
            </div>
          </div>

          {testimonial.linkedin && !isPartial && (
            <Button
              size='icon'
              variant='link'
              className='h-7 w-7 rounded-full'
              asChild
            >
              <a
                href={testimonial.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Profil LinkedIn de ${testimonial.author}`}
              >
                <LinkedinIcon className='h-4 w-4 text-[#0A66C2]' />
              </a>
            </Button>
          )}
        </div>

        {!isPartial ? (
          <CardContent
            className={cn(cnPaddingX, cnPaddingTop, 'flex-1 overflow-auto')}
          >
            <p
              className={cn(
                'hyphens-auto break-words text-justify italic text-foreground/90',
                'mx-auto max-w-[95%]',
                'text-xs'
              )}
            >
              {capitalizeFirstLetterOfPhrase(
                formatSpecialWords(testimonial.content)
              )}
            </p>
          </CardContent>
        ) : (
          <CardContent className='relative h-8 overflow-hidden'>
            <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/80' />
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default TestimonialItem;
