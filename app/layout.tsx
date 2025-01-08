'use client';

import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { metadata } from './metadata';
import { cn } from '@/lib/utils';
import '@/styles/reset.css';
import { Poppins } from '@/fonts/Poppins';
import { Expletus_Sans } from './fonts/ExpletusSans';
import '@/styles/globals.css';
import { cnMarginTop, cnPadding } from '@/styles/boxModelStyles';
import { cnGap } from '@/styles/boxModelStyles';
import { cnFlexFullCenter } from '@/styles/flexStyles';
import { Header } from '@/components/layout/Header/HeaderLayout';
import { Footer } from '@/components/layout/Footer/FooterLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' dir='ltr' className={'w-full'}>
      <Head>
        <title>{metadata.title?.toString()}</title>
        <meta name='description' content={metadata.description?.toString()} />
        <meta name='keywords' content={metadata.keywords?.toString()} />
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
          'container',
          'h-100% container mx-auto min-w-full',
          'bg-background font-sans text-foreground'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header className={cnPadding} />
          <main
            className={cn(
              cnGap,
              cnPadding,
              'mx-auto max-w-7xl',
              'grid grid-cols-1 lg:auto-rows-auto lg:grid-cols-12'
            )}
          >
            {children}
          </main>
          <Footer
            className={cn(
              cnFlexFullCenter,
              cnPadding,
              'text-center',
              'min-w-full'
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
