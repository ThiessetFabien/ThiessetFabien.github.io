'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Mail, PhoneOutgoing } from 'lucide-react';
import { Recommandations } from '@/types/RecommandationsProps';
import GenericCarousel from './GenericCarousel';
import { cn } from '@/lib/utils';
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
export const RecommandationsCarousel: React.FC<Recommandations> = ({
  recommandations,
  className,
}) => {
  const randomRecommandation = getRandomElement(recommandations);

  const items = (
    <div className='flex flex-col'>
      <a href={`${baseUrl}${randomRecommandation.linkedin}`}>
        <p className={className}>"{randomRecommandation.content}"</p>
        <div className='mt-4 flex items-center'>
          <Avatar>
            <AvatarImage
              src={`${baseUrl}${randomRecommandation.imageSrc}`}
              alt={randomRecommandation.name}
            />
            <AvatarFallback className='text-xs'>
              {randomRecommandation.name}
            </AvatarFallback>
          </Avatar>
          <div className='ml-4 flex flex-col'>
            <p className='text-xs font-bold'>{randomRecommandation.name}</p>
            <p className='text-xs font-light'>{randomRecommandation.context}</p>
            <p className='text-xs font-light'>{randomRecommandation.date}</p>
            <div>
              {randomRecommandation.mail && (
                <a href={`mailto:${randomRecommandation.mail}`}>
                  <Mail size={12} />
                </a>
              )}
              {randomRecommandation.phone && (
                <a href={`tel:${randomRecommandation.phone}`}>
                  <PhoneOutgoing size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );

  return <GenericCarousel items={[items]} className={className} delay={700} />;
};

export default RecommandationsCarousel;
