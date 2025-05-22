import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { TEXT_CLASSES } from '@src/config/css-classes';
import { cnDescription, cnTitle2, cnTitle2Size } from '@src/styles/font.style';
import type { HeaderCardProps } from '@src/types/HeaderProps';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

/**
 * Composant d'en-tête principal pour les cartes
 * Affiche un titre en majuscules et optionnellement une description
 *
 * @param {HeaderCardProps} props - Propriétés du composant
 * @returns {JSX.Element} Le composant Header1Card rendu
 */
export const Header1Card = ({
  title,
  description,
  className,
}: HeaderCardProps): JSX.Element => (
  <header>
    <CardHeader className={cn(className, TEXT_CLASSES.CENTERED_TEXT)}>
      <CardTitle className={cn(TEXT_CLASSES.CENTERED_TEXT)} aria-label={title}>
        <h2 className={cn(cnTitle2, cnTitle2Size)}>
          {title && title.toLocaleUpperCase()}
        </h2>
      </CardTitle>
      {description && (
        <CardDescription
          className={cn(cnDescription, TEXT_CLASSES.RESPONSIVE_PADDING)}
          aria-label={description}
        >
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(description))}
        </CardDescription>
      )}
    </CardHeader>
  </header>
);
