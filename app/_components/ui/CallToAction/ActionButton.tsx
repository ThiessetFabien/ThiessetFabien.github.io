import React from 'react';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { dynamicDownload } from '@/utils/dynamicDownload';
import { IconLoader } from '@/hooks/IconLoader';
import { cnButton, cnButtonIcon } from '@/styles/buttonStyles';
import type { ActionButton } from '@/types/ActionButtonProps';
import { cnSmallText } from '@/styles/fontStyles';

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

const ActionButton: React.FC<ActionButton> = ({
  cta,
  icon,
  href,
  downloadActive,
  variant,
}: ActionButton): JSX.Element => {
  return (
    <a
      href={`/${href}`}
      target='_blank'
      rel='noopener noreferrer'
      {...dynamicDownload(downloadActive || false)}
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

export default ActionButton;
