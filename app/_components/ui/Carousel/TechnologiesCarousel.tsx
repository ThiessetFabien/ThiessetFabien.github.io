import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnLightTextMuted, cnParagraph } from '@/styles/fontStyles';
import { cnFlexFullCenter } from '@/styles/flexStyles';
import { sizeMiddleIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import GenericCarousel from './GenericCarousel';
import type { CardProps } from '@/types/CardProps';
import { cnSmallPadding } from '@/styles/boxModelStyles';

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
  className: string;
}> = ({ technologies, className }) => {
  const items =
    technologies &&
    technologies.map((tech, index) => {
      return (
        <div
          key={index}
          className={cn(
            cnFlexFullCenter,
            'flex-shrink-0',
            'h-auto min-w-fit',
            'xs:min-h-auto min-h-12',
            'xs:min-w-auto min-w-12'
          )}
        >
          <div className={cn(cnFlexFullCenter)}>
            <Image
              src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
              alt={tech.name}
              width={50}
              height={50}
              className={cn(
                tech.slug.includes('express') ? 'filter-white' : '',
                sizeMiddleIcon,
                'object-cover'
              )}
              priority
            />
          </div>
          <p
            className={cn(
              cnParagraph,
              cnLightTextMuted,
              cnSmallPadding,
              cnHiddenXs,
              'text-center'
            )}
          >
            {tech.name}
          </p>
        </div>
      );
    });

  return <GenericCarousel items={items} className={className} />;
};

export default TechnologiesCarousel;
