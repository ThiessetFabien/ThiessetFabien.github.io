import React from 'react';

import { cn } from '@/src/lib/utils';
import { cnBorderRadiusFull } from '@/src/styles/border.style';
import { cnSmallMarginX } from '@/src/styles/boxModel.style';

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
