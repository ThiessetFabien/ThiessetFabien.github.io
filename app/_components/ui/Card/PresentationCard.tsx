import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import { cnBorder } from '@/styles/borderStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import { cnGap, cnPadding } from '@/styles/boxModelStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type CardProps from '@/types/CardProps';

const PresentationCard: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
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
      </div>
    </CardHeader>
  );
};

export default PresentationCard;
