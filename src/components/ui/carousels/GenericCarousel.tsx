import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { cn } from '@lib/utils';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from '@src/lib/components/ui/carousel';
import { cnBorderRadiusMd } from '@src/styles/border.style';
import { cnSmallPaddingLeft, cnSmallSpaceX } from '@src/styles/boxModel.style';
import {
  cnFlexCenterY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@src/styles/flex.style';
import {
  useIsLg,
  useIsXl,
  useIsMd,
  useIsSm,
} from '@src/styles/mediaQueries.style';
import { GenericCarouselProps } from '@src/types/GenericCarouselProps';

/**
 * GenericCarousel component displays items in a carousel with automatic rotation.
 *
 * @component
 * @param {GenericCarouselProps} props - Component props
 * @returns {JSX.Element} The generic carousel component
 */
const GenericCarousel: React.FC<GenericCarouselProps> = ({
  items,
  delay = 5000,
  controls = false,
  className,
  containerHeight,
  showPartialNext = false,
  onSlideChange,
  autoplayOptions,
  pauseOnInteraction = false,
  pauseOnHover = true,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplayInstance, setAutoplayInstance] = useState<ReturnType<
    typeof Autoplay
  > | null>(null);

  const isSm = useIsSm();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const onSelectHandler = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }
    };

    onSelectHandler();

    api.on('select', onSelectHandler);

    const plugins = api.plugins();
    if (plugins && Array.isArray(plugins) && plugins.length > 0) {
      const autoplay = plugins.find((plugin) => plugin.name === 'Autoplay') as
        | ReturnType<typeof Autoplay>
        | undefined;
      if (autoplay) {
        setAutoplayInstance(autoplay);
      }
    }

    return () => {
      api.off('select', onSelectHandler);
    };
  }, [api, onSlideChange]);

  useEffect(() => {
    if (!autoplayInstance) return;

    if (isPaused) {
      autoplayInstance.stop();
    } else {
      autoplayInstance.play();
    }
  }, [isPaused, autoplayInstance]);

  if (!items || items.length === 0) {
    return null;
  }

  const defaultAutoplayOptions: AutoplayOptionsType = {
    delay,
    stopOnInteraction: pauseOnInteraction,
    stopOnMouseEnter: pauseOnHover,
    rootNode: (emblaRoot) => emblaRoot,
  };

  const mergedAutoplayOptions: AutoplayOptionsType = {
    ...defaultAutoplayOptions,
    ...autoplayOptions,
  };

  return (
    <Carousel
      opts={{
        align: showPartialNext ? 'start' : 'center',
        loop: true,
        containScroll: showPartialNext ? 'trimSnaps' : 'keepSnaps',
      }}
      setApi={setApi}
      plugins={[Autoplay(mergedAutoplayOptions)]}
      orientation='horizontal'
      className={cn(
        className,
        'relative flex w-full',
        containerHeight || 'min-h-[200px]'
      )}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <CarouselContent className={showPartialNext ? '-ml-2 md:-ml-4' : ''}>
        {items.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              showPartialNext
                ? cn(
                    cnSmallPaddingLeft,
                    'basis-[90%]',
                    'sm:basis-[90%] md:basis-[85%] lg:basis-[90%] xl:basis-[95%]'
                  )
                : '',
              'transition-opacity duration-300'
            )}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className={cn(cnFlexCol, 'h-full', cnBorderRadiusMd)}
              >
                {item}
              </motion.div>
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {controls && (
        <div
          className={cn(
            cnFlexFullCenter,
            cnSmallSpaceX,
            'absolute left-0 right-0 top-0 z-10 flex-row',
            'rounded-full backdrop-blur-sm'
          )}
        >
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                cnFlexCenterY,
                'cursor-pointer rounded-full transition-all',
                current === index
                  ? cn(
                      'bg-primary',
                      'h-1.5 w-4',
                      isSm ? 'sm:h-1.5 sm:w-5' : '',
                      isMd ? 'md:h-2 md:w-6' : '',
                      isLg ? 'lg:h-1.5 lg:w-5' : '',
                      isXl ? 'xl:h-2 xl:w-6' : ''
                    )
                  : cn(
                      'bg-muted hover:bg-muted-foreground',
                      'h-1.5 w-1.5',
                      isSm ? 'sm:h-1.5 sm:w-1.5' : '',
                      isMd ? 'md:h-2 md:w-2' : '',
                      isLg ? 'lg:h-1.5 lg:w-1.5' : '',
                      isXl ? 'xl:h-2 xl:w-2' : ''
                    )
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              role='button'
              tabIndex={0}
              aria-label={`Aller à la diapositive ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  api?.scrollTo(index);
                }
              }}
            />
          ))}
          <motion.div
            onClick={() => setIsPaused(!isPaused)}
            className={cn(
              cnFlexCenterY,
              'ml-1 cursor-pointer text-accent hover:text-primary/80',
              'group relative'
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
            <span className='pointer-events-none absolute -top-8 left-1/2 w-max -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
              {isPaused ? 'Reprendre' : 'Pause'}
            </span>
            <ActionButton
              icon={isPaused ? 'Play' : 'Pause'}
              variant='outline'
              size='xs'
              className={cn(
                'rounded-full bg-accent p-0 text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-1',
                'h-5 w-5',
                isSm ? 'sm:h-5 sm:w-5' : '',
                isMd ? 'md:h-6 md:w-6' : '',
                isLg ? 'lg:h-5 lg:w-5' : '',
                isXl ? 'xl:h-6 xl:w-6' : ''
              )}
            />
          </motion.div>
        </div>
      )}

      {controls && isHovering && (
        <>
          <CarouselPrevious
            variant='outline'
            aria-label='Diapositive précédente'
            className={cn(
              'absolute left-1 top-1/2 aspect-square -translate-y-1/2 opacity-70 hover:opacity-100',
              'h-7 w-7',
              isSm ? 'sm:left-2 sm:h-8 sm:w-8' : '',
              isMd ? 'md:left-4 md:h-9 md:w-9' : '',
              isLg ? 'lg:left-3 lg:h-8 lg:w-8' : '',
              isXl ? 'xl:left-4 xl:h-9 xl:w-9' : ''
            )}
          />
          <CarouselNext
            variant='outline'
            aria-label='Diapositive suivante'
            className={cn(
              'absolute right-1 top-1/2 aspect-square -translate-y-1/2 opacity-70 hover:opacity-100',
              'h-7 w-7',
              isSm ? 'sm:right-2 sm:h-8 sm:w-8' : '',
              isMd ? 'md:right-4 md:h-9 md:w-9' : '',
              isLg ? 'lg:right-3 lg:h-8 lg:w-8' : '',
              isXl ? 'xl:right-4 xl:h-9 xl:w-9' : ''
            )}
          />
        </>
      )}
    </Carousel>
  );
};

export default GenericCarousel;
