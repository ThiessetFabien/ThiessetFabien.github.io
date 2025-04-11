import React, { memo, useEffect, useState, useCallback } from 'react';

import { Badge } from '@/src/lib/components/ui/badge';
import {
  cnBorder2,
  cnBorderBottom4,
  cnBorderRadiusFull,
} from '@/src/styles/border.style';
import {
  cnGap,
  cnPaddingY,
  cnSmallGap,
  cnSmallPadding,
  cnSmallSpaceY,
  cnSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import {
  cnBigDescription,
  cnDescription,
  cnLightTextMuted,
  cnSmallText,
  cnTitle1,
} from '@/src/styles/font.style';
import { cnHiddenSmBlock } from '@/src/styles/hideItem.style';
import { cnBigImage } from '@/src/styles/image.styles';
import { ResponsiveImage, useIsSm } from '@/src/styles/mediaQueries.style';
import {
  cnAutoHeightFullWidth,
  cnAutoWidthFullHeight,
  cnSizeAuto,
  cnSizeIcon,
} from '@/src/styles/size.style';
import { cnLittleTranslateSm } from '@/src/styles/translate.style';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
} from '@/src/utils/formatText.util';
import { formatSpecialWords } from '@/src/utils/formatText.util';
import { Avatar, AvatarFallback } from '@lib/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { IconLoader } from '@ui/icons/IconLoader';
import { ProfileImage } from '@ui/images/ProfileImage';
import { TypewriterText } from '@ui/typewriter/TypewriterText';

/**
 * HeroCard component displays a profile card with typewriter animation for expertise.
 *
 * @param name - First name of the profile.
 * @param familyName - Last name of the profile.
 * @param expertises - List of expertise strings to animate.
 * @param services - List of services with icons and descriptions.
 * @param imageSrc - Source URL for the profile image.
 * @param imageAlt - Alt text for the profile image.
 * @param className - Additional class names for styling.
 */
export const HeroCard: React.FC<{
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

    const isSM = useIsSm();

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

    return (
      <>
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
                    'absolute z-0',
                    'scale-105 sm:scale-110',
                    '-top-2 md:-top-2.5',
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
                      'relative',
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
                  isSM ?? cn(cnFlexCol, 'w-full justify-center')
                )}
              >
                <h1 className={cn(cnTitle1)}>
                  {name && capitalizeFirstLetterOfEachWord(name)}{' '}
                  {familyName && familyName.toUpperCase()}
                </h1>
                <p className={cn(cnBigDescription, 'text-foreground')}>
                  Besoin d&apos;un développeur ?
                </p>
                <p
                  className={cn(
                    cnBigDescription,
                    cnFlexCol,
                    cnAutoHeightFullWidth,
                    'text-foreground',
                    'xxs:flex-row'
                  )}
                >
                  <span className='invisible h-0 w-0 xs:visible xs:h-auto xs:w-auto'>
                    Je suis&nbsp;
                  </span>
                  <span className='min-h-[1.75rem]'>
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
                    )}
                  </span>
                </p>
              </div>
            </CardTitle>
            <CardDescription className={cn(cnFlexCol, cnDescription)}>
              <p
                className={cn(
                  cnAutoHeightFullWidth,
                  cnLightTextMuted,
                  cnHiddenSmBlock
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
            {services &&
              services.length > 0 &&
              services.map((service, i) => (
                <Badge
                  variant='outline'
                  key={i}
                  className={cn(
                    cnSmallPadding,
                    cnFlexFullCenter,
                    cnSmallGap,
                    cnFlexCol,
                    'sm:flex-row',
                    i > 3 &&
                      'lg:col-span-2 lg:flex-row lg:justify-center xl:col-span-1 xl:flex-row',
                    cnSmallText,
                    'hyphens-auto break-words'
                  )}
                >
                  <IconLoader
                    icon={service.icon}
                    className={cn(cnSizeIcon, 'text-secondary')}
                  />
                  <p className={cn(cnFlexCol, 'text-center')}>
                    <span className='font-bold'>
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
      </>
    );
  }
);

HeroCard.displayName = 'HeroCard';
