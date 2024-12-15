import Image from 'next/image';
import { CardTitle, CardDescription } from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { cnBorder } from '@/styles/borderStyles';
import { cnFlexCenterY, cnFlexCol } from '@/styles/flexStyles';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import { cnGap, cnPadding, cnSpaceX } from '@/styles/boxModelStyles';
import { cnSpaceY, cnMarginTop } from '@/styles/boxModelStyles';
import { CallToAction } from '@/ui/CallToAction/CallToAction';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';
import { CardHeader } from '@/lib/components/ui/card';
import useIsXS from '@/styles/useMediaQuery';
import { use } from 'react';

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
}) => {
  const isXs = useIsXS();

  return (
    <CardHeader className={cn(cnGap, cnPadding, 'grid grid-cols-3')}>
      <div className='col-span-1'>
        <Image
          src={`/images/${imageSrc}`}
          alt={imageAlt || ''}
          width={205}
          height={316}
          priority
          className={cn(cnBorder, 'h-auto w-auto')}
        />
      </div>
      <div className={cn(cnFlexCol, 'col-span-2 justify-center')}>
        <CardTitle className={cnTitle1}>
          <h2>{title}</h2>
        </CardTitle>
        <CardDescription className={cn(cnDescription, cnHiddenXs)}>
          <p>{description}</p>
        </CardDescription>
        <CallToAction
          className={cn(
            cnSpaceX,
            cnMarginTop,
            'w-auto',
            'xs: items-center xs:flex'
          )}
          cta1={cta1}
          icon1={icon1}
          href1={href1}
          downloadActive1={downloadActive1}
          icon2={isXs ? undefined : icon2}
          cta2={isXs ? undefined : cta2}
          href2={isXs ? undefined : href2}
          downloadActive2={isXs ? undefined : downloadActive2}
        />
      </div>
    </CardHeader>
  );
};

export default PresentationCard;
