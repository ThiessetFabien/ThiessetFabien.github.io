'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Recommandations } from '@/types/RecommandationsProps';
import GenericCarousel from './GenericCarousel';
import cn from '@/lib/utils';
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
    <div className='flex flex-col items-center px-4'>
      <p className={className}>"{randomRecommandation.content}"</p>
      <div className='mt-4 flex w-full justify-end text-right'>
        <div className='flex flex-col items-end px-4'>
          <Skeleton>
            <p className='rounded-3xl p-4 text-right text-sm font-light'>
              {randomRecommandation.name}
              <br />
              {randomRecommandation.context}
            </p>
          </Skeleton>
          <Avatar>
            <AvatarImage
              src={`${baseUrl}${randomRecommandation.imageSrc}`}
              alt={randomRecommandation.name}
            />
            <AvatarFallback>{randomRecommandation.name}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );

  return <GenericCarousel items={[items]} className={className} delay={7000} />;
};

export default RecommandationsCarousel;
