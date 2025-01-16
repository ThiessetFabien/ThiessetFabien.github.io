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
  cnDescription,
  cnLightTextMuted,
} from '@/styles/fontStyles';
import {
  cnMarginTop,
  cnSmallGap,
  cnSmallMarginRight,
  cnSmallPaddingX,
} from '@/styles/boxModelStyles';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import { sizeBigIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import TechnologiesCarousel from '@/ui/Carousel/TechnologiesCarousel';
import type { CardProps } from '@/types/CardProps';
import { CardDescription } from '@/lib/components/ui/card';

/**
 * SkillsCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<{
  topTechnologies: CardProps['topTechnologies'];
  technologies?: CardProps['technologies'];
  content?: CardProps['content'];
  className: CardProps['className'];
}> = ({
  topTechnologies,
  technologies,
  content,
  className,
}: CardProps): JSX.Element => {
  const mergeTechnologies = Array(6)
    .fill(technologies || [])
    .flat();

  return (
    <div className={className}>
      {topTechnologies &&
        topTechnologies.map((tech, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-auto items-center',
              'h-1/4 max-w-[calc((100%-3rem)/4)] md:max-w-[calc((100%-4.5rem)/4)] lg:max-w-[calc((100%-1.5rem)/2)]'
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
              <div className={cn('relative top-1.5 mb-1.5')}>
                <h3 className={cn(cnTitle3)}>{tech.name.toUpperCase()}</h3>
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
      <CardDescription
        className={cn(
          cnDescription,
          cnLightTextMuted,
          'w-full',
          'relative top-1.5 mb-1.5'
        )}
      >
        {content && typeof content === 'string'
          ? capitalizeFirstLetterOfPhrase(content)
          : ''}
        <TechnologiesCarousel
          technologies={mergeTechnologies}
          className={cn(
            cnFlexFullCenter,
            cnMarginTop,
            cnSmallPaddingX,
            cnSmallGap,
            cnSmallMarginRight,
            'w-[calc(100vw-1.5rem)/3]',
            'flex-shrink-0 overflow-hidden rounded-full'
          )}
        />
      </CardDescription>
    </div>
  );
};

export default SkillsCard;
