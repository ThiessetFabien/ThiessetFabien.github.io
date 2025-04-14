import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useCallback } from 'react';

import { ActionButton } from '@/src/components/ui/buttons/ActionButton';
import {
  cnPaddingBottom,
  cnSmallPaddingBottom,
} from '@/src/styles/boxModel.style';
import { cnFlexCenterY } from '@/src/styles/flex.style';
import { GenericCarouselProps } from '@/src/types/GenericCarouselProps';
import { cn } from '@lib/utils';

/**
 * A generic carousel component with animation and optional auto-rotation.
 *
 * @param {GenericCarouselProps} props - The component props.
 * @param {React.ReactNode[]} props.items - Array of React elements to display in the carousel.
 * @param {number} [props.delay=5000] - Time in milliseconds between automatic slides.
 * @param {boolean} [props.controls=false] - Whether to display navigation controls.
 * @param {string} [props.className] - Additional CSS classes for the carousel container.
 * @returns {JSX.Element | null} - The rendered carousel component.
 */
const GenericCarousel: React.FC<GenericCarouselProps> = ({
  items,
  delay = 5000,
  controls = false,
}: GenericCarouselProps): JSX.Element | null => {
  const [currentSlideIndex, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const goToNextSlide = useCallback(() => {
    setCurrent((current) => (current === items.length - 1 ? 0 : current + 1));
  }, [items.length]);

  const goToPreviousSlide = useCallback(() => {
    setCurrent((current) => (current === 0 ? items.length - 1 : current - 1));
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Space') {
        setIsPaused((prevState) => !prevState);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(goToNextSlide, delay);
    return () => clearTimeout(timer);
  }, [currentSlideIndex, delay, isPaused, goToNextSlide]);

  if (!items || items.length === 0) {
    return null;
  }

  const cnArrowButton =
    'h-16 bg-background/90 text-primary-foreground shadow-sm hover:bg-accent focus:ring-2 focus:ring-accent focus:ring-offset-2';

  return (
    <div
      className={cn('relative w-full flex-1', cnSmallPaddingBottom)}
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovering(false);
      }}
    >
      {controls && (
        <div className='absolute bottom-0 left-0 right-0 z-10 flex flex-1 items-center justify-center space-x-1.5'>
          {items.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                cnFlexCenterY,
                'cursor-pointer rounded-full transition-all',
                currentSlideIndex === index
                  ? 'h-2 w-6 bg-accent'
                  : 'h-2 w-2 bg-accent/40 hover:bg-accent/60'
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role='button'
              tabIndex={0}
              aria-label={`Aller à la diapositive ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  goToSlide(index);
                }
              }}
            />
          ))}
          <motion.div
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              cnFlexCenterY,
              'mr-1 cursor-pointer text-accent hover:text-primary/80'
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            role='button'
            tabIndex={0}
            aria-label={
              isPaused
                ? 'Démarrer la rotation automatique'
                : 'Mettre en pause la rotation automatique'
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsPaused(!isPaused);
              }
            }}
          >
            <ActionButton
              icon={isPaused ? 'Play' : 'Pause'}
              variant='outline'
              size='xs'
              className='rounded-full bg-accent p-0 text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-1'
            />
          </motion.div>
        </div>
      )}

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex h-full flex-col justify-between'
        >
          <div
            className={cn(
              'scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent flex-grow',
              cnPaddingBottom
            )}
          >
            {items[currentSlideIndex]}
          </div>
        </motion.div>
      </AnimatePresence>

      {controls && (
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.div
                className='absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ActionButton
                  icon='ChevronLeft'
                  onClick={goToPreviousSlide}
                  variant='outline'
                  size='icon'
                  aria-label='Diapositive précédente'
                  className={cn(cnArrowButton, 'rounded-l-none rounded-r-full')}
                />
              </motion.div>

              <motion.div
                className='absolute right-0 top-1/2 z-10 flex -translate-y-1/2 items-center'
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ActionButton
                  icon='ChevronRight'
                  onClick={goToNextSlide}
                  variant='outline'
                  size='icon'
                  aria-label='Diapositive suivante'
                  className={cn(cnArrowButton, 'rounded-l-full rounded-r-none')}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default GenericCarousel;
