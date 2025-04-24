import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Linkedin, Play, Pause } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { Button } from '@lib/components/ui/button';
import { Card, CardContent } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { TestimonialImage } from '@src/components/ui/images/TestimonalImage';
import { cnBorderRadiusFull, cnBorder } from '@src/styles/border.style';
import { cnPadding, cnSmallPadding } from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import { cnParagraph, cnSmallText } from '@src/styles/font.style';
import {
  useIsLg,
  useIsMd,
  useIsSm,
  useIsXl,
} from '@src/styles/mediaQueries.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

import { Header2Card } from '../cards/layouts.cards/Header2Card';

export const TestimonialsCarousel: React.FC<{
  testimonials: TestimonialProps[];
  className?: string;
}> = ({ testimonials, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isSm = useIsSm();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();

  // Mesure la hauteur du conteneur
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContainerHeight(contentRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const determineVisibleCount = () => {
    const avgTestimonialHeight = 210;
    const maxFullTestimonials = Math.floor(
      containerHeight / avgTestimonialHeight
    );
    const fullTestimonialsCount = Math.max(2, maxFullTestimonials);
    const hasPartialSpace = containerHeight % avgTestimonialHeight > 50;

    return {
      full: fullTestimonialsCount,
      hasPartial: hasPartialSpace,
    };
  };

  const getVisibleTestimonials = () => {
    const { full, hasPartial } = determineVisibleCount();
    const result = [];

    for (let i = 0; i < full; i++) {
      const index = (activeIndex + i) % testimonials.length;
      result.push({
        testimonial: testimonials[index],
        index,
        isPartial: false,
      });
    }

    if (hasPartial) {
      const partialIndex = (activeIndex + full) % testimonials.length;
      result.push({
        testimonial: testimonials[partialIndex],
        index: partialIndex,
        isPartial: true,
      });
    }

    return result;
  };

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const shouldBePaused = isPaused || isHovering;

    if (!shouldBePaused) {
      intervalRef.current = setInterval(nextTestimonial, 6000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, isHovering, testimonials.length, nextTestimonial]);

  const slideVariants = {
    enter: { opacity: 0, y: 15 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const renderTestimonial = (
    testimonial: TestimonialProps,
    index: number,
    isPartial: boolean
  ) => (
    <motion.div
      key={`${testimonial.author}-${index}`}
      initial='enter'
      animate='center'
      exit='exit'
      variants={slideVariants}
      transition={{ duration: 0.4 }}
      className={cn('w-full', isPartial && 'opacity-70')}
    >
      <Card
        className={cn(
          cnSmallPadding,
          cnFlexCol,
          'relative mb-3 flex justify-between bg-card text-center',
          'transition-colors duration-200 hover:bg-card/90',
          'h-auto',
          isPartial
            ? 'max-h-[90px] min-h-[90px] overflow-hidden'
            : 'min-h-[200px]'
        )}
      >
        {/* Header avec auteur et LinkedIn */}
        <div className='flex items-center justify-between border-b px-2 py-2'>
          <div className='flex items-center gap-2'>
            <Avatar
              className={cn(
                'relative aspect-square',
                'bg-primary text-primary-foreground',
                cnBorderRadiusFull,
                cnBorder,
                'h-8 min-h-[2rem] w-8 min-w-[2rem]',
                isSm ? 'sm:h-10 sm:w-10' : '',
                isMd ? 'md:h-10 md:w-10' : '',
                isLg ? 'lg:h-9 lg:w-9' : '',
                isXl ? 'xl:h-10 xl:w-10' : ''
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
              <div className='text-sm font-semibold leading-tight'>
                {capitalizeFirstLetterOfEachWord(testimonial.author)}
              </div>
              <div
                className={cn(
                  cnSmallText,
                  'text-xs leading-tight text-muted-foreground'
                )}
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
              variant='ghost'
              className='h-7 w-7 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20'
              asChild
            >
              <a
                href={testimonial.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Profil LinkedIn de ${testimonial.author}`}
              >
                <Linkedin className='h-4 w-4 text-[#0A66C2]' />
              </a>
            </Button>
          )}
        </div>

        {!isPartial ? (
          <CardContent className='flex-1 overflow-auto p-2 pt-3'>
            <p
              className={cn(
                cnSmallText,
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
          <div className='relative h-8 overflow-hidden'>
            <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/80'></div>
          </div>
        )}
      </Card>
    </motion.div>
  );

  return (
    <Card className={cn(className, 'flex h-full flex-col')}>
      <Header2Card
        title="Ce qu'ils disent de mon travail"
        className={cnPadding}
      />

      <CardContent className='relative flex-1 overflow-hidden p-0'>
        <div
          ref={containerRef}
          className='relative flex h-full flex-col'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div ref={contentRef} className='flex-1 overflow-hidden px-4'>
            <AnimatePresence mode='popLayout'>
              {getVisibleTestimonials().map(
                ({ testimonial, index, isPartial }) =>
                  renderTestimonial(testimonial, index, isPartial)
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-between p-3'>
            <Button
              variant='outline'
              size='icon'
              className='pointer-events-auto self-center rounded-full opacity-70 shadow-sm hover:opacity-100'
              onClick={prevTestimonial}
              aria-label='Témoignage précédent'
            >
              <ChevronUp className='h-4 w-4' />
            </Button>

            <Button
              variant='outline'
              size='icon'
              className='pointer-events-auto self-center rounded-full opacity-70 shadow-sm hover:opacity-100'
              onClick={nextTestimonial}
              aria-label='Témoignage suivant'
            >
              <ChevronDown className='h-4 w-4' />
            </Button>
          </div>

          {/* Bouton Play/Pause */}
          <div className='absolute bottom-3 right-3 z-10'>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 rounded-full opacity-70 shadow-sm hover:opacity-100'
              onClick={togglePlayPause}
              aria-label={
                isPaused ? 'Reprendre le défilement' : 'Mettre en pause'
              }
            >
              {isPaused || isHovering ? (
                <Play className='h-4 w-4' />
              ) : (
                <Pause className='h-4 w-4' />
              )}
            </Button>
          </div>

          <div className='absolute bottom-4 left-4 z-10 rounded-full bg-background/80 px-2 py-1 text-xs font-medium shadow-sm'>
            {activeIndex + 1} / {testimonials.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCarousel;
