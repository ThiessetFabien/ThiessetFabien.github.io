import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/lib/components/ui/button';
import { EmblaCarouselType } from 'embla-carousel';
import { sizeIcon } from '@/styles/sizeStyles';
import { cnSmallMarginRight } from '@/styles/boxModelStyles';
import { ActionButton } from '@/ui/CallToAction/ActionButton';

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

export const PrevButton: React.FC<PropType> = (props, ClassName) => {
  const { children, ...restProps } = props;

  return (
    <ActionButton
      icon='CircleArrowLeft'
      variant='outline'
      size='icon'
      className={cn(ClassName, 'hover:text-accent-foreground')}
      {...restProps}
    />
  );
};

export const NextButton: React.FC<PropType> = (props, ClassName) => {
  const { children, ...restProps } = props;

  return (
    <ActionButton
      icon='CircleArrowRight'
      variant='outline'
      size='icon'
      className={cn(ClassName, 'hover:text-accent-foreground')}
      {...restProps}
    />
  );
};
