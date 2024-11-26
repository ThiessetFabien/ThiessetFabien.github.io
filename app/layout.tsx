'use client';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import '@/styles/reset.css';

import '@/styles/globals.css';

import { Poppins } from '@/fonts/Poppins';
import { cn } from '@/lib/utils';
import { OrpheusPro } from './fonts/OrpheusPro';

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
