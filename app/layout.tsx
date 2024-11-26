'use client';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import '@/styles/reset.css';

import '@/styles/globals.css';

import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { Poppins } from '@/fonts/Poppins';
import { cn } from '@/lib/utils';
import { OrpheusPro } from './fonts/OrpheusPro';

const metadata: Metadata = {
  title: 'Thiesset Fabien - Portfolio',
  description: 'My personal portfolio crafted with ❤️ using Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className={cn(Poppins.variable, OrpheusPro.variable, 'font-sans')}>
        <Header />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
