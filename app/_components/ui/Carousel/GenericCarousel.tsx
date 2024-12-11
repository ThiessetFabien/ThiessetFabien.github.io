'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { cn } from '@/lib/utils';
import { usePrevNextButtons } from './ArrowButtonsCarousel';
import { useDotButton } from './DotButtonCarousel';
import { NextButton, PrevButton } from './ArrowButtonsCarousel';
import { DotButton } from './DotButtonCarousel';

/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */

/**
 * GenericCarousel component.
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode[]} props.items - An array of items to be displayed in the carousel.
 * @param {string} props.className - Additional class names to apply to the component.
 * @param {number} props.delay - The delay for the AutoScroll in milliseconds.
 * @returns {JSX.Element} The rendered GenericCarousel component.
 * @example
 * <GenericCarousel items={items} className="custom-class" delay={5000} />
 */

export const GenericCarousel: React.FC<{
  items: React.ReactNode[];
  className?: string;
  delay: number;
}> = ({ items, className, delay }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [AutoScroll({ delay, stopOnInteraction: false })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
    return;
  }, [emblaApi]);

  const arrowButtonStyle =
    'touch-manipulation cursor-pointer rounded-full appearance-none h-4 w-4 text-primary';
    'touch-manipulation cursor-pointer rounded-full appearance-none h-4 w-4 text-primary';

  return (
    <section
      className={cn('container overflow-hidden', className)}
      className={cn('container overflow-hidden', className)}
      ref={emblaRef}
    >
      <div className='flex'>
        {items.map((item, index) => (
          <div
            key={index}
            className='mx-2 flex flex-col items-center rounded-xl border p-2 shadow'
          >
          <div
            key={index}
            className='mx-2 flex flex-col items-center rounded-xl border p-2 shadow'
          >
            {item}
          </div>
        ))}
      </div>
      <div className='flex justify-between pt-4'>
        <div className='flex items-center space-x-4'>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={arrowButtonStyle}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={arrowButtonStyle}
          />
        </div>
        <div className='flex items-center justify-center'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={selectedIndex === index}
              className='m-0 flex h-4 w-4 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline'
              className='m-0 flex h-4 w-4 cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline'
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenericCarousel;
