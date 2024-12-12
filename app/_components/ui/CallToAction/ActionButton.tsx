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
}> = ({ cta, icon, href, downloadActive, variant }) => {
  return (
    <div className='w-auto'>
      <a
        href={`/${href}`}
        target='_blank'
        rel='noopener noreferrer'
        {...dynamicDownload(downloadActive)}
      >
        <Button
          variant={variant}
          className='flex items-center justify-center text-center text-xs md:h-9 md:px-4 md:py-2 lg:h-10 lg:px-8 lg:text-sm'
        >
          {IconLoader(icon ?? '')}
          {(cta ?? '').toLocaleUpperCase()}
        </Button>
      </a>
    </div>
  );
};

export default ActionButton;
