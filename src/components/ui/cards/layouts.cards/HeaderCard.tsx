import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { cnDescription, cnTitle2, cnTitle2Size } from '@src/styles/font.style';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

/**
 * HeaderCard component.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The card title, displayed in uppercase with each word capitalized.
 * @param {string} [props.description] - Optional card description, formatted with special words handled and the first letter capitalized.
 * @param {string} [props.className] - Optional CSS class for custom styles.
 *
 * @returns {JSX.Element} The rendered HeaderCard component.
 */
export const HeaderCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  className: CardProps['className'];
}> = ({
  title,
  description,
  className,
}: {
  title: string | undefined;
  description?: string;
  className?: string;
}): JSX.Element => {
  return (
    <header>
      <CardHeader
        className={cn(className, 'hyphens-auto break-words text-center')}
      >
        <CardTitle
          className={cn('hyphens-auto break-words text-center')}
          aria-label={title}
        >
          <h2 className={cn(cnTitle2, cnTitle2Size)}>
            {title &&
              capitalizeFirstLetterOfEachWord(title.toLocaleUpperCase())}
          </h2>
        </CardTitle>
        {description && (
          <CardDescription
            className={cn(cnDescription, 'px-1 sm:px-0')}
            aria-label={description}
          >
            {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
          </CardDescription>
        )}
      </CardHeader>
    </header>
  );
};
