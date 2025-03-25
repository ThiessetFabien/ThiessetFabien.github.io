import React, { memo } from 'react';

import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
} from '@/src/lib/utils/formatText.util';
import { cnBorder2, cnBorderBottom4 } from '@/src/styles/border.style';
import { cnGapX, cnSmallGap, cnSmallSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@/src/styles/flex.style';
import {
  cnBigDescription,
  cnLightTextMuted,
  cnParagraph,
  cnSmallText,
  cnTitle1,
} from '@/src/styles/font.style';
import {
  cnHiddenSmBlock,
  cnHiddenXxsFlex,
  cnSmHidden,
  cnXxsHidden,
} from '@/src/styles/hideItem.style';
import { cnBigImage } from '@/src/styles/image.styles';
import { cnSizeAuto } from '@/src/styles/size.style';
import { cnLittleTranslateSm } from '@/src/styles/translate.style';
import type { ActionButtonProps } from '@/src/types/ActionButtonProps';
import { Avatar, AvatarFallback, AvatarImage } from '@lib/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { formatSpecialWords } from '../../../lib/utils/formatText.util';

export const HeroCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  content: CardProps['content'];
  imageSrc: CardProps['imageSrc'];
  imageAlt: CardProps['imageAlt'];
  cta1: ActionButtonProps['cta'];
  icon1: ActionButtonProps['icon'];
  href1: ActionButtonProps['href'];
  downloadActive1: ActionButtonProps['downloadActive'];
  cta2: ActionButtonProps['cta'];
  icon2: ActionButtonProps['icon'];
  href2: ActionButtonProps['href'];
  downloadActive2: ActionButtonProps['downloadActive'];
  cta3: ActionButtonProps['cta'];
  icon3: ActionButtonProps['icon'];
  href3: ActionButtonProps['href'];
  downloadActive3: ActionButtonProps['downloadActive'];
  className: CardProps['className'];
}> = memo(({ title, description, content, imageSrc, imageAlt, className }) => {
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
            {description &&
              capitalizeFirstLetterOfEachWord(formatSpecialWords(description))}
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
});

HeroCard.displayName = 'HeroCard';
