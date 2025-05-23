/**
 * @file GenericCarousel.tsx
 * @description This file exports a generic carousel component that can be used for different types of carousels.
 */
import { EmblaCarouselType } from 'embla-carousel';
import AutoPlay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { GenericCarouselProps } from '@/src/types/GenericCarouselProps';
import { useIsClient } from '@hooks/useIsClient.hook';
import { Progress } from '@lib/components/ui/progress';
import { Toggle } from '@lib/components/ui/toggle';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import {
  cnManipulation,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
  cnSmallSpaceX,
  cnSmallSpaceY,
} from '@styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol, cnFlexFullCenter } from '@styles/flex.style';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@ui/buttons/ArrowsCarouselsButtons';
import {
  SelectSnapDisplay,
  useSelectedSnapDisplay,
} from '@ui/selects/SelectSnapDisplay';

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
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const autoplay = useRef(
    AutoPlay({ delay: delay || 100, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplay.current]
  );

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, []);

  const totalItems = items?.length || 0;
  const progressValue = (currentSlide / (totalItems - 1)) * 100;

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
          'min-h-full min-w-full max-w-full flex-auto',
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
            cnSmallGap,
            'h-full w-full'
          )}
        >
          <div className={cn(cnSmallSpaceX, 'flex flex-none')}>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className={cn(cnManipulation, 'px-0')}
                aria-label='Previous slide'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className={cn(cnManipulation, 'px-0')}
                aria-label='Next slide'
              />
            </motion.div>
          </div>
          <Progress
            value={progressValue}
            className={'max-w-full'}
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <SelectSnapDisplay
            selectedSnap={selectedSnap}
            snapCount={snapCount}
            className='flex-1'
          />
          <div className={cn(cnSmallSpaceX, cnFlexFullCenter)}>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
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
                    className={
                      isPlaying
                        ? 'rotate-0 scale-100 transition-all duration-200'
                        : 'rotate-90 scale-0 transition-all duration-200'
                    }
                  />
                ) : (
                  <Play
                    className={
                      isPlaying
                        ? '-rotate-90 scale-0 transition-all duration-200'
                        : 'rotate-0 scale-100 transition-all duration-200'
                    }
                  />
                )}
                <span className='sr-only'>Toggle play pause</span>{' '}
              </Toggle>
            </motion.div>
          </div>
        </div>
      </div>
    )
  );
};

export default GenericCarousel;
