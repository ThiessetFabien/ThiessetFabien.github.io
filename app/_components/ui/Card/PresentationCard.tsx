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
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';
import FooterCard from './LayoutCard/FooterCard';

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
  return (
    <CardHeader className={cn(cnGap, cnPadding, 'grid grid-cols-3')}>
      <div className='col-span-1'>
        <Image
          src={`/images/${imageSrc}`}
          alt={imageAlt || ''}
          width={205}
          height={316}
          priority
          className={'h-auto w-auto rounded-lg'}
        />
      </div>
      <div className={cn(cnFlexCol, 'col-span-2 justify-center')}>
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
