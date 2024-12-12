import React from 'react';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { dynamicDownload } from '@/utils/dynamicDownload';
import { IconLoader } from '@/hooks/IconLoader';
import { cnFlexCenterY } from '@/styles/flexStyles';
import { cnSmallText } from '@/styles/fontStyles';
import { cnButton } from '@/styles/boxModelStyles';
import type { ActionButton } from '@/types/ActionButtonProps';

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
    <div className='w-auto'>
      <a
        href={`/${href}`}
        target='_blank'
        rel='noopener noreferrer'
        {...dynamicDownload(downloadActive)}
      >
        <Button
          size='sm'
          variant={variant}
          className={cn(cnFlexCenterY, cnSmallText, cnButton)}
        >
          {IconLoader(icon ?? '')}
          {(cta ?? '').toLocaleUpperCase()}
        </Button>
      </a>
    </div>
  );
};

export default ActionButton;
