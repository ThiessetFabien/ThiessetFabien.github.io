import React from 'react';
import Image from 'next/image';
import { CardTitle, CardDescription } from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnTitle2, cnParagraph, cnDescription } from '@/styles/fontStyles';
import { cnGap, cnSpaceY } from '@/styles/boxModelStyles';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';
import { sizeBigIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';

/**
 * @file SkillsCard.tsx
 * @description This file exports a skills card component.
 */

/**
 * SkillsCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<CardProps> = ({
  top3Technologies,
  technologies,
}: CardProps): JSX.Element => {
  return (
    <div className={cnSpaceY}>
      <div
        className={cn(
          cnGap,
          cnFlexFullCenter,
          'grid grid-cols-3 lg:grid-cols-2 lg:grid-rows-2'
        )}
      >
        {top3Technologies &&
          top3Technologies.map((tech, index) => (
            <div
              key={index}
              className={cn(
                cnFlexCol,
                'h-full w-full',
                'items-start',
                index === 0 ? 'lg:col-span-2 lg:border-b' : 'lg:col-span-1'
              )}
            >
              <div
                className={cn(
                  cnSpaceY,
                  cnGap,
                  'h-full w-full',
                  index < top3Technologies.length - 1
                    ? 'border-r lg:border-r-0'
                    : ''
                )}
              >
                <Image
                  src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                  alt={tech.name}
                  width={50}
                  height={50}
                  objectFit='contain'
                  priority
                  className={sizeBigIcon}
                />
                <div>
                  <CardTitle className={cnTitle2}>{tech.name}</CardTitle>
                  <p className={cn(cnParagraph, cnHiddenXs)}>
                    {tech.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Separator className='h-[1px] w-full' />
      <CardDescription>
        <p className={cnDescription}>🚀 And i currently use...</p>
      </CardDescription>
      <TechnologiesCarousel technologies={technologies} />
    </div>
  );
};

export default SkillsCard;
