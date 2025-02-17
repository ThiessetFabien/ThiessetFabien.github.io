'use client';

import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

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
import { cnGap, cnMarginX, cnPaddingY } from '@styles/boxModel.style';

import '@styles/globals.css';
import '@styles/reset.css';

import { metadata } from './metadata';

import { cn } from '@lib/utils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' dir='ltr' className='w-full'>
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta name='description' content={`${metadata.description}`} />
        <meta name='keywords' content={`${metadata.keywords}`} />
        <meta
          name='author'
          content={
            Array.isArray(metadata.authors)
              ? metadata.authors.map((author) => author.name).join(', ')
              : metadata.authors?.name
          }
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <body
        className={cn(
          Poppins.variable,
          Expletus_Sans.variable,
          'container relative z-0',
          'h-100% -full m-auto',
          'font-sans text-foreground',
          cnFlexFullCenter,
          cnFlexCol,
          'bg-gradient-to-br from-secondary to-primary'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header
            className={cn(
              'm-auto h-full max-w-7xl rounded-b-xl',
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
              'mx-auto max-w-7xl',
              'grid grid-cols-1 lg:auto-rows-auto lg:grid-cols-12'
            )}
          >
            {children}
          </main>
          <Footer
            className={cn(
              cnPaddingY,
              cnFlexBetweenX,
              'h-full',
              'm-auto max-w-7xl rounded-t-xl bg-background'
            )}
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
