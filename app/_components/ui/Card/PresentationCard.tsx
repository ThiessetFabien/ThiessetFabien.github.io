import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import { cnGap, cnMarginTop, cnPadding } from '@/styles/boxModelStyles';
import { cnHiddenSm, cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';
import FooterCard from './LayoutCard/FooterCard';
import {
  useIsMd,
  useIsLg,
  useIsXl,
  useIsXs,
  useIsXxs,
} from '@/hooks/useMediaQuery';
import { getImageSrc } from '@/hooks/getImageSrc';

const PresentationCard: React.FC<CardProps> = ({
  title,
  description,
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
}) => {
  const isXxs = useIsXxs();
  const isXs = useIsXs();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();

  return (
    <CardHeader className={cn(cnGap, cnPadding, 'flex flex-row space-y-0')}>
      <div className='h-full w-auto flex-shrink-0'>
        <Image
          src={getImageSrc(imageSrc || '', isXxs, isXs, isMd, isLg, isXl)}
          alt={imageAlt || ''}
          height={310}
          width={201}
          priority
          className={cn(
            'block w-auto rounded-lg',
            'xs:min-h-[292px] sm:min-h-[14.5rem] md:min-h-[16.75rem] lg:min-h-[19.375rem] xl:min-h-[13.25rem]'
          )}
        />
      </div>
      <div className={cn(cnFlexCol, 'justify-center')}>
        <CardTitle className={cnTitle1}>
          <h2>{title}</h2>
        </CardTitle>
        <CardDescription className={cn(cnDescription, cnHiddenXs)}>
          <p>{description}</p>
        </CardDescription>
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
          className={cnMarginTop}
        />
      </div>
    </CardHeader>
  );
};

export default PresentationCard;
