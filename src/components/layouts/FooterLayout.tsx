'use client';

import React from 'react';

import { year } from '@/src/utils/dynamicYear.util';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { cnPaddingX } from '@styles/boxModel.style';
import { cnFlexBetweenX, cnFlexFullCenter } from '@styles/flex.style';
import { cnLightTextMuted, cnSmallText } from '@styles/font.style';
import { cnHiddenXsFlex } from '@styles/hideItem.style';

/**
 * Footer component that displays the current year and additional information.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional class names for the footer.
 * @returns {JSX.Element} The rendered Footer component.
 */

export const Footer: React.FC<{ className: CardProps['className'] }> = ({
  className,
}) => {
  return (
    <footer className={className}>
      <div
        className={cn('mx-auto', cnPaddingX, cnFlexBetweenX, cnLightTextMuted)}
      >
        <p className={cn('w-full flex-wrap', cnSmallText, cnFlexFullCenter)}>
          &copy;&nbsp;{year}&nbsp;&bull; Built by Fabien Thiesset.
          <span className={cn('inline', cnHiddenXsFlex)}>&nbsp;&bull;</span>
          <span className='inline'>&nbsp;All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};
