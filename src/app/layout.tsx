'use client';

import { VideoRedirectHandler } from '@/src/components/VideoRedirectHandler';
import {
  cnFlexBetweenX,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/src/styles/flex.style';
import { Footer } from '@layouts/FooterLayout';
import { Header } from '@layouts/HeaderLayout';
import { Toaster } from '@lib/components/ui/toaster';
import { cn } from '@lib/utils';
import { Expletus_Sans } from '@src/fonts/ExpletusSans.font';
import { Poppins } from '@src/fonts/Poppins.font';
import { cnGap, cnMarginX, cnPaddingY } from '@styles/boxModel.style';
import { ThemeProvider } from 'next-themes';

import '@src/styles/globals.css';
import '@src/styles/reset.css';
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
          'container relative z-0',
          'm-auto min-h-[100dvh]',
          'font-poppins-sans text-foreground',
          cnFlexFullCenter,
          cnFlexCol,
          'bg-gradient-to-br from-secondary to-primary'
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
