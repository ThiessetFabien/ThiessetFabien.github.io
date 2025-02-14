import React from 'react';

import { capitalizeFirstLetterOfEachWord } from '@hooks/FormatText';
import { Button } from '@lib/components/ui/button';
import { cn } from '@lib/utils';
import { IconLoader } from '@services/IconLoader';
import { cnParagraph } from '@styles/fontStyles';
import type { ActionButtonProps } from '@types/ActionButtonProps';
import type { CardProps } from '@types/CardProps';
import { baseUrl } from '@utils/constants/baseUrl';

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
  ActionButtonProps & { className: CardProps['className'] }
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
        {/* <Loader2 className='animate-spin'>Please wait</Loader2> */}
        {isDisabled
          ? IconLoader('LoaderCircle', 'animate-spin')
          : IconLoader(icon ?? '')}
        <span>
          {cta &&
            capitalizeFirstLetterOfEachWord(isDisabled ? 'Please wait' : cta)}
        </span>
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
      {isDisabled
        ? IconLoader('LoaderCircle', 'animate-spin')
        : IconLoader(icon ?? '')}
      <span>
        {cta &&
          capitalizeFirstLetterOfEachWord(isDisabled ? 'Please wait' : cta)}
      </span>
    </Button>
  );
};
