/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import AutoPlay from 'embla-carousel-autoplay';
import type { EmblaOptionsType } from 'embla-carousel';
import { cn } from '@/lib/utils';
import { usePrevNextButtons } from './Buttons/ArrowButtonsCarousel';
import { useDotButton } from './Buttons/DotButtonCarousel';
import { NextButton, PrevButton } from './Buttons/ArrowButtonsCarousel';
import { DotButton } from './Buttons/DotButtonCarousel';
import {
  manipulationStyle,
  cnPaddingX,
  cnSmallMarginRight,
} from '@/styles/boxModelStyles';
import {
  cnFlexFullCenter,
  cnFlexBetweenX,
  cnFlexCenterY,
} from '@/styles/flexStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';

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
  options?: EmblaOptionsType;
  delay?: number;
}> = ({ items, delay }) => {
  const autoplayPlugin = [AutoPlay({ delay, stopOnInteraction: false })];
  const autoscrollPlugin = [AutoScroll({ stopOnInteraction: false })];

  const plugin = () => {
    if (delay !== undefined) {
      return autoplayPlugin;
    }
    return autoscrollPlugin;
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    plugin()
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
    <div ref={emblaRef}>
      <div className='flex'>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex-none',
                delay !== undefined ? 'w-full' : 'max-w-full',
                cnFlexFullCenter
              )}
            >
              {item}
            </div>
          ))}
      </div>
      <div
        className={cn(
          cnFlexBetweenX,
          cnPaddingX,
          cnHiddenXs,
          'h-full',
          delay !== undefined ? '' : 'hidden'
        )}
      >
        <div className={cn(cnFlexCenterY, delay !== undefined ? '' : 'hidden')}>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={cn(manipulationStyle, cnSmallMarginRight, 'px-0')}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={cn(manipulationStyle, 'px-0')}
          />
        </div>
        <div
          className={cn(cnFlexFullCenter, delay !== undefined ? '' : 'hidden')}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={selectedIndex === index}
              className={cn(
                manipulationStyle,
                'm-0 w-auto rounded-full border-0 p-0'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericCarousel;
