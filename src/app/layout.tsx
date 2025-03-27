'use client';

import { ThemeProvider } from 'next-themes';

import { VideoRedirectHandler } from '@/src/components/VideoRedirectHandler';
import {
  cnFlexBetweenX,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/src/styles/flex.style';
import { Footer } from '@layouts/FooterLayout';
import { Toaster } from '@lib/components/ui/toaster';
import { cn } from '@lib/utils';
import { Expletus_Sans } from '@src/fonts/ExpletusSans.font';
import { Poppins } from '@src/fonts/Poppins.font';
import {
  cnGap,
  cnMarginTop,
  cnPaddingTop,
  cnPaddingY,
} from '@styles/boxModel.style';

import '@src/styles/globals.css';
import '@src/styles/reset.css';
import { MetaHead } from '../components/layouts/MetaHead';
import { FloatingToggles } from '../components/ui/toggles/FloatingToggles';
import { metadata } from '../config/metadata';

/**
 * Root layout component for the application.
 * Provides theming, global styles, and layout structure.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' suppressHydrationWarning className='w-full'>
      <MetaHead
        title={`${metadata?.title}`}
        description={`${metadata?.description}`}
      />
      <body
        className={cn(
          'container relative z-0',
          'm-auto min-h-[100dvh]',
          'font-poppins-sans text-foreground',
          cnFlexFullCenter,
          cnPaddingTop,
          cnFlexCol
          // 'bg-gradient-to-br from-secondary to-primary'
        )}
        style={{
          ...Poppins.style,
          ...Expletus_Sans.style,
        }}
      >
        <VideoRedirectHandler />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <FloatingToggles />
          <main
            className={cn(
              cnGap,
              'h-full',
              'grid grid-cols-1 lg:auto-rows-auto lg:grid-cols-12'
            )}
          >
            {children}
          </main>
          <Footer
            className={cn(
              cnPaddingY,
              cnMarginTop,
              cnFlexBetweenX,
              'h-full max-h-[10vh]',
              'mx-auto'
            )}
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
