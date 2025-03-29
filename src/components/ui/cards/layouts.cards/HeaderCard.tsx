import { cnDescription, cnTitle2, cnTitle2Size } from '@/src/styles/font.style';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

/**
 * A React functional component that renders a header card with a title and an optional description.
 *
 * @component
 * @param {Object} props - The props object for the HeaderCard component.
 * @param {string} props.title - The title of the card, which will be displayed in uppercase and formatted with each word capitalized.
 * @param {string} [props.description] - An optional description for the card, formatted with special words handled and the first letter of the phrase capitalized.
 * @param {string} [props.className] - An optional CSS class name to apply custom styles to the card header.
 *
 * @returns {JSX.Element} A header element containing the card title and optional description.
 */
export const HeaderCard: React.FC<{
  title: CardProps['title'];
  description: CardProps['description'];
  className: CardProps['className'];
}> = ({ title, description, className }) => {
  return (
    <header>
      <CardHeader className={className}>
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
