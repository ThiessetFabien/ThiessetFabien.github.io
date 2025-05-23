import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { QRCodeComponent } from '@src/components/ui/qrcode/QRCodeComponent';
import { cn } from '@lib/utils';
import { useLoading } from '@src/contexts/LoadingContext';
import {
  cnBorder2,
  cnBorderBottom4,
  cnBorderRadiusFull,
} from '@styles/border.style';
import { cnGap, cnSmallSpaceY, cnSpaceY } from '@styles/boxModel.style';
import {
  cnFlexBetweenY,
  cnFlexCenterX,
  cnFlexCenterY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@styles/flex.style';
import {
  cnBigDescription,
  cnDescription,
  cnLightTextMuted,
  cnSmallText,
  cnTitle1,
} from '@styles/font.style';
import { cnBigImage } from '@styles/image.styles';
import { ResponsiveImage } from '@styles/mediaQueries.style';
import {
  cnAutoHeightFullWidth,
  cnAutoWidthFullHeight,
  cnSizeAuto,
} from '@styles/size.style';
import { cnLittleTranslateSm } from '@styles/translate.style';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { IconLoader } from '@src/components/ui/icons/IconLoader';
import { ProfileImage } from '@src/components/ui/images/ProfileImage';
import { GitHubStats } from '@src/components/ui/github/GitHubStats';

import { lazyLoadComponent } from '@src/utils/dynamicLoading.util';

const TypewriterText = lazyLoadComponent<{
  text: string;
  typingSpeed?: number;
  delayBeforeStart?: number;
  delayBeforeDelete?: number;
  onComplete?: () => void;
  className?: string;
}>(
  () =>
    import('@src/components/ui/typewriter/TypewriterText').then((mod) => ({
      default: mod.TypewriterText,
    })),
  300
);

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
    className,
  }) => {
    const [currentExpertiseIndex, setCurrentExpertiseIndex] = useState(0);
    const [showExpertise, setShowExpertise] = useState(true);
    const { setLoading } = useLoading();
    const [imageLoaded, setImageLoaded] = useState(false);

    const memoizedServices = useMemo(() => {
      if (!services || services.length === 0) return [];
      return services.map((service, index) => ({
        ...service,
        id: `service-${service.icon || ''}-${index}`,
      }));
    }, [services]);

    const handleExpertiseComplete = useCallback(() => {
      if (!expertises || expertises.length === 0) return;

      setShowExpertise(false);

      setTimeout(() => {
        setCurrentExpertiseIndex((prev) => (prev + 1) % expertises.length);
        setShowExpertise(true);
      }, 300);
    }, [expertises]);

    useEffect(() => {
      setShowExpertise(true);
      setCurrentExpertiseIndex(0);
    }, []);

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

    return (
      <div
        className={cn(
          cnFlexFullCenter,
          'min-h-[100dvh] w-full overflow-hidden'
        )}
      >
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:gap-12 lg:px-8'>
          <div className='flex flex-col justify-center space-y-8 md:col-span-1'>
            <CardHeader className={cn(className, 'p-0')}>
              <CardTitle className={cn(cnFlexCol, 'space-y-4')}>
                <div className={cn(cnSmallSpaceY, cnFlexCol, cnFlexCenterX)}>
                  <h1
                    className={cn(
                      cnTitle1,
                      'flex items-center gap-2 text-balance text-4xl sm:text-5xl lg:text-6xl'
                    )}
                  >
                    <span className='whitespace-nowrap'>
                      {name && capitalizeFirstLetterOfEachWord(name)}
                    </span>{' '}
                    <span className='whitespace-nowrap'>
                      {familyName && familyName.toUpperCase()}
                    </span>
                  </h1>
                  <div className='relative'>
                    <div
                      className={cn(
                        cnBigDescription,
                        cnFlexCenterY,
                        'h-12 gap-2 whitespace-nowrap sm:h-8'
                      )}
                    >
                      <span className='whitespace-nowrap'>
                        Besoin d&apos;un
                      </span>
                      <div
                        className={cn(
                          cnFlexCenterY,
                          'relative flex min-w-[200px]'
                        )}
                      >
                        {showExpertise &&
                          expertises &&
                          expertises.length > 0 && (
                            <TypewriterText
                              text={`${capitalizeFirstLetterOfEachWord(
                                formatSpecialWords(
                                  expertises[currentExpertiseIndex]
                                )
                              )} ?`}
                              typingSpeed={60}
                              delayBeforeStart={500}
                              delayBeforeDelete={1500}
                              onComplete={handleExpertiseComplete}
                              className='whitespace-nowrap'
                            />
                          )}
                        <div className='invisible whitespace-nowrap'>
                          {expertises &&
                            expertises.length > 0 &&
                            `${capitalizeFirstLetterOfEachWord(
                              formatSpecialWords(expertises[0])
                            )} ?`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardTitle>
              <CardDescription className={cn(cnFlexCol, cnDescription)}>
                <p
                  className={cn(
                    cnAutoHeightFullWidth,
                    cnLightTextMuted,
                    'relative text-pretty leading-relaxed'
                  )}
                >
                  {capitalizeFirstLetterOfPhrase(
                    formatSpecialWords(description)
                  )}
                </p>
              </CardDescription>
            </CardHeader>

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

          <div className={cn(cnFlexFullCenter, 'md:col-span-1')}>
            <div
              className={cn(
                cnFlexFullCenter,
                cnAutoWidthFullHeight,
                'relative z-30',
                cnBigImage,
                cnBorderRadiusFull,
                'border-primary',
                cnBorder2
              )}
            >
              <div
                className={cn(
                  cnAutoWidthFullHeight,
                  'relative z-50',
                  cnBigImage,
                  cnBorderRadiusFull,
                  'border-primary',
                  cnBorderBottom4
                )}
              />
              <Avatar
                className={cn(
                  'over absolute z-0',
                  'scale-105 sm:scale-110',
                  '-top-2 sm:-top-3 md:-top-[18px]',
                  cnBigImage,
                  cnSizeAuto
                )}
              >
                <ProfileImage
                  src={imageSrc || ''}
                  alt={imageAlt || ''}
                  width={ResponsiveImage()}
                  height={ResponsiveImage()}
                  className={cn(
                    'relative overflow-hidden',
                    cnBorderRadiusFull,
                    cnSizeAuto,
                    cnLittleTranslateSm,
                    cnBigImage
                  )}
                />
                <AvatarFallback
                  className={cn(
                    cnSmallText,
                    'relative',
                    cnBorderRadiusFull,
                    cnSizeAuto,
                    cnLittleTranslateSm,
                    cnBigImage
                  )}
                >
                  Profile
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div
            className={cn(
              cnFlexCol,
              cnFlexCenterX,
              cnFlexBetweenY,
              'md:col-span-1'
            )}
          >
            <GitHubStats
              className={cn(
                cnFlexCol,
                cnFlexCenterY,
                cnSpaceY,
                'animate-fade-in'
              )}
            />
            <Link
              href='/documents/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative block max-w-md'
              aria-label='Télécharger mon CV'
            >
              <QRCodeComponent
                value='/documents/resume.pdf'
                title='CV'
                primaryColor='#737bfb'
                dotsType='classy-rounded'
                cornersType='dot'
                size={140}
                className='rounded-xl shadow-primary/10'
              />
            </Link>
            <Link
              href='/documents/motivation-letter.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='group relative block'
              aria-label='Télécharger ma lettre de motivation'
            >
              <QRCodeComponent
                value='/documents/motivation-letter.pdf'
                title='Lettre'
                primaryColor='#f87c58'
                dotsType='classy-rounded'
                cornersType='dot'
                size={140}
                className='rounded-xl shadow-secondary/10'
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
