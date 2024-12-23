import React from 'react';
import Image from 'next/image';
import { CardTitle } from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnTitle3, cnParagraph } from '@/styles/fontStyles';
import {
  cnGap,
  cnMargin,
  cnSmallMarginX,
  cnSmallSpaceX,
  cnSmallSpaceY,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import {
  cnFlexBetweenX,
  cnFlexCenterY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/styles/flexStyles';
import { sizeBigIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';
import { Separator } from '@/lib/components/ui/separator';

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
}: CardProps): JSX.Element => {
  return (
    <div className='flex w-full flex-row space-x-2'>
      {top3Technologies &&
        top3Technologies.map((tech, index) => (
          <>
            {index > 0 && (
              <Separator
                decorative
                orientation={'vertical'}
                className='flex-none'
              />
            )}
            <div
              key={index}
              className={cn(
                'flex flex-row',
                cnFlexBetweenX,
                'w-[(calc(100% - 9px) / 3)] h-full'
                // index === 0 ? 'lg:col-span-2 lg:border-b' : 'lg:col-span-1'
              )}
            >
              <div
                className={cn(
                  cnFlexCol,
                  cnSmallSpaceY,
                  'h-full',
                  'items-start justify-start'
                )}
              >
                <Image
                  src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                  alt={tech.name}
                  width={56}
                  height={56}
                  objectFit='contain'
                  priority
                  className={cn(sizeBigIcon, 'block')}
                />
                <p>
                  {tech.name}
                  <span className={cn(cnParagraph, cnHiddenXs)}>
                    {tech.description}
                  </span>
                </p>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default SkillsCard;
