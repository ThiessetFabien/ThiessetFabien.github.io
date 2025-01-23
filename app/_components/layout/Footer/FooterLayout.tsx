'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { year } from '@/utils/dynamicYear';
import { cnLightTextMuted, cnSmallText, cnTitle3 } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';
import { scrollToTop } from '@/hooks/ScrollToTop';
import { cnFlexBetweenX, cnFlexFullCenter } from '@/styles/flexStyles';
import { ChevronsUp } from 'lucide-react';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import type { CardProps } from '@/types/CardProps';
import { Toggle } from '@/lib/components/ui/toggle';

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

export const Footer: React.FC<{ className?: CardProps['className'] }> = ({
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
          &copy;&nbsp;{year}&nbsp;&bull; Built by Fabien Thiesset.{' '}
          <span className={cn('inline', cnHiddenXs)}>&nbsp;&bull;</span>
          <span className='inline'>&nbsp;All rights reserved.</span>
        </p>
        <Toggle variant='outline' size='sm' onClick={scrollToTop}>
          <ChevronsUp />
          <span className='sr-only'>Scroll to top</span>
        </Toggle>
      </div>
    </footer>
  );
};
