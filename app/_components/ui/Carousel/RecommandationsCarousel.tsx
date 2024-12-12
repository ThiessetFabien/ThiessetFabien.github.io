'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';
import { Mail, PhoneOutgoing } from 'lucide-react';
import GenericCarousel from './GenericCarousel';
import { baseUrl } from '@/utils/constants/baseUrl';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import CardProps from '@/types/CardProps';

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
    <div key={index} className='mx-4 h-auto w-auto py-4'>
      <p
        className={cn(
          'max-w-prose text-base font-light leading-relaxed',
          className
        )}
      >
        &quot;{recommandation.content}&quot;
      </p>
      <div className='mt-4 flex items-center'>
        <Avatar>
          <AvatarImage
            src={`${baseUrl}${recommandation.imageSrc}`}
            alt={recommandation.name}
          />
          <AvatarFallback className='text-xs'>
            {recommandation.name}
          </AvatarFallback>
        </Avatar>
        <div className='ml-4 flex flex-col'>
          <a href={`${baseUrl}${recommandation.linkedin}`}>
            <p className='max-w-prose text-xs font-bold leading-relaxed'>
              {recommandation.name}
            </p>
            <p className='max-w-prose text-xs font-light leading-relaxed'>
              {recommandation.context}
            </p>
            <p className='max-w-prose text-xs font-light leading-relaxed'>
              {recommandation.date}
            </p>
          </a>
        </div>
        <div className='ml-4'>
          {recommandation.mail && (
            <a href={`mailto:${recommandation.mail}`}>
              <Button variant='secondary'>
                <Mail size={12} />
              </Button>
            </a>
          )}
          {recommandation.phone && (
            <a href={`tel:${recommandation.phone}`}>
              <Button variant='secondary'>
                <PhoneOutgoing size={12} />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  ));

  return <GenericCarousel items={items} className={className} delay={1000} />;
};

export default RecommandationsCarousel;
