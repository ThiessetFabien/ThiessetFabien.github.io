/**
 * @file CallToAction.tsx
 * @description This component renders call-to-action buttons with dynamic icons.
 */

'use client';
import React from 'react';
import ActionButton from '../../CallToAction/ActionButton';
import CardProps from '@/types/CardProps';
import { cn } from '@/lib/utils';
import { cnGap } from '@/styles/boxModelStyles';

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
export const FooterCard: React.FC<CardProps> = ({
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
  return (
    <div className={cn('flex flex-wrap', cnGap, className)}>
      {(cta1 && href1) || (icon1 && href1) ? (
        <ActionButton
          cta={cta1 || ''}
          icon={icon1 || ''}
          href={href1 || ''}
          downloadActive={downloadActive1 || undefined}
          variant='default'
        />
      ) : null}
      {(cta2 && href2) || (icon2 && href2) ? (
        <ActionButton
          cta={cta2 || ''}
          icon={icon2 || ''}
          href={href2 || ''}
          downloadActive={downloadActive2 || undefined}
          variant='outline'
        />
      ) : null}
      {(cta3 && href3) || (icon3 && href3) ? (
        <ActionButton
          cta={cta3 || ''}
          icon={icon3 || ''}
          href={href3 || ''}
          downloadActive={downloadActive3 || undefined}
          variant='outline'
        />
      ) : null}
      {(cta4 && href4) || (icon4 && href4) ? (
        <ActionButton
          cta={cta4 || ''}
          icon={icon4 || ''}
          href={href4 || ''}
          downloadActive={downloadActive4 || undefined}
          variant='outline'
        />
      ) : null}
    </div>
  );
};

export default FooterCard;
