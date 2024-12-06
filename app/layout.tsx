'use client';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { metadata } from './metadata';
import { cn } from '@/lib/utils';
import '@/styles/reset.css';
import { Poppins } from '@/fonts/Poppins';
import { OrpheusPro } from '@/fonts/OrpheusPro';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' className={'h-full'}>
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
          'm-auto h-full max-w-5xl bg-background font-sans text-foreground'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header className={'z-1000 sticky top-0 mb-4 bg-background px-4'} />
          {children}
          <Footer className='flex justify-center px-4 text-center' />
        </ThemeProvider>
      </body>
    </html>
  );
}
