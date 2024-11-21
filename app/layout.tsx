'use client';
import type { Metadata } from 'next';
import Head from 'next/head';

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
      <Head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </Head>
      <body className='text-site-text-color bg-site-background-color'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
