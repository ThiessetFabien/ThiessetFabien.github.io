/**
 * @file SkillsCard.tsx
 * @description This file exports a skills card component.
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnParagraph, cnTitle3 } from '@/styles/fontStyles';
import { cnGap, cnSmallGap, cnSpaceX } from '@/styles/boxModelStyles';
import { cnFlexBetweenX, cnFlexCol } from '@/styles/flexStyles';
import { sizeBigIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';

/**
 * SkillsCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<CardProps> = ({
  topTechnologies,
}: CardProps): JSX.Element => {
  return (
    <div
      className={cn(
        'flex w-full flex-row flex-wrap',
        'container overflow-hidden',
        cnSmallGap
      )}
    >
      {topTechnologies &&
        topTechnologies.map((tech, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center',
              'h-1/4 w-[calc((100%-1.5rem)/4)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-1rem)/2)]'
            )}
          >
            <div
              className={cn(
                cnFlexCol,
                cnGap,
                'h-full',
                'items-start justify-start'
              )}
            >
              <Image
                src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                alt={tech.name}
                width={42}
                height={42}
                objectFit='contain'
                priority
                className={cn(sizeBigIcon, 'block')}
              />
              <p className={cn(cnTitle3)}>
                {tech.name}
                <span
                  className={cn(
                    cnParagraph,
                    'text-muted-foreground',
                    cnHiddenXs
                  )}
                >
                  {tech.description}
                </span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkillsCard;
