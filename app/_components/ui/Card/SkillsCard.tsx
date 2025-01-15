/**
 * @file SkillsCard.tsx
 * @description This file exports a skills card component.
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import {
  cnParagraph,
  cnTitle3,
  capitalizeFirstLetterOfPhrase,
} from '@/styles/fontStyles';
import { cnGap, cnSmallGap } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { sizeBigIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type { CardProps } from '@/types/CardProps';

/**
 * SkillsCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<{
  topTechnologies: CardProps['topTechnologies'];
  className: CardProps['className'];
}> = ({ topTechnologies, className }: CardProps): JSX.Element => {
  return (
    <div className={className}>
      {topTechnologies &&
        topTechnologies.map((tech, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-auto items-center',
              'h-1/4 max-w-[calc((100%-1.5rem)/4)] md:max-w-[calc((100%-3rem)/4)] lg:max-w-[calc((100%-1rem)/2)]'
            )}
          >
            <div
              className={cn(
                cnFlexCol,
                cnSmallGap,
                'h-full',
                'justify-center',
                'items-start justify-start'
              )}
            >
              <Image
                src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                alt={tech.name}
                width={42}
                height={42}
                priority
                className={cn(
                  sizeBigIcon,
                  'relative top-1.5',
                  tech.slug.startsWith('react') ? 'animate-rotate' : '',
                  tech.slug.startsWith('tailwindcss') ? 'animate-pulse' : '',
                  tech.slug.startsWith('nodejs') ? 'animate-bounce' : '',
                  tech.slug.startsWith('postgresql') ? 'animate-blink' : ''
                )}
              />
              <div className='relative top-1.5 mb-1.5'>
                <p className={cn(cnTitle3)}>{tech.name.toUpperCase()}</p>
                <p
                  className={cn(
                    cnParagraph,
                    'text-center xs:text-left',
                    cnHiddenXs
                  )}
                >
                  {tech.description &&
                    capitalizeFirstLetterOfPhrase(tech.description)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkillsCard;
