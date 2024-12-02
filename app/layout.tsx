'use client';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/lib/utils';

import '@/styles/reset.css';
import { Poppins } from '@/fonts/Poppins';
import { OrpheusPro } from '@/fonts/OrpheusPro';

import '@/styles/globals.css';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

const metadata: Metadata = {
  title: 'Thiesset Fabien - Web developer',
  description:
    'Web developer about React, Next.js, TailwindCSS, TypeScript, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' className={'h-full'}>
      <body
        className={cn(
          Poppins.variable,
          OrpheusPro.variable,
          'h-full bg-background font-sans text-foreground'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
