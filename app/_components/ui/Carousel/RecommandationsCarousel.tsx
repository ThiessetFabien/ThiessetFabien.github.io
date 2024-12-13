'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Linkedin } from 'lucide-react';
import GenericCarousel from './GenericCarousel';
import { baseUrl } from '@/utils/constants/baseUrl';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import CardProps from '@/types/CardProps';
import {
  cnLightTextMuted,
  cnParagraph,
  cnSmallText,
} from '@/styles/fontStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { sizeIcon } from '@/styles/sizeStyles';
import { cnSpaceY } from '@/styles/boxModelStyles';

/**
 * @file RecommandationsCarousel.tsx
 * @description This file exports a component that renders a carousel of recommandations.
 */

/**
 * RecommandationsCarousel component.
 * @param {Object} props - The props for the component.
 * @param {Recommandations[]} props.recommandations - An array of recommandations to be displayed.
 * @param {string} props.className - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered RecommandationsCarousel component.
 * @example
 * <RecommandationsCarousel recommandations={recommandations} className="custom-class" />
 */
export const RecommandationsCarousel: React.FC<CardProps> = ({
  recommandations,
  className,
}) => {
  const shuffledRecommandations = recommandations
    ? recommandations.sort(() => Math.random() - 0.5)
    : [];

  const items = shuffledRecommandations.map((recommandation, index) => (
    <div key={index} className={cn(cnSpaceY, 'mx-4 h-auto min-w-full')}>
      <p className={cnParagraph}>&quot;{recommandation.content}&quot;</p>
      <div className='lex-shrink-0 flex items-center'>
        <a href={`${baseUrl}${recommandation.linkedin}`}>
          <div className='relative left-0 top-0'>
            <Avatar>
              <AvatarImage
                src={`${baseUrl}${recommandation.imageSrc}`}
                alt={recommandation.name}
              />
              <AvatarFallback className={cnSmallText}>
                {recommandation.name}
              </AvatarFallback>
            </Avatar>
            <Button
              variant='default'
              className={cn(
                'absolute bottom-0 right-0 z-auto',
                'max-h-1/4 max-w-1/4 h-1/4 w-1/4'
              )}
            >
              <Linkedin size={1} />
            </Button>
          </div>
        </a>
        <div className={cn(cnFlexCol, 'ml-4')}>
          <p className={cnSmallText}>{recommandation.name}</p>
          <p className={cn(cnSmallText, cnLightTextMuted)}>
            {recommandation.context}
          </p>
        </div>
      </div>
    </div>
  ));

  return <GenericCarousel items={items} className={className} delay={2000} />;
};

export default RecommandationsCarousel;
