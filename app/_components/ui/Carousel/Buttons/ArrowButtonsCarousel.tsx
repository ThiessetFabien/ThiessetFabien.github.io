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

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
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
    <Button variant='ghost' size='icon' {...restProps}>
      <CircleArrowLeft className={ClassName} />
      {children}
    </Button>
  );
};

export const NextButton: React.FC<PropType> = (props, ClassName) => {
  const { children, ...restProps } = props;

  return (
    <Button variant='ghost' size='icon' {...restProps}>
      <CircleArrowRight className={ClassName} />
      {children}
    </Button>
  );
};
