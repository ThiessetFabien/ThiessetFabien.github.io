import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

/**
 * @file Section.tsx
 * @description This file exports a component that renders a section with optional additional class names.
 */

/**
 * Section component.
 * @param {PropsWithChildren<{ className?: string }>} props - The props for the component.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the section.
 * @param {string} [props.className] - Additional class names to apply to the section.
 * @returns {JSX.Element} The rendered section component.
 * @example
 * <Section className="custom-class">
 *   <p>Content goes here</p>
 * </Section>
 */

export const Section = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn('m-auto mb-4 max-w-3xl px-4', className)}>
      {children}
    </section>
  );
};
