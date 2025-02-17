/**
 * @file SkillsCard.tsx
 * @description This file exports a skills card component.
 */

import Image from 'next/image';
import React, { memo } from 'react';

import { baseUrl } from '@/src/lib/utils/baseUrl.util';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/lib/utils/formatText.util';
import { cnBorderNone } from '@/src/styles/border.style';
import { cnSmallGap } from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import {
  cnDescription,
  cnLightTextMuted,
  cnParagraph,
  cnTitle3,
} from '@/src/styles/font.style';
import { cnHiddenXsFlex } from '@/src/styles/hideItem.style';
import { cnSizeBigIcon, cnSizeIcon } from '@/src/styles/size.style';
import { Badge } from '@lib/components/ui/badge';
import { CardDescription } from '@lib/components/ui/card';
import type { CardProps } from '@src/types/CardProps';

import { cn } from '@lib/utils';

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
}> = memo(
  ({
    topTechnologies,
    technologies,
    content,
    className,
  }: CardProps): JSX.Element => {
    return (
      <section className={className}>
        {topTechnologies?.map((tech, index) => (
          <Badge
            variant={'outline'}
            key={index}
            className={cn(
              cnBorderNone,
              'flex flex-auto items-center p-0',
              'h-auto',
              'max-w-[calc((100%-1.5rem)/4)]',
              'xxs:min-w-[calc((100%-3rem)/4)]',
              'md:max-w-[calc((100%-3rem)/4)]',
              'lg:max-w-[calc((100%-1rem)/2)]'
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
                width={40}
                height={40}
                loading='lazy'
                className={cn(
                  cnSizeBigIcon,
                  'relative top-1.5',
                  tech.slug.startsWith('react') ? 'animate-rotate' : '',
                  tech.slug.startsWith('tailwindcss') ? 'animate-pulse' : '',
                  tech.slug.startsWith('nodejs') ? 'animate-bounce' : '',
                  tech.slug.startsWith('postgresql') ? 'animate-blink' : ''
                )}
              />
              <div className={cn('relative top-1.5 mb-1.5')}>
                <h3 className={cn(cnTitle3)}>
                  {formatSpecialWords(tech.name)}
                </h3>
                <Badge
                  variant='outline'
                  className={cn(
                    cnParagraph,
                    cnBorderNone,
                    'p-0 text-center xs:text-left',
                    cnHiddenXsFlex
                  )}
                >
                  {tech.description &&
                    capitalizeFirstLetterOfPhrase(
                      formatSpecialWords(tech.description)
                    )}
                </Badge>
              </div>
            </div>
          </Badge>
        ))}
        <CardDescription
          className={cn(
            cnDescription,
            cnLightTextMuted,
            'w-full flex-1',
            'relative top-1.5'
          )}
        >
          {content && typeof content === 'string'
            ? capitalizeFirstLetterOfPhrase(content)
            : ''}
        </CardDescription>
        <section
          className={cn(
            'grid w-full auto-rows-auto py-0',
            'grid-cols-2',
            'xxs:grid-cols-3',
            'md:grid-cols-6',
            'lg:grid-cols-2'
          )}
        >
          {technologies?.map((tech, index) => (
            <Badge
              key={index}
              variant='outline'
              className={cn(
                className,
                cnBorderNone,
                'gap-1',
                'w-full',
                'relative top-1.5 mb-1.5'
              )}
            >
              <div className={cnFlexFullCenter}>
                <Image
                  src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                  alt={tech.name}
                  width={50}
                  height={50}
                  className={cn(
                    cnSizeIcon,
                    tech.slug.includes('express') ? 'filter-white' : ''
                  )}
                  loading='lazy'
                />
              </div>
              <p className={cn(cnParagraph, 'text-center')}>
                {capitalizeFirstLetterOfPhrase(formatSpecialWords(tech.name))}
              </p>
            </Badge>
          ))}
        </section>
      </section>
    );
  }
);

SkillsCard.displayName = 'SkillsCard';

export default SkillsCard;
