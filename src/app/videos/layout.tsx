'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLoading } from '@src/contexts/LoadingContext';

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLoading } = useLoading();

  // Désactiver l'écran de chargement après un court délai pour le layout vidéo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className='video-page-layout flex min-h-screen flex-col'>
      <div className='mb-4 bg-gray-100 py-4 shadow-md dark:bg-gray-900'>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center justify-between'>
            <Link
              href='/'
              className='text-primary transition-colors hover:text-primary/80'
              onClick={() => setLoading(true)} // Activer le chargement lors du retour à l'accueil
            >
              &larr; Retour à l&apos;accueil
            </Link>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              Lecteur de vidéo - Portfolio
            </span>
          </nav>
        </div>
      </div>
      <main className='flex-grow'>{children}</main>
      <footer className='mt-auto py-4 text-center text-sm text-gray-600 dark:text-gray-400'>
        <div className='container mx-auto px-4'>
          &copy; {new Date().getFullYear()} Fabien Thiesset - Tous droits
          réservés
        </div>
      </footer>
    </div>
  );
}
