import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { cnCenteredText, cnResponsiveTextPadding } from '@styles';
import { cnDescription, cnTitle3 } from '@styles/font.style';
import type { HeaderCardProps } from '@src/types/HeaderProps';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

/**
 * Composant d'en-tête secondaire pour les cartes
 * Affiche un titre avec première lettre en majuscule et optionnellement une description
 *
 * @param {HeaderCardProps} props - Propriétés du composant
 * @returns {JSX.Element} Le composant Header2Card rendu
 */
export const Header2Card = ({
  title,
  description,
  className,
}: HeaderCardProps): JSX.Element => (
  <header>
    <CardHeader className={cn(className, cnCenteredText)}>
      <CardTitle
        className={cn('max-w-full', cnCenteredText)}
        aria-label={title}
      >
        <h3 className={cnTitle3}>
          {title && capitalizeFirstLetterOfPhrase(title)}
        </h3>
      </CardTitle>
      {description && (
        <CardDescription
          className={cn(cnDescription, cnResponsiveTextPadding)}
          aria-label={description}
        >
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
        </CardDescription>
      )}
    </CardHeader>
  </header>
);
