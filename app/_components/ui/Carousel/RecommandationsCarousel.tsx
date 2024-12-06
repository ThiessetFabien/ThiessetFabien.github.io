'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Recommandations } from '@/types/RecommandationsProps';
import GenericCarousel from './GenericCarousel';
import { Skeleton } from '@/lib/components/ui/skeleton';
import { baseUrl } from '@/utils/constants/baseUrl';
import { getRandomElement } from '@/utils/getRandomElement';

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
export const RecommandationsCarousel: React.FC<{
  recommandations: Recommandations[];
  className?: string;
}> = ({ recommandations, className }) => {
  // Obtenir une recommandation aléatoire
  const randomRecommandation = getRandomElement(recommandations);

  const items = (
    <div className='mx-4 flex flex-col items-center p-4'>
      <p className={className}>{randomRecommandation.content}</p>
      <Skeleton>
        <div className='flex'>
          <Avatar>
            <AvatarImage
              src={`${baseUrl}${randomRecommandation.imageSrc}`}
              alt={randomRecommandation.name}
            />
            <AvatarFallback>{randomRecommandation.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col'>
          <p className={className}>{randomRecommandation.name}</p>
          <p className={className}>{randomRecommandation.context}</p>
        </div>
      </Skeleton>
    </div>
  );

  return <GenericCarousel items={[items]} className={className} delay={7000} />;
};

export default RecommandationsCarousel;
