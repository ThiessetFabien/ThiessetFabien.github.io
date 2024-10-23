'use client';
import type { Metadata } from 'next';
import { Footer } from './components/Layout/Footer';
import { Navbar } from './components/Layout/Navbar';
import './styles/globals.css';
import './styles/reset.css';

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
      <body>
        <Navbar
          currentFilter={'all'}
          onFilterChange={function (filter: 'all' | 'about' | 'work'): void {
            throw new Error('Function not implemented.');
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
