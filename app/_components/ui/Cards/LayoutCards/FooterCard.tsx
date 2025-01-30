/**
 * @file CallToAction.tsx
 * @description This component renders call-to-action buttons with dynamic icons.
 */
import { motion } from 'framer-motion';
import React from 'react';

import { useIsXs } from '@/hooks/useMediaQueries';
import { cn } from '@/lib/utils';
import { cnSmallGap } from '@/styles/boxModelStyles';
import type { ActionButtonProps } from '@/types/ActionButtonProps';
import type { CardProps } from '@/types/CardProps';
import { ActionButton } from '@/ui/Buttons/ActionButton';

/**
 * FooterCard component props.
 * @typedef {Object} CardProps
 * @property {string} cta1 - The text for the first call-to-action button.
 * @property {string} icon1 - The icon for the first call-to-action button.
 * @property {string} href1 - The href for the first call-to-action button.
 * @property {boolean} downloadActive1 - Whether the first call-to-action button should trigger a download.
 * @property {string} cta2 - The text for the second call-to-action button.
 * @property {string} icon2 - The icon for the second call-to-action button.
 * @property {string} href2 - The href for the second call-to-action button.
 * @property {boolean} downloadActive2 - Whether the second call-to-action button should trigger a download.
 */

/**
 * FooterCard component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FooterCard: React.FC<{
  mailto?: CardProps['mailto'];
  cta1?: CardProps['cta1'];
  icon1?: CardProps['icon1'];
  href1?: CardProps['href1'];
  downloadActive1?: CardProps['downloadActive1'];
  cta2?: CardProps['cta2'];
  icon2?: CardProps['icon2'];
  href2?: CardProps['href2'];
  downloadActive2?: CardProps['downloadActive2'];
  cta3?: CardProps['cta3'];
  icon3?: CardProps['icon3'];
  href3?: CardProps['href3'];
  downloadActive3?: CardProps['downloadActive3'];
  className: CardProps['className'];
}> = ({
  mailto,
  cta1,
  icon1,
  href1,
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  cta3,
  icon3,
  href3,
  downloadActive3,
  className,
}) => {
  const renderActionButton = (
    icon: ActionButtonProps['icon'],
    href?: ActionButtonProps['href'],
    cta?: ActionButtonProps['cta'],
    downloadActive?: ActionButtonProps['downloadActive'],
    variant?: ActionButtonProps['variant'],
    mailto?: CardProps['mailto']
  ) => {
    return (
      icon &&
      (href || mailto) && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <ActionButton
            icon={icon || ''}
            href={mailto ? mailto : href || ''}
            cta={cta || ''}
            downloadActive={downloadActive || undefined}
            variant={variant}
            type={mailto ? 'submit' : 'button'}
            aria-label={cta || ''}
            className={className}
          />
        </motion.div>
      )
    );
  };
  const isXs = useIsXs();

  function hideCta(cta: string | undefined): string | undefined {
    return !isXs ? cta : '';
  }

  return (
    <footer className={cn('flex flex-wrap', cnSmallGap, className)}>
      {renderActionButton(
        icon1,
        href1,
        cta1,
        downloadActive1,
        'default',
        mailto
      )}
      {renderActionButton(
        icon2,
        href2,
        hideCta(cta2),
        downloadActive2,
        'secondary'
      )}
      {renderActionButton(
        icon3,
        href3,
        hideCta(cta3),
        downloadActive3,
        'outline'
      )}
    </footer>
  );
};

export default FooterCard;
