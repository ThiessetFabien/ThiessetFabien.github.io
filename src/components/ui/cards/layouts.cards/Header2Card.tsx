import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { cnDescription, cnTitle3 } from '@src/styles/font.style';
import type { CardProps } from '@src/types/CardProps';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

/**
 * HeaderCard component.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The card title with the first letter capitalized.
 * @param {string} [props.description] - Optional card description, formatted with special words handled and the first letter capitalized.
 * @param {string} [props.className] - Optional CSS class for custom styles.
 *
 * @returns {JSX.Element} The rendered HeaderCard component.
 */
export const Header2Card: React.FC<{
  title?: CardProps['title'];
  description?: CardProps['description'];
  className?: CardProps['className'];
}> = ({
  title,
  description,
  className,
}: {
  title?: string;
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
          <h3 className={cnTitle3}>
            {title && capitalizeFirstLetterOfPhrase(title)}
          </h3>
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
