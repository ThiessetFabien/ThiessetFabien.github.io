export type SectionProps = {};

import { PropsWithChildren } from 'react';

export const Section = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <section className='m-auto max-w-3xl px-4'>{children}</section>;
};
