import React from 'react';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { IconLoader } from '@/hooks/IconLoader';
import { cnButton, cnButtonIcon } from '@/styles/buttonStyles';
import type { ActionButtonProps } from '@/types/ActionButtonProps';
import { cnSmallText } from '@/styles/fontStyles';
import { baseUrl } from '@/utils/constants/baseUrl';

/**
 * @file ActionButton.tsx
 * @description This file exports a reusable button component.
 */

/**
 * ActionButton component.
 * @param {ActionButton} props - The props for the component.
 * @param {string} props.href - The URL that the button links to.
 * @param {string} props.icon - The icon to display in the button.
 * @param {string} props.text - The text to display in the button.
 * @param {boolean} props.download - Whether the button should trigger a download.
 * @returns {JSX.Element} The rendered component.
 */

export const ActionButton: React.FC<ActionButtonProps> = ({
  cta,
  icon,
  href,
  downloadActive,
  variant,
}) => {
  return (
    <a
      href={
        href &&
        (href.startsWith('#') ||
          href.startsWith('tel:') ||
          href.startsWith('documents/'))
          ? href
          : `${baseUrl}${href}`
      }
      target={
        href && (href.startsWith('#') || href.startsWith('tel:'))
          ? '_self'
          : '_blank'
      }
      rel='noopener noreferrer'
      {...(downloadActive ? { download: true } : {})}
    >
      <Button
        variant={variant}
        className={cn(!!cta ? cnButton : cnButtonIcon, cnSmallText)}
      >
        {IconLoader(icon ?? '')}
        {(cta ?? '').toLocaleUpperCase()}
      </Button>
    </a>
  );
};
