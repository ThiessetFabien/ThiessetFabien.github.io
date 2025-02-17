import { EmblaCarouselType } from 'embla-carousel';
import React, {
  ComponentPropsWithRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ActionButton } from '@/src/components/ui/buttons/ActionButton';
import { ActionButtonProps } from '@/src/types/ActionButtonProps.js';
import { cn } from '@lib/utils';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi?: EmblaCarouselType
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType & ActionButtonProps> = memo(
  ({ className, ...restProps }) => {
    return (
      <ActionButton
        icon='ArrowLeft'
        type='button'
        variant='outline'
        size='icon'
        aria-label='Previous slide'
        className={cn(className, 'hover:text-accent-foreground')}
        {...restProps}
      />
    );
  }
);

export const NextButton: React.FC<PropType & ActionButtonProps> = memo(
  ({ className, ...restProps }) => {
    return (
      <ActionButton
        icon='ArrowRight'
        type='button'
        variant='outline'
        size='icon'
        aria-label='Next slide'
        className={cn(className, 'hover:text-accent-foreground')}
        {...restProps}
      />
    );
  }
);

PrevButton.displayName = 'PrevButton';
NextButton.displayName = 'NextButton';
