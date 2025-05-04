import { AnimatePresence } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

import { Card, CardContent } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { useTestimonialsCarousel } from '@src/hooks/useTestimonialsCarousel';
import { cnPadding } from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import type { TestimonialProps } from '@src/types/TestimonialProps';

import { ArrowCarouselButton } from '../buttons/ArrowCarouselButton';
import { Header2Card } from '../cards/layouts.cards/Header2Card';

import { CarouselControls } from './CarouselControls';
import { TestimonialItem } from './TestimonialItem';

export const TestimonialsCarousel: React.FC<{
  testimonials: TestimonialProps[];
  className?: string;
}> = ({ testimonials, className }) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mise à jour de la hauteur du conteneur
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

  const {
    activeIndex,
    isPaused,
    isHovering,
    nextTestimonial,
    prevTestimonial,
    togglePlayPause,
    goToFirst,
    getVisibleTestimonials,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyboardNavigation,
  } = useTestimonialsCarousel(testimonials, containerHeight);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const hasFocus = carouselRef.current?.contains(document.activeElement);
      if (!hasFocus && !isHovering) return;
      handleKeyboardNavigation(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovering, handleKeyboardNavigation]);

  // Styles pour les boutons de navigation
  const cnArrowStyles =
    'pointer-events-auto self-center rounded-full opacity-70 shadow-sm hover:opacity-100 focus:ring-2 focus:ring-primary focus:ring-offset-2';

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role='region'
          aria-label='Carousel de témoignages'
          aria-roledescription='carousel'
          aria-live='polite'
        >
          <div
            ref={contentRef}
            className={cn(cnPadding, 'flex-1 overflow-hidden')}
          >
            <AnimatePresence mode='popLayout'>
              {getVisibleTestimonials().map(
                ({ testimonial, index, isPartial }) => (
                  <TestimonialItem
                    key={`testimonial-${index}`}
                    testimonial={testimonial}
                    index={index}
                    isPartial={isPartial}
                  />
                )
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

            <CarouselControls
              activeIndex={activeIndex}
              totalItems={testimonials.length}
              isPaused={isPaused}
              isHovering={isHovering}
              onTogglePlayPause={togglePlayPause}
              onGoToFirst={goToFirst}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCarousel;
