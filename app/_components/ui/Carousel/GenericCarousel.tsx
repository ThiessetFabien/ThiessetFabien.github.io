'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { cn } from '@/lib/utils';
import { usePrevNextButtons } from './Buttons/ArrowButtonsCarousel';
import { useDotButton } from './Buttons/DotButtonCarousel';
import { NextButton, PrevButton } from './Buttons/ArrowButtonsCarousel';
import { DotButton } from './Buttons/DotButtonCarousel';
import { sizeIcon } from '@/styles/sizeStyles';
import {
  arrowButtonStyle,
  cnMarginBottom,
  cnMarginY,
  cnSmallMarginX,
  cnSmallPadding,
  cnSpaceX,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import {
  cnFlexCol,
  cnFlexFullCenter,
  cnFlexBetweenX,
  cnFlexCenterY,
} from '@/styles/flexStyles';
import { cnBorder } from '@/styles/borderStyles';

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
  items?: React.ReactNode[];
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

  return (
    <section
      className={cn('container overflow-hidden', cnSpaceY, className)}
      ref={emblaRef}
    >
      <div className={cn('flex')}>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              className={cn(
                cnFlexCol,
                cnSmallPadding,
                cnFlexFullCenter,
                cnBorder,
                cnSmallMarginX
              )}
            >
              {item}
            </div>
          ))}
      </div>
      <div className={cn(cnFlexBetweenX, 'h-full')}>
        <div className={cn(cnFlexCenterY, cnSpaceX)}>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={cn(arrowButtonStyle, sizeIcon, 'text-primary')}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={cn(arrowButtonStyle, sizeIcon, 'text-primary')}
          />
        </div>
        <div className={cnFlexFullCenter}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={selectedIndex === index}
              className={cn(
                sizeIcon,
                'm-0 flex cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 no-underline'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenericCarousel;
