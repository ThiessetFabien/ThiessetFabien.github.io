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
 * ActionButton component that renders either a button or an anchor tag based on the presence of an href prop.
 *
 * @component
 *
 * @param props - The component props
 * @param {string} [props.cta] - Call to action text to display in the button
 * @param {string} [props.icon] - Icon name to display before the text
 * @param {string} [props.href] - If provided, renders the button as an anchor tag with this URL
 * @param {boolean} [props.downloadActive] - When true and href is provided, adds download attribute to the anchor
 * @param {boolean} [props.disabled] - When true, disables the button and shows a loading spinner
 * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [props.variant] - Visual style variant of the button
 * @param {'button'|'submit'|'reset'} [props.type='button'] - HTML button type attribute
 * @param {'icon'|'default'|'sm'|'lg'|'xs'|null} [props.size] - Size of the button
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.className] - Additional CSS classes to apply
 *
 * @returns {JSX.Element} - The rendered button or anchor element
 *
 * @example
 * // Regular button with icon
 * <ActionButton cta="Click me" icon="ArrowRight" onClick={handleClick} />
 *
 * @example
 * // Link button with download
 * <ActionButton cta="Download CV" href="documents/cv.pdf" downloadActive={true} />
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
