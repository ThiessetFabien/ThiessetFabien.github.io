import React, { memo, useEffect, useState } from 'react';

import { useLoading } from '@src/contexts/LoadingContext';
import type { SectionProps } from '@src/types/SectionProps';
import { HeroParallax } from '@src/lib/components/blocks/hero-parallax';

/**
 * HeroSection component displays a profile card with typewriter animation for expertise.
 *
 * @param name - First name of the profile.
 * @param familyName - Last name of the profile.
 * @param expertises - List of expertise strings to animate.
 * @param imageSrc - Source URL for the profile image.
 * @param imageAlt - Alt text for the profile image.
 * @param className - Additional class names for styling.
 */
export const HeroSection: React.FC<{
  name: SectionProps['name'];
  familyName: SectionProps['familyName'];
  expertises: SectionProps['expertises'];
  description: SectionProps['description'];
  imageSrc: SectionProps['imageSrc'];
  imageAlt: SectionProps['imageAlt'];
  projects: SectionProps['projects'];
  success: SectionProps['success'];
  className: SectionProps['className'];
}> = memo(
  ({
    name,
    familyName,
    expertises,
    description,
    imageSrc,
    imageAlt,
    projects,
    success,
  }) => {
    const { setLoading } = useLoading();
    const [imageLoaded, setImageLoaded] = useState(false);

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
              success={success || []}
            />
          </div>
        </div>
        <div className='relative z-10 mx-auto mt-[200vh] w-full max-w-7xl gap-8 px-4 sm:px-6 lg:gap-12 lg:px-8'>
          {/* Services section removed */}
        </div>
      </>
    );
  }
);

HeroSection.displayName = 'HeroSection';
