import type CardProps from '@/types/CardProps';
import { cn } from '@/lib/utils';
import { cnPadding } from '@/styles/boxModelStyles';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import {
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';

export const HeaderCard: React.FC<CardProps> = ({ title, description }) => {
  return (
    <CardHeader className={cn(cnPadding, 'space-y-0')}>
      <CardTitle className={cnTitle1}>
        <h2>{title}</h2>
      </CardTitle>
      <CardDescription className={cnDescription}>{description}</CardDescription>
    </CardHeader>
  );
};
