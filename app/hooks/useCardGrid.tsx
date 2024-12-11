import { useMemo } from 'react';
import CardProps from '@/types/CardProps';

const useCardGrid = (cards: CardProps[]) => {
  const gridConfig = useMemo(() => {
    return cards.map((card) => {
      let colSpan = card.imageSrc ? 'lg:col-span-3 lg:row-span-1' : '';
      colSpan = card.technologies ? 'lg:row-span-1' : colSpan;
      return {
        ...card,
        colSpan,
      };
    });
  }, [cards]);

  return gridConfig;
};

export default useCardGrid;
