import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import {
  cnTitle1,
  cnBigDescription,
  cnSmallText,
  cnLightTextMuted,
  cnParagraph,
} from '@/styles/fontStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
} from '@/hooks/FormatText';
import {
  cnGap,
  cnMarginTop,
  cnSmallGap,
  cnSmallSpaceY,
} from '@/styles/boxModelStyles';
import { cnHiddenSm, cnHiddenXxs } from '@/styles/hideItemStyles';
import type { CardProps } from '@/types/CardProps';
import FooterCard from './LayoutCard/FooterCard';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/lib/components/ui/avatar';

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
  cta4: CardProps['cta4'];
  icon4: CardProps['icon4'];
  href4: CardProps['href4'];
  downloadActive4: CardProps['downloadActive4'];
  cta5: CardProps['cta5'];
  icon5: CardProps['icon5'];
  href5: CardProps['href5'];
  downloadActive5: CardProps['downloadActive5'];
  className: CardProps['className'];
}> = ({
  title,
  description,
  content,
  imageSrc,
  imageAlt,
  cta1,
  icon1,
  href1,
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  cta3,
  icon3,
  href3,
  downloadActive3,
  className,
}) => {
  return (
    <CardHeader className={className}>
      <CardTitle className={cn('relative flex h-auto w-full', cnGap)}>
        <div
          className={cn(
            cnFlexFullCenter,
            'h-full w-auto',
            'relative z-30',
            'max-h-[92px] min-h-[92px] min-w-[92px] max-w-[92px]',
            'sm:max-h-[132px] sm:min-h-[132px] sm:min-w-[132px] sm:max-w-[132px]',
            'md:max-h-[124px] md:min-h-[124px] md:min-w-[124px] md:max-w-[124px]',
            'rounded-full border-2 border-primary'
          )}
        >
          <div
            className={cn(
              'h-full w-auto',
              'relative z-50',
              'max-h-[92px] min-h-[92px] min-w-[92px] max-w-[92px]',
              'sm:max-h-[132px] sm:min-h-[132px] sm:min-w-[132px] sm:max-w-[132px]',
              'md:max-h-[124px] md:min-h-[124px] md:min-w-[124px] md:max-w-[124px]',
              'rounded-full border-b-4 border-primary'
            )}
          />
          <Avatar
            className={cn(
              'absolute z-0 h-auto',
              'scale-105 sm:scale-110',
              '-top-2 md:-top-2.5',
              'max-h-[92px] min-h-[92px] min-w-[92px] max-w-[92px]',
              'sm:max-h-[132px] sm:min-h-[132px] sm:min-w-[132px] sm:max-w-[132px]',
              'md:max-h-[124px] md:min-h-[124px] md:min-w-[124px] md:max-w-[124px]'
            )}
          >
            <AvatarImage
              src={imageSrc || ''}
              alt={imageAlt || ''}
              className={cn(
                'relative h-auto w-auto rounded-full',
                'sm:-translate-y-0.5',
                'max-h-[92px] min-h-[92px] min-w-[92px] max-w-[92px]',
                'sm:max-h-[132px] sm:min-h-[132px] sm:min-w-[132px] sm:max-w-[132px]',
                'md:max-h-[124px] md:min-h-[124px] md:min-w-[124px] md:max-w-[124px]'
              )}
              loading='eager'
            />
            <AvatarFallback
              className={cn(
                cnSmallText,
                'relative h-auto w-auto rounded-full',
                'sm:-translate-y-0.5',
                'max-h-[92px] min-h-[92px] min-w-[92px] max-w-[92px]',
                'sm:max-h-[132px] sm:min-h-[132px] sm:min-w-[132px] sm:max-w-[132px]',
                'md:max-h-[124px] md:min-h-[124px] md:min-w-[124px] md:max-w-[124px]'
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
              cnHiddenXxs,
              'max-w-prose'
            )}
          >
            {description && capitalizeFirstLetterOfPhrase(description)}
            <p
              className={cn(
                cnParagraph,
                cnHiddenSm,
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
          'sm:hidden',
          'max-w-prose'
        )}
      >
        <p className={cn(cnBigDescription, cnLightTextMuted, 'xxs:hidden')}>
          {description && capitalizeFirstLetterOfPhrase(description)}
        </p>
        <p className={cn(cnParagraph)}>
          {typeof content === 'string' &&
            capitalizeFirstLetterOfPhrase(content)}
        </p>
      </CardContent>
      <FooterCard
        cta1={cta1}
        icon1={icon1}
        href1={href1}
        downloadActive1={downloadActive1}
        cta2={cta2}
        icon2={icon2}
        href2={href2}
        downloadActive2={downloadActive2}
        cta3={cta3}
        icon3={icon3}
        href3={href3}
        downloadActive3={downloadActive3}
        className={cn(cnMarginTop)}
      />
    </CardHeader>
  );
};
