import React from 'react';

import type { ActionButtonProps } from '@/src/types/ActionButtonProps';
import type { IconName } from '@/src/types/IconNameProps';
import { Button } from '@lib/components/ui/button';
import { cn } from '@lib/utils';
import { baseUrl } from '@lib/utils/baseUrl.util';
import { capitalizeFirstLetterOfEachWord } from '@lib/utils/formatText.util';
import type { CardProps } from '@src/types/CardProps';
import { cnParagraph } from '@styles/font.style';
import { IconLoader } from '@ui/icons/IconLoader';

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

export const ActionButton: React.FC<
  Omit<ActionButtonProps, 'icon'> & {
    icon?: IconName;
    className?: CardProps['className'];
  }
> = ({
  cta,
  icon,
  href,
  downloadActive,
  disabled,
  variant,
  type,
  size,
  onClick,
  className,
}) => {
  const isLink = Boolean(href);

  const isInternalLink =
    href?.startsWith('#') || href?.startsWith('tel:') || href?.startsWith('/');
  const isInternalDocumentLink = href?.startsWith('documents/');

  const linkProps = isLink
    ? {
        href:
          isInternalLink || isInternalDocumentLink ? href : `${baseUrl}${href}`,
        target: isInternalLink ? '_self' : '_blank',
        rel: !isInternalLink ? 'noopener noreferrer' : '',
      }
    : {};

  const downloadProps = downloadActive ? { download: true } : {};

  const isDisabled = Boolean(disabled);

  const disabledProps = disabled ? { disabled: true } : {};

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return isLink ? (
    <a
      {...linkProps}
      {...downloadProps}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      aria-label={cta}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
    >
      <Button
        variant={variant}
        type={type || 'button'}
        size={size}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(className, cnParagraph, !cta ? 'gap-0' : '')}
        {...disabledProps}
      >
        {isDisabled ? (
          <IconLoader icon='LoaderCircle' className='animate-spin' />
        ) : icon ? (
          <IconLoader icon={icon} />
        ) : null}
        {cta && (
          <span>
            {capitalizeFirstLetterOfEachWord(isDisabled ? 'Please wait' : cta)}
          </span>
        )}
      </Button>
    </a>
  ) : (
    <Button
      variant={variant}
      type={type || 'button'}
      size={size}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={cta}
      className={cn(className, cnParagraph, !cta ? 'gap-0' : '')}
      {...disabledProps}
    >
      {isDisabled ? (
        <IconLoader icon='LoaderCircle' className='animate-spin' />
      ) : icon ? (
        <IconLoader icon={icon} />
      ) : null}
      {cta && (
        <span>
          {capitalizeFirstLetterOfEachWord(isDisabled ? 'Please wait' : cta)}
        </span>
      )}
    </Button>
  );
};
