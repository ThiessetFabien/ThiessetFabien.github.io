import React from 'react';

import { cn } from '@/src/lib/utils';
import { cnBorderRadiusFull } from '@/src/styles/border.style';
import { cnSmallMarginX } from '@/src/styles/boxModel.style';

/**
 * A functional React component that renders a small, circular dot element.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className] - An optional additional class name to apply to the dot element.
 *
 * @returns {JSX.Element} A styled `div` element representing the dot.
 */
export const Dot: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'flex-shrink-0',
        cnBorderRadiusFull,
        'h-2 w-2 translate-y-2',
        cnSmallMarginX,
        'bg-muted-foreground'
      )}
    />
  );
};
