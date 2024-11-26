import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export const Section = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn('m-auto max-w-3xl px-4', className)}>
      {children}
    </section>
  );
};
