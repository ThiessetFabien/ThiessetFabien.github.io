/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
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
import { CardProps } from '@/types/CardProps.jsx';

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

export const GenericCarousel: React.FC<
  GenericCarouselProps & { className?: CardProps['className'] }
> = ({ items, delay, fastRotate, idStart, controls, className }) => {
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
          autoplay.current?.play();
          emblaApi.scrollTo(idStart || 0, true);
        }, 7000);
        setTimeout(() => {
          for (let i = 0; i < 3; i++) {
            setTimeout(
              () => {
                autoplay.current?.stop();
                emblaApi.scrollTo(idStart || 0, true);
              },
              i * (600 / 3)
            );
          }
        }, 600);
      };

      rotateCarousel();
      const interval = setInterval(rotateCarousel, 8000);

      return () => clearInterval(interval);
    }
  }, [emblaApi, delay, fastRotate, idStart]);

  const isClient = useIsClient();

  return (
    isClient && (
      <div
        ref={emblaRef}
        className={cn(className, 'min-h-full min-w-full max-w-full')}
      >
        <div className='flex'>
          {items?.map((item, index) => (
            <div
              key={index}
              className={cn(
                'max-w-fit flex-none',
                'min-w-[calc(100%/2)]',
                'xs:min-w-[calc(100%/3)]',
                'sm:min-w-[calc(100%/6)]',
                'lg:min-w-[calc(100%/2)]',
                'xl:min-w-[calc(100%/3)]'
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          className={cn(
            cnFlexCenterY,
            controls === 'both' ? 'justify-between' : 'justify-end',
            cnPaddingX,
            cnHiddenXs,
            'h-full w-full',
            controls === 'none' ? 'hidden' : 'flex'
          )}
        >
          <div
            className={cn(
              cnFlexCenterY,
              controls === 'dots' || controls === 'both' ? 'flex' : 'hidden'
            )}
          >
            {scrollSnaps?.map((_, index) => (
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
          <div
            className={cn(
              cnFlexFullCenter,
              controls === 'arrows' || controls === 'both' ? 'flex' : 'hidden'
            )}
          >
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
        </div>
      </div>
    )
  );
};

export default GenericCarousel;
