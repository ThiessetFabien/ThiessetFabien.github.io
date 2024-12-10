import React from 'react';
import { Button } from '@/lib/components/ui/button';
import { dynamicDownload } from '@/utils/dynamicDownload';
import { IconLoader } from '@/hooks/IconLoader';

/**
 * @file ActionButton.tsx
 * @description This file exports a reusable button component for call-to-action buttons.
 */

/**
 * ActionButton component props.
 * @typedef {Object} ActionButtonProps
 * @property {string} cta - The text for the call-to-action button.
 * @property {string} icon - The icon for the call-to-action button.
 * @property {string} href - The href for the call-to-action button.
 * @property {boolean} downloadActive - Whether the call-to-action button should trigger a download.
 * @property {string} variant - The variant of the button (default or outline).
 */

/**
 * ActionButton component.
 * @param {ActionButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ActionButton component.
 */
const ActionButton: React.FC<{
  cta: string;
  icon: string;
  href: string;
  downloadActive: boolean;
  variant: 'default' | 'outline';
  size: number;
}> = ({ cta, icon, href, downloadActive, variant, size }) => {
  return (
    <div className='w-full md:w-auto'>
      <a href={`/${href}`} {...dynamicDownload(downloadActive)}>
        <Button
          size={size}
          variant={variant}
          className='flex w-full items-center justify-center text-center'
        >
          {IconLoader(icon ?? '')}
          {(cta ?? '').toLocaleUpperCase()}
        </Button>
      </a>
    </div>
  );
};

export default ActionButton;
