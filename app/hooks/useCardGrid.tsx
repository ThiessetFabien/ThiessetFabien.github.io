import { useMemo } from 'react';
import CardProps from '@/types/CardProps';

const useCardGrid = (cards: CardProps[]) => {
  const gridConfig = useMemo(() => {
    return cards.map((card) => {
      let colSpan = '';

      switch (true) {
        case !!card.imageSrc:
          colSpan = 'lg:col-span-8 lg:row-span-1';
          break;
        case !!card.technologies:
          colSpan = 'lg:col-span-4 lg:row-span-2';
          break;
        case !!card.experiences:
          colSpan = 'lg:col-span-8 lg:row-span-1';
          break;
        case !!card.projects:
          colSpan = 'lg:col-span-12 lg:row-span-1';
          break;
        case !!card.testimonials:
          colSpan = 'lg:col-span-6 lg:row-span-1';
          break;
        case !!card.achievements:
          colSpan = 'lg:col-span-6 lg:row-span-1';
          break;
        case !!card.map:
          colSpan = 'lg:col-span-4 lg:row-span-1';
          break;
        case !!card.mailto:
          colSpan = 'lg:col-span-4 lg:row-span-1';
          break;
        default:
          colSpan = 'lg:col-span-6 lg:row-span-1';
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
