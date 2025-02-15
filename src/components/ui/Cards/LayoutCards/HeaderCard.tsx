import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { cnDescription, cnTitle2, cnTitle2Size } from '@styles/fontStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@utils/FormatText';

export const HeaderCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  className: CardProps['className'];
  index: number;
}> = ({ title, description, className, index }) => {
  return (
    <header>
      <CardHeader className={className}>
        <CardTitle
          className={cn(
            cnTitle2,
            index === 2 || index === 3 || index === 4 || index === 9
              ? cnTitle2Size
              : ''
          )}
          aria-label={title}
        >
          {title && capitalizeFirstLetterOfEachWord(title)}
        </CardTitle>
        {description && (
          <CardDescription className={cnDescription} aria-label={description}>
            {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
          </CardDescription>
        )}
      </CardHeader>
    </header>
  );
};
