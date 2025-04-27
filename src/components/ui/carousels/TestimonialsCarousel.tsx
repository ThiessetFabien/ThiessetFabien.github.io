import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import { Button } from '@lib/components/ui/button';
import { Card, CardContent } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { TestimonialImage } from '@src/components/ui/images/TestimonalImage';
import { cnBorderRadiusFull, cnBorder } from '@src/styles/border.style';
import {
  cnMarginBottom,
  cnPadding,
  cnPaddingTop,
  cnPaddingX,
  cnSmallGap,
  cnSmallPadding,
} from '@src/styles/boxModel.style';
import {
  cnFlexBetweenX,
  cnFlexBetweenY,
  cnFlexCenterY,
  cnFlexCol,
} from '@src/styles/flex.style';
import { cnParagraph, cnSmallText } from '@src/styles/font.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

import { ArrowCarouselButton } from '../buttons/ArrowCarouselButton';
import { Header2Card } from '../cards/layouts.cards/Header2Card';
import { IconLoader } from '../icons/IconLoader';
import { LinkedinIcon } from '../svg/Linkedin';

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

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && containerRef.current) {
        const headerHeight = 70;
        const controlsHeight = 50;
        const safetyMargin = 20;
        const parentHeight =
          containerRef.current.parentElement?.clientHeight || 0;

        const availableHeight = Math.max(
          parentHeight - headerHeight - controlsHeight - safetyMargin,
          200
        );

        setContainerHeight(availableHeight);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  const determineVisibleCount = useCallback(() => {
    const avgTestimonialHeight = 210;
    const partialTestimonialHeight = 90;

    const maxFullTestimonials = Math.floor(
      containerHeight / avgTestimonialHeight
    );
    const fullTestimonialsCount = Math.max(1, maxFullTestimonials);

    const remainingHeight =
      containerHeight - fullTestimonialsCount * avgTestimonialHeight;
    const hasPartialSpace = remainingHeight >= partialTestimonialHeight;

    return {
      full: fullTestimonialsCount,
      hasPartial: hasPartialSpace,
    };
  }, [containerHeight]);

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

  const prevTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const togglePlayPause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

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

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      const hasFocus = carouselRef.current?.contains(document.activeElement);

      if (!hasFocus && !isHovering) return;

      switch (e.key) {
        case 'ArrowUp':
          prevTestimonial();
          e.preventDefault();
          break;
        case 'ArrowDown':
          nextTestimonial();
          e.preventDefault();
          break;
        case ' ':
        case 'p':
        case 'P':
          togglePlayPause();
          e.preventDefault();
          break;
        case 'Home':
          setActiveIndex(0);
          e.preventDefault();
          break;
        case 'End':
          setActiveIndex(testimonials.length - 1);
          e.preventDefault();
          break;
        case 'PageUp':
          setActiveIndex((prev) =>
            Math.max(0, prev - determineVisibleCount().full)
          );
          e.preventDefault();
          break;
        case 'PageDown':
          setActiveIndex((prev) =>
            Math.min(
              testimonials.length - 1,
              prev + determineVisibleCount().full
            )
          );
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    return () =>
      window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [
    isHovering,
    nextTestimonial,
    prevTestimonial,
    testimonials.length,
    determineVisibleCount,
    togglePlayPause,
  ]);

  const slideVariants = {
    enter: { opacity: 0, y: 15 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const cnArrowStyles =
    'pointer-events-auto self-center rounded-full opacity-70 shadow-sm hover:opacity-100 focus:ring-2 focus:ring-primary focus:ring-offset-2';

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
          cnMarginBottom,
          cnFlexBetweenY,
          'relative rounded-none bg-card text-center',
          'transition-colors duration-200 hover:bg-card/90',
          'h-auto',
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
              <div className={cn(cnSmallText, 'font-semibold leading-tight')}>
                {capitalizeFirstLetterOfEachWord(testimonial.author)}
              </div>
              <div className='font-sans text-xs leading-tight text-muted-foreground'>
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
          <div className='relative h-8 overflow-hidden'>
            <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/80'></div>
          </div>
        )}
      </Card>
    </motion.div>
  );

  return (
    <Card className={cn(className, cnFlexCol, 'h-fulll')}>
      <Header2Card
        title="Ce qu'ils disent de mon travail"
        className={cnPadding}
      />

      <CardContent className='relative flex-1 overflow-hidden p-0'>
        <div
          ref={containerRef}
          className={cn(cnFlexCol, 'relative h-full')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          role='region'
          aria-label='Carousel de témoignages'
          aria-roledescription='carousel'
          aria-live='polite'
        >
          <div
            ref={contentRef}
            className={cn(cnPaddingX, 'flex-1 overflow-hidden')}
          >
            <AnimatePresence mode='popLayout'>
              {getVisibleTestimonials().map(
                ({ testimonial, index, isPartial }) =>
                  renderTestimonial(testimonial, index, isPartial)
              )}
            </AnimatePresence>
          </div>

          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              'flex items-center justify-between px-2'
            )}
          >
            <ArrowCarouselButton
              onClick={prevTestimonial}
              aria-label='Témoignage précédent'
              icon='ChevronUp'
              className={cn(cnArrowStyles, 'bg-background/80 backdrop-blur-sm')}
            />
            <ArrowCarouselButton
              onClick={nextTestimonial}
              aria-label='Témoignage suivant'
              icon='ChevronDown'
              className={cn(cnArrowStyles, 'bg-background/80 backdrop-blur-sm')}
            />

            <div
              className={cn(
                cnSmallPadding,
                'absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-border/40 bg-background/60 backdrop-blur-sm'
              )}
            >
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='rounded-full'
                  onClick={() => setActiveIndex(0)}
                  aria-label='Premier témoignage'
                >
                  <span className='text-xs font-medium'>Revenir au début</span>
                </Button>

                <span className='text-xs font-medium'>
                  {activeIndex + 1} / {testimonials.length}
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <div className='hidden items-center gap-1.5 text-[10px] opacity-70 sm:flex'>
                  <div className='flex gap-0.5'>
                    <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
                      ↑
                    </kbd>
                    <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
                      ↓
                    </kbd>
                  </div>
                  <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
                    P
                  </kbd>
                </div>

                <Button
                  variant='outline'
                  size='icon'
                  className='rounded-full'
                  onClick={togglePlayPause}
                  aria-label={
                    isPaused ? 'Reprendre le défilement' : 'Mettre en pause'
                  }
                >
                  {isPaused || isHovering ? (
                    <IconLoader icon='Play' />
                  ) : (
                    <IconLoader icon='Pause' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCarousel;
