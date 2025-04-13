import React from 'react';

import { baseUrl } from '@/src/utils/baseUrl.util';
import { capitalizeFirstLetterOfEachWord } from '@/src/utils/formatText.util';
import { Button } from '@lib/components/ui/button';
import { cn } from '@lib/utils';
import type { ActionButtonProps } from '@src/types/ActionButtonProps';
import type { CardProps } from '@src/types/CardProps';
import { cnParagraph } from '@styles/font.style';
import { IconLoader } from '@ui/icons/IconLoader';

/**
 * A versatile button component supporting links, icons, and various states.
 * @param {Object} props - Component properties.
 * @param {string} [props.cta] - Button text.
 * @param {string} [props.icon] - Icon name.
 * @param {string} [props.href] - Link URL.
 * @param {boolean} [props.downloadActive] - Enables download behavior.
 * @param {boolean} [props.disabled] - Disables the button.
 * @param {string} [props.variant] - Button variant.
 * @param {string} [props.type] - Button type (e.g., 'button', 'submit').
 * @param {string} [props.size] - Button size.
 * @param {Function} [props.onClick] - Click handler.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element} Rendered button component.
 */
export const ActionButton: React.FC<
  ActionButtonProps & {
    className?: CardProps['className'];
  }
> = ({
  cta,
  icon,
  href,
  downloadActive,
  disabled,
  variant,
  type = 'button',
  size,
  onClick,
  className,
}: {
  cta?: string;
  icon?: string;
  href?: string;
  downloadActive?: boolean;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  type?: ActionButtonProps['type'];
  size?: 'icon' | 'default' | 'sm' | 'lg' | 'xs' | null;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
  ) => void;
  className?: string;
}): JSX.Element => {
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
      onClick={onClick}
      aria-label={cta}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
    >
      <Button
        variant={variant}
        type={(type as 'button' | 'submit' | 'reset') ?? 'button'}
        size={size ?? 'default'}
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
      type={(type as 'button' | 'submit' | 'reset') || 'button'}
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
