'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { year } from '@/utils/dynamicYear';
import { cnLightTextMuted, cnSmallText } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';
import type { CardProps } from '@/types/CardProps';
import { scrollToTop } from '@/hooks/ScrollToTop';
import { cnFlexBetweenX } from '@/styles/flexStyles';
import { Button } from '@/lib/components/ui/button';
import { MoveUp } from 'lucide-react';

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
    <footer className={cn('h-full min-w-full', className)}>
      <div className={cn('max-w-7xl', 'mx-auto', cnPaddingX, cnFlexBetweenX)}>
        <p>fab.dev</p>
        <p className={cn(cnSmallText, cnLightTextMuted, cnPaddingX)}>
          &copy; {year} &bull; Built by Fabien Thiesset &bull; All rights
          reserved.
        </p>
        <Button variant='ghost' onClick={scrollToTop}>
          <MoveUp />
        </Button>
      </div>
    </footer>
  );
};
