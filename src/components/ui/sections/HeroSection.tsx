import React, { memo, useEffect, useState, useMemo } from 'react';

import { CardContent } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { useLoading } from '@src/contexts/LoadingContext';
import { cnGap, cnSpaceY } from '@styles/boxModel.style';
import { cnFlexCenterY } from '@styles/flex.style';
import { cnSmallText } from '@styles/font.style';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { IconLoader } from '@src/components/ui/icons/IconLoader';
import { HeroParallax } from '@src/lib/components/blocks/hero-parallax';

/**
 * HeroSection component displays a profile card with typewriter animation for expertise.
 *
 * @param name - First name of the profile.
 * @param familyName - Last name of the profile.
 * @param expertises - List of expertise strings to animate.
 * @param services - List of services with icons and descriptions.
 * @param imageSrc - Source URL for the profile image.
 * @param imageAlt - Alt text for the profile image.
 * @param className - Additional class names for styling.
 */
export const HeroSection: React.FC<{
  name: CardProps['name'];
  familyName: CardProps['familyName'];
  expertises: CardProps['expertises'];
  description: CardProps['description'];
  services: CardProps['services'];
  imageSrc: CardProps['imageSrc'];
  imageAlt: CardProps['imageAlt'];
  projects: CardProps['projects'];
  className: CardProps['className'];
}> = memo(
  ({
    name,
    familyName,
    expertises,
    description,
    services,
    imageSrc,
    imageAlt,
    projects,
  }) => {
    const { setLoading } = useLoading();
    const [imageLoaded, setImageLoaded] = useState(false);

    const memoizedServices = useMemo(() => {
      if (!services || services.length === 0) return [];
      return services.map((service, index) => ({
        ...service,
        id: `service-${service.icon || ''}-${index}`,
      }));
    }, [services]);

    useEffect(() => {
      if (imageSrc) {
        const timeoutId = setTimeout(() => {
          const img = new Image();
          img.src = imageSrc;

          img.onload = () => {
            setImageLoaded(true);
            setTimeout(() => {
              setLoading(false);
            }, 100);
          };

          img.onerror = () => {
            console.error('Error loading profile image');
            setImageLoaded(true);
            setLoading(false);
          };
        }, 50);

        const fallbackTimeoutId = setTimeout(() => {
          if (!imageLoaded) {
            setImageLoaded(true);
            setLoading(false);
          }
        }, 2000);

        return () => {
          clearTimeout(timeoutId);
          clearTimeout(fallbackTimeoutId);
        };
      }
      setLoading(false);
    }, [imageSrc, setLoading, imageLoaded]);

    // const products = [
    //   {
    //     title: 'Moonbeam',
    //     link: 'https://gomoonbeam.com',
    //     thumbnail:
    //       'https://aceternity.com/images/products/thumbnails/new/moonbeam.png',
    //   },

    return (
      <>
        <div className='min-h-screen w-full'>
          <div className='absolute left-0 top-0 z-0 h-[300vh] w-full'>
            <HeroParallax
              projects={projects}
              name={name}
              familyName={familyName}
              expertises={expertises}
              description={description}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
            />
          </div>
        </div>
        <div className='relative z-10 mx-auto mt-[200vh] w-full max-w-7xl gap-8 px-4 sm:px-6 lg:gap-12 lg:px-8'>
          <div className='flex flex-col justify-center space-y-8 md:col-span-1'>
            <CardContent className={cn(cnSpaceY, 'w-full max-w-full p-0')}>
              <h5 className='text-lg font-bold text-foreground/90 hover:text-foreground'>
                Mes services
              </h5>
              {memoizedServices &&
                memoizedServices.length > 0 &&
                memoizedServices.map((service) => (
                  <div
                    key={service.id}
                    className={cn(cnFlexCenterY, cnGap, 'group w-full')}
                  >
                    <IconLoader
                      icon={service.icon}
                      className='text-secondary/90 transition-transform hover:text-secondary group-hover:scale-110'
                    />
                    <p
                      className={cn(
                        cnSmallText,
                        'gap-2 hyphens-auto break-words italic'
                      )}
                    >
                      <span className='font-semibold'>
                        {capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(service.item)
                        )}{' '}
                      </span>
                      {formatSpecialWords(service.description)}
                    </p>
                  </div>
                ))}
            </CardContent>
          </div>
        </div>
      </>
    );
  }
);

HeroSection.displayName = 'HeroSection';
