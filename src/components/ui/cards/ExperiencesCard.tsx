/**
 * @file ExperiencesCard.tsx
 * @description This file exports a component that renders a list of experience cards.
 */

import React from 'react';

import { ExperiencesList } from '@/src/components/ui/lists/ExperiencesList';
import { cn } from '@/src/lib/utils';
import {
  cnSmallPaddingBottom,
  cnSmallPaddingX,
  cnSpaceY,
} from '@/src/styles/boxModel.style';
import { cnTitle2, cnTitle2Size } from '@/src/styles/font.style';
import type { CardProps } from '@/src/types/CardProps';

/**
 * ExperiencesCard component.
 * @param {Object} props - The props for the component.
 * @param {Array} props.experiences - An array of experience objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered ExperiencesCard component.
 */

export const ExperiencesCard: React.FC<{
  experiences: Array<{
    job: string;
    date: string;
    company: string;
    location: string;
    goal?: string;
    role?: string;
    tasks?: string[];
    stack?: string[];
    skills?: string[];
  }>;
  className: CardProps['className'];
}> = ({ experiences, className }) => {
  return (
    <section className={className} aria-labelledby='experiences-heading'>
      <h2 id='experiences-heading' className='sr-only'>
        Experiences
      </h2>
      <article
        className={cn(
          'w-full lg:flex',
          'bg-popover',
          cnSmallPaddingX,
          cnSmallPaddingBottom
        )}
      >
        <div className={cn(cnSpaceY, 'lg:w-1/2')}>
          <h4
            id={`en-tete-experiences-actuelles`}
            className={cn(cnTitle2, cnTitle2Size)}
          >
            Actuelles
          </h4>
          <ExperiencesList subtitle='actuelle' experiences={experiences} />
        </div>
        <div className={cn(cnSpaceY, 'lg:w-1/2')}>
          <h4
            id={`en-tete-experiences-passées`}
            className={cn(cnTitle2, cnTitle2Size)}
          >
            Passées
          </h4>
          <ExperiencesList subtitle='passée' experiences={experiences} />
        </div>
      </article>
    </section>
  );
};
