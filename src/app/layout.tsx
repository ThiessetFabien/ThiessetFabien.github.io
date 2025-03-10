'use client';

import { ThemeProvider } from 'next-themes';

import { VideoRedirectHandler } from '@/src/components/VideoRedirectHandler';
import {
  cnFlexBetweenX,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/src/styles/flex.style';
import { Expletus_Sans } from '@fonts/ExpletusSans.font';
import { Poppins } from '@fonts/Poppins.font';
import { Footer } from '@layouts/FooterLayout';
import { Header } from '@layouts/HeaderLayout';
import { Toaster } from '@lib/components/ui/toaster';
import { cn } from '@lib/utils';
import { cnGap, cnMarginX, cnPaddingY } from '@styles/boxModel.style';

import '@styles/globals.css';
import '@styles/reset.css';
import { MetaHead } from '../components/layouts/MetaHead';
import { metadata } from '../config/metadata';

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
          Poppins.variable,
          Expletus_Sans.variable,
          'container relative z-0',
          'm-auto min-h-[100dvh]',
          'font-sans text-foreground',
          cnFlexFullCenter,
          cnFlexCol,
          'bg-gradient-to-br from-secondary to-primary'
        )}
      >
        <VideoRedirectHandler />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header
            className={cn(
              'mx-auto h-full max-h-[10vh] max-w-7xl rounded-b-xl',
              cnPaddingY,
              cnMarginX,
              cnFlexBetweenX,
              'bg-background'
            )}
          />
          <main
            className={cn(
              cnGap,
              cnPaddingY,
              'mx-auto h-full max-w-7xl',
              'grid grid-cols-1 lg:auto-rows-auto lg:grid-cols-12'
            )}
          >
            {children}
          </main>
          <Footer
            className={cn(
              cnPaddingY,
              cnFlexBetweenX,
              'h-full max-h-[10vh]',
              'mx-auto max-w-7xl rounded-t-xl bg-background'
            )}
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
