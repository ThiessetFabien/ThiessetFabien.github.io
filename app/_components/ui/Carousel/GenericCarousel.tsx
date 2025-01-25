/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import React, { use, useEffect, useRef, useState } from 'react';
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
  cnPaddingBottom,
} from '@/styles/boxModelStyles';
import { cnFlexFullCenter, cnFlexCenterY } from '@/styles/flexStyles';
import { useIsClient } from '@/hooks/useIsClient';
import type { GenericCarouselProps } from '@/types/GenericCarouselProps';
import type { CardProps } from '@/types/CardProps';
import { Toggle } from '@/lib/components/ui/toggle';
import { Pause, PauseCircle, Play, PlayCircle } from 'lucide-react';

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
> = ({ items, delay, className }) => {
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

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    if (isPlaying) {
      autoplay.current.play();
    } else {
      autoplay.current.stop();
    }
  }, [emblaApi, isPlaying]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const isClient = useIsClient();

  return (
    isClient && (
      <div
        ref={emblaRef}
        className={cn(className, 'min-h-full min-w-full max-w-full')}
        aria-roledescription='carousel'
        aria-label='Testimonials'
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
              role='group'
              aria-roledescription='slide'
              aria-label={`Slide ${index + 1} of ${items.length}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          className={cn(
            cnFlexCenterY,
            'justify-between',
            cnPaddingX,
            cnPaddingBottom,
            'relative z-0 h-full w-full'
          )}
        >
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={cn(
              manipulationStyle,
              'absolute bottom-36 left-0 z-50 px-0'
            )}
            aria-label='Previous slide'
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={cn(
              manipulationStyle,
              'absolute bottom-36 right-0 z-50 px-0'
            )}
            aria-label='Next slide'
          />
          <div className={cn(cnFlexCenterY)}>
            {scrollSnaps?.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                isSelected={selectedIndex === index}
                className={cn(
                  manipulationStyle,
                  'm-0 h-2 w-auto rounded-full border-0 p-0'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={selectedIndex === index}
              />
            ))}
          </div>
          <div className={cn(cnFlexFullCenter)}>
            <Toggle
              variant='outline'
              size='sm'
              onClick={handlePlayPause}
              className={cn('relative')}
              data-state={isPlaying ? 'on' : 'off'}
              aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
            >
              {isPlaying ? (
                <Pause
                  className={cn('scale-100 transition-all dark:scale-0')}
                />
              ) : (
                <Play
                  className={cn(
                    'absolute scale-100 transition-all dark:scale-0'
                  )}
                />
              )}
              <span className='sr-only'>Toggle play pause</span>{' '}
            </Toggle>
          </div>
        </div>
      </div>
    )
  );
};

export default GenericCarousel;
