import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { cnParagraph } from '@/styles/fontStyles';
import { cnFlexFullCenter } from '@/styles/flexStyles';
import { sizeIcon } from '@/styles/sizeStyles';
import GenericCarousel from './GenericCarousel';
import type { CardProps } from '@/types/CardProps';
import { Badge } from '@/lib/components/ui/badge';
import { cnSmallGap } from '@/styles/boxModelStyles';
import { useIsXl, useIsXs } from '@/hooks/useMediaQueries';

/**
 * @file TechCarousel.tsx
 * @description This file exports a component that renders a carousel of technology icons.
 */

/**
 * TechCarousel component.
 * @param {Object} props - The props for the component.
 * @param {Technologies[]} props.technologies - An array of technology objects to be displayed.
 * @param {string} props.className - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered TechCarousel component.
 * @example
 * <TechCarousel technologies={technologies} className="custom-class" />
 */
export const TechnologiesCarousel: React.FC<{
  technologies: CardProps['technologies'];
  className: CardProps['className'];
}> = ({ technologies, className }) => {
  const items = technologies?.map((tech, index) => {
    return (
      <Badge
        key={index}
        variant='outline'
        className={cn(className, 'gap-1 border-none', 'w-full')}
      >
        <div className={cnFlexFullCenter}>
          <Image
            src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
            alt={tech.name}
            width={50}
            height={50}
            className={cn(
              sizeIcon,
              tech.slug.includes('express') ? 'filter-white' : ''
            )}
            priority
          />
        </div>
        <p className={cn(cnParagraph, 'text-center')}>
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(tech.name))}
        </p>
      </Badge>
    );
  });

  const isXs = useIsXs();
  const isXl = useIsXl();

  return (
    <>
      <GenericCarousel
        items={items}
        fastRotate={true}
        idStart={0}
        controls='none'
      />
      <GenericCarousel
        items={items}
        fastRotate={true}
        idStart={isXs || isXl ? 3 : 2}
        controls='none'
        className='sm:hidden lg:block'
      />
      <GenericCarousel
        items={items}
        fastRotate={true}
        idStart={isXs || isXl ? 6 : 4}
        controls='none'
        className='xs:hidden sm:hidden lg:block xl:hidden'
      />
    </>
  );
};

export default TechnologiesCarousel;
