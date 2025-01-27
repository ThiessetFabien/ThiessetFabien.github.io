import { EmblaCarouselType } from 'embla-carousel';
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi?: EmblaCarouselType
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'> & { isSelected: boolean };

export const DotButton: React.FC<PropType> = ({
  isSelected,
  className,
  children,
  ...restProps
}) => {
  return (
    <Button className={className} variant='link' type='button' {...restProps}>
      <span
        className={cn(
          'mr-1 h-2 w-2 translate-y-3 rounded-full',
          isSelected ? 'bg-ring' : 'bg-muted'
        )}
      />
      {children}
    </Button>
  );
};
