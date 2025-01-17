import type { CardProps } from '@/types/CardProps';
import { cn } from '@/lib/utils';
import {
  cnDescription,
  cnTitle2,
  cnTitle2Size,
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/styles/fontStyles';
import {
  CardTitle,
  CardDescription,
  CardHeader,
} from '@/lib/components/ui/card';

export const HeaderCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  className: CardProps['className'];
  index: number;
}> = ({ title, description, className, index }) => {
  return (
    <CardHeader className={className}>
      <CardTitle
        className={cn(
          cnTitle2,
          index === 2 || index === 4 || index === 5 || index === 10
            ? cnTitle2Size
            : ''
        )}
      >
        {title && capitalizeFirstLetterOfEachWord(title)}
      </CardTitle>
      <CardDescription className={cnDescription}>
        {description &&
          capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
      </CardDescription>
    </CardHeader>
  );
};
