import React, { memo } from 'react';

import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
} from '@/hooks/FormatText';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/lib/components/ui/avatar';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { cnBorder2, cnBorderBottom4 } from '@/styles/borderStyles';
import { cnGapX, cnSmallGap, cnSmallSpaceY } from '@/styles/boxModelStyles';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import {
  cnTitle1,
  cnBigDescription,
  cnSmallText,
  cnLightTextMuted,
  cnParagraph,
} from '@/styles/fontStyles';
import {
  cnHiddenSmBlock,
  cnHiddenXxsFlex,
  cnSmHidden,
  cnXxsHidden,
} from '@/styles/hideItemStyles';
import { cnBigImage } from '@/styles/imageStyles';
import { cnSizeAuto } from '@/styles/sizeStyles';
import { cnLittleTranslateSm } from '@/styles/translateStyles';
import type { CardProps } from '@/types/CardProps';

export const PresentationCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  content: CardProps['content'];
  imageSrc: CardProps['imageSrc'];
  imageAlt: CardProps['imageAlt'];
  cta1: CardProps['cta1'];
  icon1: CardProps['icon1'];
  href1: CardProps['href1'];
  downloadActive1: CardProps['downloadActive1'];
  cta2: CardProps['cta2'];
  icon2: CardProps['icon2'];
  href2: CardProps['href2'];
  downloadActive2: CardProps['downloadActive2'];
  cta3: CardProps['cta3'];
  icon3: CardProps['icon3'];
  href3: CardProps['href3'];
  downloadActive3: CardProps['downloadActive3'];
  className: CardProps['className'];
}> = memo(
  ({
    title,
    description,
    content,
    imageSrc,
    imageAlt,
    className,
  }) => {
    return (
      <CardHeader className={className}>
        <CardTitle className={cn('relative flex h-auto w-full', cnGapX)}>
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
              <AvatarImage
                src={imageSrc || ''}
                alt={imageAlt || ''}
                className={cn(
                  'relative rounded-full',
                  cnSizeAuto,
                  cnLittleTranslateSm,
                  cnBigImage
                )}
                loading='eager'
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
          <div className={cn(cnFlexCol, 'justify-center')}>
            <h2 className={cnTitle1}>
              {title && capitalizeFirstLetterOfEachWord(title)}
            </h2>
            <CardDescription
              className={cn(
                cnFlexCol,
                cnSmallGap,
                cnBigDescription,
                cnHiddenXxsFlex,
                'max-w-prose'
              )}
            >
              {description && capitalizeFirstLetterOfPhrase(description)}
              <p
                className={cn(
                  cnParagraph,
                  cnHiddenSmBlock,
                  'text-foreground',
                  'max-w-prose'
                )}
              >
                {typeof content === 'string' &&
                  capitalizeFirstLetterOfPhrase(content)}
              </p>
            </CardDescription>
          </div>
        </CardTitle>
        <CardContent
          className={cn(
            cnSmallSpaceY,
            'xxs:space-y-0',
            'p-0',
            cnSmHidden,
            'max-w-prose'
          )}
        >
          <p className={cn(cnBigDescription, cnLightTextMuted, cnXxsHidden)}>
            {description && capitalizeFirstLetterOfPhrase(description)}
          </p>
          <p className={cn(cnParagraph)}>
            {typeof content === 'string' &&
              capitalizeFirstLetterOfPhrase(content)}
          </p>
        </CardContent>
      </CardHeader>
    );
  }
);

PresentationCard.displayName = 'PresentationCard';
