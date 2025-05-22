/**
 * @file ExperiencesSection.tsx
 * @description This file exports a component that renders a list of experience cards.
 */

import React from 'react';

import { ExperiencesList } from '@src/components/ui/lists/ExperiencesList';
import { cn } from '@src/lib/utils';
import {
  cnSmallPaddingBottom,
  cnSmallPaddingX,
  cnSpaceY,
} from '@styles/boxModel.style';
import { cnTitle2, cnTitle2Size } from '@styles/font.style';
import type { CardProps } from '@src/types/CardProps';
import type { ExperiencesProps } from '@src/types/ExperiencesProps';

/**
 * A React component that displays a list of experiences grouped into current and past categories.
 *
 * @param {Object} props - The component props.
 * @param {ExperiencesProps[]} props.experiences - An array of experience objects to display.
 * @param {string} [props.className] - Optional additional class names for the component.
 * @returns {JSX.Element} The rendered ExperiencesSection component.
 */
export const ExperiencesSection: React.FC<{
  experiences: ExperiencesProps[];
  className: CardProps['className'];
}> = ({
  experiences,
  className,
}: {
  experiences: ExperiencesProps[];
  className?: string;
}): JSX.Element => (
  <section className={className} aria-labelledby='experiences-heading'>
    <h2 id='experiences-heading' className='sr-only'>
      Experiences
    </h2>
    <article
      className={cn('w-full lg:flex', cnSmallPaddingX, cnSmallPaddingBottom)}
    >
      <div className={cn(cnSpaceY, 'lg:w-1/2')}>
        <h4
          id='en-tete-experiences-actuelles'
          className={cn(cnTitle2, cnTitle2Size)}
        >
          Actuelles
        </h4>
        <ExperiencesList subtitle='actuelle' experiences={experiences} />
      </div>
      <div className={cn(cnSpaceY, 'lg:w-1/2')}>
        <h4
          id='en-tete-experiences-passées'
          className={cn(cnTitle2, cnTitle2Size)}
        >
          Passées
        </h4>
        <ExperiencesList subtitle='passée' experiences={experiences} />
      </div>
    </article>
  </section>
);
