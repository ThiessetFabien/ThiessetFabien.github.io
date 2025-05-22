/**
 * @file FooterCard.tsx
 * @description Ce composant affiche les boutons d'action dans le pied de page.
 */

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@lib/utils';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';
import { CONTAINER_CLASSES } from '@src/config/css-classes';
import { useIsXs } from '@src/styles/mediaQueries.style';
import type { ActionButtonProps } from '@src/types/ActionButtonProps';
import type { FooterCardProps } from '@src/types/FooterProps';
import { buttonAnimation } from '@src/utils/motion.util';

/**
 * Composant FooterCard qui affiche les boutons d'action dans le pied de page
 * @param {FooterCardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant rendu
 */
export const FooterCard = ({
  mailto,
  cta1,
  icon1,
  href1,
  downloadActive1,
  disabled1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  cta3,
  icon3,
  href3,
  downloadActive3,
  className,
}: FooterCardProps): JSX.Element => {
  /**
   * Rend un bouton d'action avec animation
   * @param {ActionButtonProps['icon']} icon - L'icône du bouton
   * @param {ActionButtonProps['href']} href - L'URL du bouton
   * @param {ActionButtonProps['cta']} cta - Le texte d'appel à l'action
   * @param {ActionButtonProps['downloadActive']} downloadActive - Indique si le téléchargement est activé
   * @param {ActionButtonProps['disabled']} disabled - Indique si le bouton est désactivé
   * @param {ActionButtonProps['variant']} variant - La variante de style du bouton
   * @param {CardProps['mailto']} mailtoLink - Adresse email pour le lien mailto
   * @returns {JSX.Element | null} Le bouton d'action rendu ou null
   */
  const renderActionButton = (
    icon: ActionButtonProps['icon'],
    href?: ActionButtonProps['href'],
    cta?: ActionButtonProps['cta'],
    downloadActive?: ActionButtonProps['downloadActive'],
    disabled?: ActionButtonProps['disabled'],
    variant?: ActionButtonProps['variant'],
    mailtoLink?: string
  ): JSX.Element | null =>
    icon && (href || mailtoLink) ? (
      <motion.div
        whileHover={buttonAnimation.hover}
        whileTap={buttonAnimation.tap}
      >
        <ActionButton
          icon={icon}
          href={mailtoLink || href || ''}
          cta={cta || ''}
          downloadActive={downloadActive}
          disabled={disabled}
          variant={variant}
          type={mailtoLink ? 'submit' : 'button'}
          aria-label={cta || ''}
          className={className}
        />
      </motion.div>
    ) : null;
  const isXs = useIsXs();

  /**
   * Masque le texte du bouton sur les petits écrans
   * @param {string | undefined} cta - Le texte à masquer si nécessaire
   * @returns {string | undefined} Le texte masqué ou le texte original
   */
  const hideCta = (cta: string | undefined): string | undefined => !isXs ? cta : '';

  return (
    <footer
      className={cn('flex flex-wrap', CONTAINER_CLASSES.SMALL_GAP, className)}
    >
      {renderActionButton(
        icon1,
        href1,
        cta1,
        downloadActive1,
        disabled1,
        'default',
        mailto
      )}
      {renderActionButton(
        icon2,
        href2,
        hideCta(cta2),
        downloadActive2,
        undefined,
        'secondary'
      )}
      {renderActionButton(
        icon3,
        href3,
        hideCta(cta3),
        downloadActive3,
        undefined,
        'outline'
      )}
    </footer>
  );
};

export default FooterCard;
