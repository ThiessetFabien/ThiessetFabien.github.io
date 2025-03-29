import { motion } from 'framer-motion';
import React, { memo, useEffect, useState, useCallback } from 'react';

import { Badge } from '@/src/lib/components/ui/badge';
import { cnBorder2, cnBorderBottom4 } from '@/src/styles/border.style';
import {
  cnSmallGap,
  cnSmallPadding,
  cnSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import {
  cnBigDescription,
  cnDescription,
  cnSmallText,
  cnTitle1,
} from '@/src/styles/font.style';
import { cnBigImage } from '@/src/styles/image.styles';
import { ResponsiveImage } from '@/src/styles/mediaQueries.style';
import { cnSizeAuto } from '@/src/styles/size.style';
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

const Cursor = () => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5,
      }}
      className='font-bold text-primary'
    >
      {' '}
      |
    </motion.span>
  );
};

/**
 * Component for animating typewriter text.
 */
const TypewriterText: React.FC<{
  text: string;
  typingSpeed?: number;
  delayBeforeStart?: number;
  delayBeforeDelete?: number;
  onComplete?: () => void;
  className?: string;
}> = ({
  text,
  typingSpeed = 70,
  delayBeforeStart = 300,
  delayBeforeDelete = 1200,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);
    setIsDeleting(false);

    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delayBeforeStart);

    return () => clearTimeout(startTimer);
  }, [text, delayBeforeStart]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping && currentIndex < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (isTyping && currentIndex === text.length) {
      timer = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
        setCurrentIndex(text.length);
      }, delayBeforeDelete);
    } else if (isDeleting && currentIndex > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, typingSpeed / 1.5);
    } else if (isDeleting && currentIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        if (onComplete) onComplete();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [
    isTyping,
    isDeleting,
    currentIndex,
    text,
    typingSpeed,
    delayBeforeDelete,
    onComplete,
  ]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {(isTyping || isDeleting) && <Cursor />}
    </span>
  );
};

/**
 * HeroCard component displaying a profile with typewriter animation for expertise.
 */
export const HeroCard: React.FC<{
  name: CardProps['name'];
  familyName: CardProps['familyName'];
  expertises: CardProps['expertises'];
  services: CardProps['services'];
  imageSrc: CardProps['imageSrc'];
  imageAlt: CardProps['imageAlt'];
  className: CardProps['className'];
}> = memo(
  ({
    name,
    familyName,
    expertises,
    services,
    imageSrc,
    imageAlt,
    className,
  }) => {
    const [currentExpertiseIndex, setCurrentExpertiseIndex] = useState(0);
    const [showExpertise, setShowExpertise] = useState(true);

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
          <CardHeader className={className}>
            <CardTitle
              className={cn('flex', cnSpaceY, cnFlexCol, cnFlexFullCenter)}
            >
              <div
                className={cn(
                  cnFlexFullCenter,
                  'h-full w-auto',
                  'relative z-30',
                  cnBigImage,
                  'rounded-full border-primary',
                  cnBorder2
                )}
              >
                <div
                  className={cn(
                    'h-full w-auto',
                    'relative z-50',
                    cnBigImage,
                    'rounded-full border-primary',
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
                      'relative rounded-full',
                      cnSizeAuto,
                      cnLittleTranslateSm,
                      cnBigImage
                    )}
                  />
                  <AvatarFallback
                    className={cn(
                      cnSmallText,
                      'relative rounded-full',
                      cnSizeAuto,
                      cnLittleTranslateSm,
                      cnBigImage
                    )}
                  >
                    Profile
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className={cn(cnTitle1)}>
                {name && capitalizeFirstLetterOfEachWord(name)}{' '}
                {familyName && familyName.toUpperCase()}
              </h1>
            </CardTitle>
            <CardDescription
              className={cn(cnFlexCol, cnFlexFullCenter, cnBigDescription)}
            >
              <p className={cn(cnDescription, 'text-foreground')}>
                Besoin d&apos;un dev ?
              </p>
              <div
                className={cn(
                  cnDescription,
                  'text-foreground',
                  'flex h-auto flex-col xxs:flex-row',
                  'w-full items-center justify-center'
                )}
              >
                <span className='invisible h-0 w-0 xs:visible xs:h-auto xs:w-auto'>
                  Je suis&nbsp;
                </span>
                <div className='min-h-[1.75rem]'>
                  {showExpertise && expertises && expertises.length > 0 && (
                    <TypewriterText
                      text={capitalizeFirstLetterOfEachWord(
                        formatSpecialWords(expertises[currentExpertiseIndex])
                      )}
                      typingSpeed={60}
                      delayBeforeStart={500}
                      delayBeforeDelete={1500}
                      onComplete={handleExpertiseComplete}
                      className='text-center text-primary'
                    />
                  )}
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent
            className={cn(
              'flex flex-wrap justify-center',
              'mx-auto max-w-3xl',
              'my-2 gap-2 sm:gap-3'
            )}
          >
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <Badge
                  variant='outline'
                  key={index}
                  className={cn(
                    cnSmallPadding,
                    cnSmallGap,
                    'flex flex-grow sm:flex-grow-0',
                    'basis-[calc(100%/3)] md:basis-auto',
                    'min-w-3xl sm:min-w-auto sm:flex-col md:flex-row',
                    index < 4 && 'flex-col md:flex-row',
                    index === 4 && 'justify-center'
                  )}
                >
                  <IconLoader
                    icon={service.icon}
                    className='h-4 w-4 flex-shrink-0 text-secondary'
                  />
                  <span className={cn('break-words text-center', cnSmallText)}>
                    {capitalizeFirstLetterOfPhrase(
                      formatSpecialWords(service.item)
                    )}
                  </span>
                </Badge>
              ))}
          </CardContent>
        </div>
      </>
    );
  }
);

HeroCard.displayName = 'HeroCard';
