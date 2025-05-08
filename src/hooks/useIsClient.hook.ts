import React, { useEffect, useState, ReactNode } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

/**
 * A component that renders its children only on the client-side, not during server-side rendering.
 * This is useful for components that use browser-specific APIs or need DOM access.
 *
 * @param props - The component properties
 * @param props.children - The content to render on the client side
 * @param props.fallback - Optional content to render during server-side rendering (defaults to null)
 * @returns The children when on the client side, otherwise the fallback
 *
 * @example
 * ```tsx
 * <NoSSR fallback={<LoadingSpinner />}>
 *   <ComponentThatUsesWindowAPI />
 * </NoSSR>
 * ```
 */
export function NoSSR({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const isClient = useIsClient();

  if (!isClient) {
    return (fallback as React.ReactElement) || null;
  }

  return children as React.ReactElement;
}
