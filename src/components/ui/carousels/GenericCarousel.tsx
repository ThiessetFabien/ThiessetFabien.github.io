import AutoScroll from 'embla-carousel-auto-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Progress } from '@lib/components/ui/progress';
import { cn } from '@lib/utils';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  type CarouselApi,
} from '@src/lib/components/ui/carousel';
import { cnBorderRadiusMd } from '@src/styles/border.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';
import {
  useIsLg,
  useIsXl,
  useIsMd,
  useIsSm,
} from '@src/styles/mediaQueries.style';
import { GenericCarouselProps } from '@src/types/GenericCarouselProps';

interface AutoplayPlugin {
  name: string;
  play: () => void;
  stop: () => void;
}

interface CarouselPlugin {
  name: string;
  [key: string]: unknown;
}

/**
 * A generic vertical carousel component with advanced features.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode[]} props.items - Array of items to display in the carousel
 * @param {boolean} [props.controls=false] - Whether to show navigation controls
 * @param {string} [props.className] - Additional CSS class names for the carousel container
 * @param {string} [props.containerHeight] - Custom height for the carousel container (defaults to 'h-[300px]')
 * @param {Function} [props.onSlideChange] - Callback function triggered when the active slide changes, receives the new index
 * @param {Object} [props.autoplayOptions] - Custom options for the AutoScroll plugin
 * @param {boolean} [props.pauseOnHover=true] - Whether to pause autoplay when hovering over the carousel
 * @param {boolean} [props.showProgressBar=false] - Whether to show a vertical progress bar indicator
 *
 * @returns {React.ReactElement|null} The carousel component or null if no items provided
 *
 * @example
 * <GenericCarousel
 *   items={testimonials}
 *   controls={true}
 *   containerHeight="h-[400px]"
 *   showProgressBar={true}
 *   onSlideChange={(index) => console.log(`Slide changed to ${index}`)}
 * />
 */
const GenericCarousel: React.FC<GenericCarouselProps> = ({
  items,
  controls = false,
  className,
  containerHeight,
  onSlideChange,
  autoplayOptions,
  pauseOnHover = true,
  showProgressBar = false,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplayInstance, setAutoplayInstance] =
    useState<AutoplayPlugin | null>(null);

  const isSm = useIsSm();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelectHandler = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }
    };

    onSelectHandler();

    api.reInit();

    api.on('select', onSelectHandler);
    api.on('reInit', onSelectHandler);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        api.scrollPrev();
      } else if (event.key === 'ArrowDown') {
        api.scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    const plugins = api.plugins();
    if (plugins && Array.isArray(plugins) && plugins.length > 0) {
      const autoplayPlugin = plugins.find(
        (plugin: CarouselPlugin) =>
          plugin && typeof plugin === 'object' && plugin.name === 'Autoplay'
      );
      if (autoplayPlugin) {
        setAutoplayInstance(autoplayPlugin as AutoplayPlugin);
        if (!isPaused && !isHovering) {
          setTimeout(() => {
            autoplayPlugin.play();
          }, 100);
        }
      }
    }

    return () => {
      api.off('select', onSelectHandler);
      api.off('reInit', onSelectHandler);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [api, onSlideChange, isPaused, isHovering]);

  useEffect(() => {
    if (!autoplayInstance) return;

    if (isPaused) {
      autoplayInstance.stop();
    } else {
      autoplayInstance.play();
    }

    if (isHovering && pauseOnHover) {
      autoplayInstance.stop();
    } else if (!isPaused && !isHovering) {
      autoplayInstance.play();
    }
  }, [isPaused, autoplayInstance, isHovering, pauseOnHover]);

  if (!items || items.length === 0) {
    return null;
  }

  const defaultAutoScrollOptions = {
    speed: 0.5,
    direction: 'forward' as 'forward' | 'backward',
    stopOnInteraction: true,
    stopOnMouseEnter: pauseOnHover,
    startOnInit: true,
  };

  const mergedAutoScrollOptions = {
    ...defaultAutoScrollOptions,
    ...autoplayOptions,
  };

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        dragFree: true,
        watchDrag: true,
      }}
      setApi={setApi}
      plugins={[AutoScroll(mergedAutoScrollOptions)]}
      orientation='vertical'
      className={cn(
        className,
        'relative w-full',
        containerHeight || 'h-[300px]',
        'max-h-[calc(85dvh-5rem)]'
      )}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <CarouselContent className={cn('-mt-1', containerHeight || 'h-[300px]')}>
        {items.map((item: React.ReactNode, index: number) => (
          <CarouselItem key={index} className='relative pt-1 md:basis-1/2'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className={cn(cnFlexCol, 'h-full', cnBorderRadiusMd, 'p-1')}
              >
                {item}
              </motion.div>
            </AnimatePresence>

            {showProgressBar && index === current && (
              <div className='absolute bottom-0 right-0 top-0 h-full w-1 overflow-hidden'>
                <Progress
                  value={((current + 1) / count) * 100}
                  className='h-full w-1 origin-center rotate-180 rounded-none bg-primary/10'
                  orientation='vertical'
                />
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {controls && (
        <div className='absolute bottom-4 right-2 z-10'>
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
            size='icon'
            aria-label='Témoignage précédent'
            className={cn(
              'absolute left-1/2 top-2 aspect-square -translate-x-1/2 rotate-90 opacity-70 hover:opacity-100'
            )}
          />
          <CarouselNext
            variant='outline'
            size='icon'
            aria-label='Témoignage suivant'
            className={cn(
              'absolute bottom-2 left-1/2 aspect-square -translate-x-1/2 rotate-90 opacity-70 hover:opacity-100'
            )}
          />
        </>
      )}
    </Carousel>
  );
};

export default GenericCarousel;
