import type { EmblaCarouselType } from 'embla-carousel';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { cnSmallText } from '@/styles/fontStyles';
import type { CardProps } from '@/types/CardProps';

type UseSelectedSnapDisplayType = {
  selectedSnap: number;
  snapCount: number;
};

export const useSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType | undefined
): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length);
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on('select', updateScrollSnapState);
    emblaApi.on('reInit', updateScrollSnapState);

    return () => {
      emblaApi.off('select', updateScrollSnapState);
      emblaApi.off('reInit', updateScrollSnapState);
    };
  }, [emblaApi, updateScrollSnapState]);

  return {
    selectedSnap,
    snapCount,
  };
};

type PropType = {
  selectedSnap: number;
  snapCount: number;
};

export const SelectedSnapDisplay: React.FC<
  PropType & { className: CardProps['className'] }
> = memo((props) => {
  const { selectedSnap, snapCount, className } = props;

  return (
    <div
      className={cn(
        className,
        cnSmallText,
        'h-full min-w-11 text-center font-light'
      )}
      role='status'
      aria-live='polite'
    >
      <span>{`${selectedSnap + 1} of ${snapCount}`}</span>{' '}
    </div>
  );
});

SelectedSnapDisplay.displayName = 'SelectedSnapDisplay';
