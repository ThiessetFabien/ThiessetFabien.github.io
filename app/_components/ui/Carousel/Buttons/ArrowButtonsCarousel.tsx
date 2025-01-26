import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { EmblaCarouselType } from 'embla-carousel';
import { ActionButton } from '@/ui/CallToAction/ActionButton';
import { ActionButtonProps } from '@/types/ActionButtonProps.jsx';

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

export const PrevButton: React.FC<PropType & ActionButtonProps> = (
  props,
  ClassName
) => {
  const { ...restProps } = props;

  return (
    <ActionButton
      icon='ArrowLeft'
      type='button'
      variant='outline'
      size='icon'
      className={cn(ClassName, 'hover:text-accent-foreground')}
      {...restProps}
    ></ActionButton>
  );
};

export const NextButton: React.FC<PropType & ActionButtonProps> = (
  props,
  ClassName
) => {
  const { ...restProps } = props;

  return (
    <ActionButton
      icon='ArrowRight'
      type='button'
      variant='outline'
      size='icon'
      className={cn(ClassName, 'hover:text-accent-foreground')}
      {...restProps}
    />
  );
};
