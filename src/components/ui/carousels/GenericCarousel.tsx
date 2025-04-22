import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
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

/**
 * GenericCarousel component displays items in a carousel with automatic rotation.
 *
 * @component
 * @param {GenericCarouselProps} props - Component props
 * @returns {JSX.Element} The generic carousel component
 */

// Interface pour typer correctement les plugins
interface AutoplayPlugin {
  name: string;
  play: () => void;
  stop: () => void;
}

// Interface pour typer le plugin renvoyé par l'API du carousel
interface CarouselPlugin {
  name: string;
  [key: string]: unknown;
}

const GenericCarousel: React.FC<GenericCarouselProps> = ({
  items,
  delay = 5000,
  controls = false,
  className,
  containerHeight,
  showPartialNext = false,
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

    // Initialisation du décompte et de l'index actuel
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    // Handler pour les changements de slide
    const onSelectHandler = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);

      if (onSlideChange) {
        onSlideChange(newIndex);
      }
    };

    // Appliquer immédiatement l'index actuel
    onSelectHandler();

    // Réinitialisation forcée pour s'assurer que le carousel est correctement configuré
    api.reInit();

    // Écouter les événements
    api.on('select', onSelectHandler);
    api.on('reInit', onSelectHandler);

    // Configuration des touches de navigation pour l'orientation verticale
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        api.scrollPrev();
      } else if (event.key === 'ArrowDown') {
        api.scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    // Récupération et configuration de l'instance Autoplay
    const plugins = api.plugins();
    if (plugins && Array.isArray(plugins) && plugins.length > 0) {
      const autoplayPlugin = plugins.find(
        (plugin: CarouselPlugin) =>
          plugin && typeof plugin === 'object' && plugin.name === 'Autoplay'
      );
      if (autoplayPlugin) {
        setAutoplayInstance(autoplayPlugin as AutoplayPlugin);
        // Démarrer immédiatement l'autoplay si nécessaire
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

  // Gestion de la pause/reprise de l'autoplay
  useEffect(() => {
    if (!autoplayInstance) return;

    if (isPaused) {
      autoplayInstance.stop();
    } else {
      autoplayInstance.play();
    }

    // Gestion spécifique pour l'orientation verticale
    if (isHovering && pauseOnHover) {
      autoplayInstance.stop();
    } else if (!isPaused && !isHovering) {
      autoplayInstance.play();
    }
  }, [isPaused, autoplayInstance, isHovering, pauseOnHover]);

  if (!items || items.length === 0) {
    return null;
  }

  const defaultAutoplayOptions: AutoplayOptionsType = {
    delay,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: true,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot,
  };

  const mergedAutoplayOptions = {
    ...defaultAutoplayOptions,
    ...autoplayOptions,
  };

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        dragFree: false,
        watchDrag: true,
      }}
      setApi={setApi}
      plugins={[Autoplay(mergedAutoplayOptions as AutoplayOptionsType)]}
      orientation='vertical'
      className={cn(
        className,
        'relative flex w-full',
        containerHeight || 'min-h-[200px]',
        'max-h-[calc(85dvh-5rem)]'
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
          <CarouselItem key={index} className='relative'>
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
        <div className='absolute bottom-2 right-2 z-10'>
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
