import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';

import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { useLoading } from '@src/contexts/LoadingContext';
import { Badge } from '@src/lib/components/ui/badge';
import {
  cnBorder2,
  cnBorderBottom4,
  cnBorderRadiusFull,
} from '@src/styles/border.style';
import {
  cnGap,
  cnPaddingY,
  cnSmallGap,
  cnSmallPadding,
  cnSmallPaddingLeft,
  cnSmallSpaceY,
  cnSpaceY,
} from '@src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@src/styles/flex.style';
import {
  cnBigDescription,
  cnDescription,
  cnLightTextMuted,
  cnSmallText,
  cnTitle1,
} from '@src/styles/font.style';
import { cnHiddenSmBlock } from '@src/styles/hideItem.style';
import { cnBigImage } from '@src/styles/image.styles';
import { ResponsiveImage, useIsSm } from '@src/styles/mediaQueries.style';
import {
  cnAutoHeightFullWidth,
  cnAutoWidthFullHeight,
  cnSizeAuto,
} from '@src/styles/size.style';
import { cnLittleTranslateSm } from '@src/styles/translate.style';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { IconLoader } from '@src/components/ui/icons/IconLoader';
import { ProfileImage } from '@src/components/ui/images/ProfileImage';

// Import dynamique pour le composant TypewriterText qui n'est pas immédiatement visible
import { lazyLoadComponent } from '@src/utils/dynamicLoading.util';

// Chargement différé du composant TypewriterText pour améliorer la première compilation
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
  300 // Délai de 300ms pour permettre au contenu initial de se rendre
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

    const isSM = useIsSm();

    // Mémoriser les services pour éviter des re-rendus inutiles
    const memoizedServices = useMemo(() => {
      if (!services || services.length === 0) return [];
      return services.map((service, index) => ({
        ...service,
        // Ajouter un id stable pour la propriété key
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
        // Utiliser un timeout court pour différer le chargement de l'image
        // et permettre au reste de l'interface de s'afficher plus rapidement
        const timeoutId = setTimeout(() => {
          const img = new Image();
          img.src = imageSrc;

          img.onload = () => {
            setImageLoaded(true);
            setTimeout(() => {
              setLoading(false);
            }, 100); // Réduit le délai pour améliorer la perception de vitesse
          };

          img.onerror = () => {
            console.error("Erreur de chargement de l'image du profil");
            setImageLoaded(true);
            setLoading(false);
          };
        }, 50); // Délai court pour permettre le rendu initial

        const fallbackTimeoutId = setTimeout(() => {
          if (!imageLoaded) {
            setImageLoaded(true);
            setLoading(false);
          }
        }, 2000); // Réduit de 3000ms à 2000ms pour améliorer la perception de vitesse

        return () => {
          clearTimeout(timeoutId);
          clearTimeout(fallbackTimeoutId);
        };
      }
      setLoading(false);
    }, [imageSrc, setLoading, imageLoaded]);

    return (
      <div className={cn(cnFlexFullCenter, cnFlexCol, 'h-full')}>
        <CardHeader
          className={cn(className, cnPaddingY, 'px-0', isSM && cnGap)}
        >
          <CardTitle
            className={cn(
              'flex',
              !isSM && cnSpaceY,
              cnFlexCol,
              isSM && cn('flex-row', cnGap)
            )}
          >
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
            <div
              className={cn(
                cnSmallSpaceY,
                'sm:flex sm:w-full sm:flex-col sm:justify-center'
              )}
            >
              <h1 className={cn(cnTitle1)}>
                {name && capitalizeFirstLetterOfEachWord(name)}{' '}
                {familyName && familyName.toUpperCase()}
              </h1>
              <p
                className={cn(
                  cnBigDescription,
                  'flex flex-col text-foreground xs:block'
                )}
              >
                <span className='block sm:inline'>Besoin d&apos;un </span>
                <span className='block min-h-[1.75rem] sm:inline'>
                  {showExpertise && expertises && expertises.length > 0 && (
                    <TypewriterText
                      text={capitalizeFirstLetterOfEachWord(
                        formatSpecialWords(expertises[currentExpertiseIndex])
                      )}
                      typingSpeed={60}
                      delayBeforeStart={500}
                      delayBeforeDelete={1500}
                      onComplete={handleExpertiseComplete}
                      className='font-semibold text-primary'
                    />
                  )}{' '}
                  ?
                </span>
              </p>
            </div>
          </CardTitle>
          <CardDescription className={cn(cnFlexCol, cnDescription)}>
            <p
              className={cn(
                cnAutoHeightFullWidth,
                cnLightTextMuted,
                cnHiddenSmBlock,
                cnSmallPaddingLeft,
                'relative'
              )}
            >
              {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent
          className={cn(
            cnSmallGap,
            'grid max-w-full flex-wrap p-0',
            'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
          )}
        >
          <h5
            className={cn(
              'col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-6',
              'font-bold'
            )}
          >
            Mes services
          </h5>
          {memoizedServices &&
            memoizedServices.length > 0 &&
            memoizedServices.map((service) => (
              <Badge
                key={service.id}
                variant='outline'
                className={cn(
                  cnSmallPadding,
                  cnFlexFullCenter,
                  cnSmallGap,
                  cnFlexCol,
                  'sm:flex-row',
                  (service as any).index > 3 &&
                    'lg:col-span-2 lg:flex-row lg:justify-center xl:col-span-1 xl:flex-row',
                  cnSmallText,
                  'hyphens-auto break-words'
                )}
              >
                <IconLoader icon={service.icon} className='text-secondary' />
                <p className={cn(cnFlexCol, 'text-center italic')}>
                  <span className='font-semibold'>
                    {capitalizeFirstLetterOfPhrase(
                      formatSpecialWords(service.item)
                    )}
                  </span>
                  <span>
                    {capitalizeFirstLetterOfPhrase(
                      formatSpecialWords(service.description)
                    )}
                  </span>
                </p>
              </Badge>
            ))}
        </CardContent>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
