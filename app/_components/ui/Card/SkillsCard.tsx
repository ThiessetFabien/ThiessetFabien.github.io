import React from 'react';
import Image from 'next/image';
import { CardTitle } from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnTitle2, cnParagraph, cnLightTextMuted } from '@/styles/fontStyles';
import { cnGap, cnPaddingX, cnSpaceY } from '@/styles/boxModelStyles';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';
import { sizeBigIcon, sizeIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';
import { Quote } from 'lucide-react';

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
  quote,
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
      <p className={cnParagraph}>And i currently use...</p>
      <TechnologiesCarousel technologies={technologies} />
      <Separator className='h-[1px] w-full' />
      <div className={cn(cnLightTextMuted, 'flex')}>
        <div className='self-start'>
          <Quote className={cn(sizeIcon)} />
        </div>
        <p className={cn(cnParagraph, cnPaddingX)}>
          {quote && quote.text} <br />
          <em className={'block text-right italic'}>{quote && quote.author}</em>
        </p>
        <div className='self-end'>
          <Quote className={cn(sizeIcon, 'rotate-180')} />
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
