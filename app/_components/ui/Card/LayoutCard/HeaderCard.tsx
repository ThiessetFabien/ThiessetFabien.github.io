import type CardProps from '@/types/CardProps';
import { cn } from '@/lib/utils';
import { cnPadding } from '@/styles/boxModelStyles';
import { cnDescription, cnTitle2, cnTitle2Size } from '@/styles/fontStyles';
import {
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';

export const HeaderCard: React.FC<CardProps> = ({
  title,
  description,
  index,
}) => {
  return (
    <CardHeader className={cn(cnPadding)}>
      <CardTitle
        className={cn(cnTitle2, index === 2 || index === 4 ? cnTitle2Size : '')}
      >
        {title}
      </CardTitle>
      <CardDescription className={cnDescription}>{description}</CardDescription>
    </CardHeader>
  );
};
