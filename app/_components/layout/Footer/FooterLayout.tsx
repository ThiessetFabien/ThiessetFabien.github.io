'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { year } from '@/utils/dynamicYear';
import { cnLightTextMuted, cnSmallText, cnTitle3 } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';
import { scrollToTop } from '@/hooks/ScrollToTop';
import { cnFlexBetweenX } from '@/styles/flexStyles';
import { Button } from '@/lib/components/ui/button';
import { ChevronsUp } from 'lucide-react';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import { useIsXs } from '@/hooks/useMediaQueries';
import type { CardProps } from '@/types/CardProps';
import { ActionButton } from '@/components/ui/CallToAction/ActionButton';
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
  const isXs = useIsXs();

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
        <p className={cn(cnSmallText, 'flex')}>
          &copy;&nbsp;{year}&nbsp;&bull; Built by Fabien Thiesset.{' '}
          <span className={cnHiddenXs}>&nbsp;&bull;&nbsp;</span>
          {isXs ? <br /> : ''}
          All rights reserved.
        </p>
        <Toggle variant='outline' size='sm' onClick={scrollToTop}>
          <ChevronsUp />
          <span className='sr-only'>Scroll to top</span>
        </Toggle>
      </div>
    </footer>
  );
};
