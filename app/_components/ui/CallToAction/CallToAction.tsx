'use client';
import React from 'react';
import ActionButton from './ActionButton';
import { cn } from '@/lib/utils';
import type CardProps from '@/types/CardProps';

/**
 * @file CallToAction.tsx
 * @description This component renders call-to-action buttons with dynamic icons.
 */

/**
 * CallToAction component.
 * @param {CardProps} props - The props for the component.
 * @param {string} [props.cta1] - The text for the first call-to-action button.
 * @param {string} [props.icon1] - The icon for the first call-to-action button.
 * @param {string} [props.href1] - The href for the first call-to-action button.
 * @param {boolean} props.downloadActive1 - Whether the first call-to-action button should trigger a download.
 * @param {string} [props.cta2] - The text for the second call-to-action button.
 * @param {string} [props.icon2] - The icon for the second call-to-action button.
 * @param {string} [props.href2] - The href for the second call-to-action button.
 * @param {boolean} props.downloadActive2 - Whether the second call-to-action button should trigger a download.
 * @returns {JSX.Element} The rendered component.
 */

export const CallToAction: React.FC<CardProps> = ({
  cta1,
  icon1,
  href1,
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
  className,
}: CardProps): JSX.Element => {
  return (
    <div className={cn(className)}>
      {(cta1 && href1) || (icon1 && href1) ? (
        <ActionButton
          cta={cta1 || ''}
          icon={icon1 || ''}
          href={href1}
          downloadActive={downloadActive1 || false}
          variant='default'
        />
      ) : null}
      {(cta2 && href2) || (icon2 && href2) ? (
        <ActionButton
          cta={cta2 || ''}
          icon={icon2 || ''}
          href={href2}
          downloadActive={downloadActive2 || false}
          variant='outline'
        />
      ) : null}
    </div>
  );
};

export default CallToAction;
