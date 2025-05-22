import { useMemo } from 'react';

import type { CardProps } from '@src/types/CardProps';

/**
 * A custom hook that generates a grid configuration for an array of cards.
 * Each card is assigned a `colSpan` value based on its properties, which determines
 * its column and row span in a responsive grid layout.
 *
 * @param {CardProps[]} cards - An array of card objects, where each card can have
 * properties such as `imageSrc`, `jobs`, `technologies`, `experiences`, `projects`,
 * `achievements`, `testimonials`, `map`, or `mailto`.
 *
 * @returns {Array} - An array of card objects with an additional `colSpan` property
 * that specifies the grid layout configuration for each card.
 *
 * @example
 * const cards = [
 *   { imageSrc: 'image.jpg' },
 *   { jobs: ['Developer'] },
 *   { technologies: ['React', 'TypeScript'] },
 * ];
 * const gridConfig = useCardGrid(cards);
 * // gridConfig will include the `colSpan` property for each card
 */
export const useCardGrid = (cards: CardProps[]) => {
  const gridConfig = useMemo(
    () =>
      cards.map((card) => {
        let colSpan = '';

        switch (true) {
          case !!card.imageSrc:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.jobs:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.experiences:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.projects:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.testimonials:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.map:
            colSpan = 'lg:col-span-12 lg:row-span-1';
            break;
          case !!card.mailto:
            colSpan = 'lg:col-span-6 lg:row-span-1';
            break;
          default:
            colSpan = 'lg:col-span-3 lg:row-span-1';
            break;
        }
        return {
          ...card,
          colSpan,
        };
      }),
    [cards]
  );

  return gridConfig;
};
