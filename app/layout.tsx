'use client';
import type { Metadata } from 'next';

import './styles/fonts.scss';
import './styles/reset.css';

import './styles/globals.css';

import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';

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
      <body className='text-site-text-color bg-site-background-color'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
