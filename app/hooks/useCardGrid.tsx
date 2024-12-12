import { useMemo } from 'react';
import CardProps from '@/types/CardProps';

const useCardGrid = (cards: CardProps[]) => {
  const gridConfig = useMemo(() => {
    return cards.map((card) => {
      let colSpan = '';

      switch (true) {
        case !!card.imageSrc:
          colSpan = 'lg:col-span-5 lg:row-span-1';
          break;
        case !!card.technologies:
          colSpan = 'lg:col-span-3 lg:row-span-2';
          break;
        case !!card.map:
          colSpan = 'lg:col-span-2 lg:row-span-auto';
          break;
        case !!card.experiences:
          colSpan = 'lg:col-span-5 lg:row-span-1';
          break;
        case !!card.projects:
          colSpan = 'lg:col-span-4 lg:row-span-1';
          break;
        case !!card.recommandations:
          colSpan = 'lg:col-span-4 lg:row-span-auto';
          break;

        default:
          colSpan;
          break;
      }
      return {
        ...card,
        colSpan,
      };
    });
  }, [cards]);

  return gridConfig;
};

export default useCardGrid;
