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
import { baseUrl } from '@/utils/constants/baseUrl';
import { getRandomElement } from '@/utils/getRandomElement';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className='mx-4 py-4'>
      <p
        className={cn(
          'max-w-prose text-base font-light leading-relaxed',
          className
        )}
      >
        &quot;{randomRecommandation.content}&quot;
      </p>
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
          <a href={`${baseUrl}${randomRecommandation.linkedin}`}>
            <p className='max-w-prose text-xs font-bold leading-relaxed'>
              {randomRecommandation.name}
            </p>
            <p className='max-w-prose text-xs font-light leading-relaxed'>
              {randomRecommandation.context}
            </p>
            <p className='max-w-prose text-xs font-light leading-relaxed'>
              {randomRecommandation.date}
            </p>
          </a>
        </div>
        <div className='ml-4'>
          {randomRecommandation.mail && (
            <a href={`mailto:${randomRecommandation.mail}`}>
              <Button variant='secondary'>
                <Mail size={12} />
              </Button>
            </a>
          )}
          {randomRecommandation.phone && (
            <a href={`tel:${randomRecommandation.phone}`}>
              <Button variant='secondary'>
                <PhoneOutgoing size={12} />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return <GenericCarousel items={[items]} className={className} delay={500} />;
};

export default RecommandationsCarousel;
