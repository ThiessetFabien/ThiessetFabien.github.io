'use client';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { metadata } from './metadata';
import { cn } from '@/lib/utils';
import '@/styles/reset.css';
import { Poppins } from '@/fonts/Poppins';
import { OrpheusPro } from '@/fonts/OrpheusPro';
import '@/styles/globals.css';
import {
  cnMarginBottom,
  cnMarginTop,
  cnMarginX,
  cnMarginY,
  cnPadding,
  cnPaddingX,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import { cnFlexFullCenter } from '@/styles/flexStyles';
import { Header } from '@/components/layout/Header/HeaderLayout';
import { Footer } from '@/components/layout/Footer/FooterLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' dir='ltr' className={'h-full w-full'}>
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta name='description' content={`${metadata.description}`} />
        <meta name='keywords' content={`${metadata.keywords}`} />
        <meta
          name='author'
          content={`${Array.isArray(metadata.authors) ? metadata.authors.map((author) => author.name).join(', ') : metadata.authors?.name}`}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <body
        className={cn(
          Poppins.variable,
          OrpheusPro.variable,
          cnPadding,
          'container',
          'h-100% container mx-auto w-full max-w-6xl',
          'bg-background font-sans text-foreground'
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
              'sticky top-0 z-50',
              'bg-background',
              cnPadding,
              cnMarginBottom
            )}
          />
          {children}
          <Footer
            className={cn(
              cnFlexFullCenter,
              cnPadding,
              cnMarginTop,
              'text-center'
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
