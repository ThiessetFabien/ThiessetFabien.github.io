'use client';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import '@/styles/reset.css';

import '@/styles/globals.css';

import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { poppins } from '@/fonts/poppins';

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
    <html lang='fr' className={`${poppins} font-sans`}>
      <body>
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
