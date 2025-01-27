'use client';

import React from 'react';

import { ScrollTopToggle } from '@/components/ui/Toggle/ScrollTopToggle';
import { scrollToTop } from '@/hooks/ScrollToTop';
import { cn } from '@/lib/utils';
import { cnPaddingX } from '@/styles/boxModelStyles';
import { cnFlexBetweenX, cnFlexFullCenter } from '@/styles/flexStyles';
import { cnLightTextMuted, cnSmallText, cnTitle3 } from '@/styles/fontStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type { CardProps } from '@/types/CardProps';
import { year } from '@/utils/dynamicYear';

/**
 * @file Footer.tsx
 * @description This file exports a Footer component that displays the current year and some additional information.
 */

/**
 * Footer component.
 * @param {Object} props - The props for the component.
 * @param {string} [props.className] - Additional class names to apply to the footer.
 * @returns {JSX.Element} The rendered Footer component.
 * @example
 * <Footer />
 */

export const Footer: React.FC<{ className: CardProps['className'] }> = ({
  className,
}) => {
  return (
    <footer className={className}>
      <div
        className={cn(
          'max-w-7xl',
          'mx-auto',
          cnPaddingX,
          cnFlexBetweenX,
          cnLightTextMuted
        )}
      >
        <h3 className={cnTitle3}>
          fab<span className='font-light'>uilds</span>
        </h3>
        <p className={cn('w-full flex-wrap', cnSmallText, cnFlexFullCenter)}>
          &copy;&nbsp;{year}&nbsp;&bull; Built by Fabien Thiesset.
          <span className={cn('inline', cnHiddenXs)}>&nbsp;&bull;</span>
          <span className='inline'>&nbsp;All rights reserved.</span>
        </p>
        <ScrollTopToggle
          type='button'
          variant='outline'
          size='sm'
          onClick={scrollToTop}
          icon='ChevronsUp'
          aria-label='Scroll to top'
        />
      </div>
    </footer>
  );
};
