/**
 * @file CallToAction.tsx
 * @description This component renders call-to-action buttons with dynamic icons.
 */
import React from 'react';
import ActionButton from '@/ui/CallToAction/ActionButton';
import type { CardProps } from '@/types/CardProps';
import type { ActionButtonProps } from '@/types/ActionButtonProps';
import { cn } from '@/lib/utils';
import { cnSmallGap } from '@/styles/boxModelStyles';

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
export const FooterCard: React.FC<CardProps & ActionButtonProps> = ({
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
  cta4,
  icon4,
  href4,
  downloadActive4,
  className,
}) => {
  const renderActionButton = (cta, icon, href, downloadActive, variant) => {
    return (cta && href) || (icon && href) ? (
      <ActionButton
        cta={cta || ''}
        icon={icon || ''}
        href={href || ''}
        downloadActive={downloadActive || undefined}
        variant={variant}
      />
    ) : null;
  };

  return (
    <div className={cn('flex flex-wrap', cnSmallGap, className)}>
      {renderActionButton(cta1, icon1, href1, downloadActive1, 'default')}
      {renderActionButton(cta2, icon2, href2, downloadActive2, 'outline')}
      {renderActionButton(cta3, icon3, href3, downloadActive3, 'outline')}
      {renderActionButton(cta4, icon4, href4, downloadActive4, 'outline')}
    </div>
  );
};

export default FooterCard;
