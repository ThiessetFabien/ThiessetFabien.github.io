'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@src/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, value, orientation = 'horizontal', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative overflow-hidden rounded-full',
      orientation === 'vertical' ? 'h-full w-full' : 'h-2 w-full',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'flex-1 bg-primary transition-all duration-500 ease-in-out',
        orientation === 'vertical' ? 'h-full w-full' : 'h-full w-full'
      )}
      style={{
        transform:
          orientation === 'vertical'
            ? `translateY(${100 - (value || 0)}%)`
            : `translateX(-${100 - (value || 0)}%)`,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
