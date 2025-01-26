/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { usePrevNextButtons } from './Buttons/ArrowButtonsCarousel';
import { useDotButton } from './Buttons/DotButtonCarousel';
import { NextButton, PrevButton } from './Buttons/ArrowButtonsCarousel';
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay,
} from '@/ui/Carousel/Buttons/SelectedSnapDisplay';
import { DotButton } from './Buttons/DotButtonCarousel';
import {
  manipulationStyle,
  cnPaddingX,
  cnPaddingBottom,
  cnMarginLeft,
  cnGap,
  cnSmallSpaceX,
  cnSpaceY,
  cnSmallSpaceY,
  cnSmallPaddingX,
  cnSmallMarginX,
} from '@/styles/boxModelStyles';
import {
  cnFlexFullCenter,
  cnFlexCenterY,
  cnFlexCol,
} from '@/styles/flexStyles';
import { useIsClient } from '@/hooks/useIsClient';
import type { GenericCarouselProps } from '@/types/GenericCarouselProps';
import type { CardProps } from '@/types/CardProps';
import { Toggle } from '@/lib/components/ui/toggle';
import { Pause, Play } from 'lucide-react';
import { cnParagraph, cnSmallText } from '@/styles/fontStyles';
import { EmblaCarouselType } from 'embla-carousel';
import { Progress } from '@/lib/components/ui/progress';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const autoplay = useRef(
    AutoPlay({ delay: delay || 100, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplay.current]
  );

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll);

    if (isPlaying) {
      autoplay.current.play();
    } else {
      autoplay.current.stop();
    }
  }, [emblaApi, isPlaying, onScroll]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  const isClient = useIsClient();

  return (
    isClient && (
      <div
        ref={emblaRef}
        className={cn(
          className,
          'min-h-full min-w-full max-w-full',
          cnSmallSpaceY
        )}
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
                'xl:min-w-[calc(100%/3)]',
                cnFlexCol,
                'justify-between'
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
            cnPaddingX,
            cnPaddingBottom,
            'justify-between',
            'h-full w-full'
          )}
        >
          <div className={cn(cnSmallSpaceX, 'flex-none')}>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className={cn(manipulationStyle, 'px-0')}
              aria-label='Previous slide'
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className={cn(manipulationStyle, 'px-0')}
              aria-label='Next slide'
            />
          </div>
          <Progress
            value={scrollProgress}
            className={cn(cnSmallMarginX, 'flex-0')}
            aria-valuenow={scrollProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div
            className={cn(
              cnSmallSpaceX,
              cnFlexFullCenter,
              'flex-none flex-shrink-0'
            )}
          >
            <SelectedSnapDisplay
              selectedSnap={selectedSnap}
              snapCount={snapCount}
              className='flex-none'
            />
            <Toggle
              variant='outline'
              size='sm'
              onClick={handlePlayPause}
              className={cn('relative', 'flex-none')}
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
