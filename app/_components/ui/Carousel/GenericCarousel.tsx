/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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
import { useIsClient } from '@/hooks/useIsClient';
import type { GenericCarouselProps } from '@/types/GenericCarouselProps';

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

export const GenericCarousel: React.FC<GenericCarouselProps> = ({
  items,
  delay,
  fastRotate,
  dotButtons,
  arrowButtons,
}) => {
  const autoplay = useRef(
    AutoPlay({ delay: delay || 100, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplay.current]
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
    if (!emblaApi) return;

    if (!fastRotate) {
      emblaApi.reInit();
    } else {
      autoplay.current?.stop();

      const rotateCarousel = () => {
        setTimeout(() => {
          autoplay.current?.stop();
          emblaApi.scrollTo(0, true); // Return to the initial position
        }, 7000);
        setTimeout(() => {
          for (let i = 0; i < 3; i++) {
            setTimeout(
              () => {
                autoplay.current?.play(); // Start the autoplay
              },
              i * (1000 / 3)
            ); // 3 rotations in 1 second
          }
        }, 1000); // Wait for 5 seconds before starting the rotation
      };

      rotateCarousel();
      const interval = setInterval(rotateCarousel, 1000); // Repeat the process every 11 seconds (5s stop + 1s rotation + 5s stop)

      return () => clearInterval(interval);
    }
  }, [emblaApi, delay]);

  const isClient = useIsClient();

  return (
    isClient && (
      <div ref={emblaRef} className='h-full w-full'>
        <div className='flex'>
          {items?.map((item, index) => (
            <div key={index} className={cn('flex-none', cnFlexFullCenter)}>
              {item}
            </div>
          ))}
        </div>
        <div className={cn(cnFlexBetweenX, cnPaddingX, cnHiddenXs, 'h-full')}>
          <div className={cn(cnFlexCenterY, arrowButtons ? 'flex' : 'hidden')}>
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
          <div className={cn(cnFlexFullCenter, dotButtons ? 'flex' : 'hidden')}>
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
    )
  );
};

export default GenericCarousel;
