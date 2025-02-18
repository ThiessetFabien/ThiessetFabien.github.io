import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

/**
 * @file theme-provider.tsx
 * @description This file exports a ThemeProvider component that wraps the NextThemesProvider to provide theme context to the application.
 */

/**
 * ThemeProvider component.
 * @param {React.ComponentProps<typeof NextThemesProvider>} props - The props for the NextThemesProvider component.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the ThemeProvider.
 * @returns {JSX.Element} The rendered ThemeProvider component.
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 */

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
