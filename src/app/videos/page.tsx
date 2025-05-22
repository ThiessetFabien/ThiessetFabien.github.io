'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VideosIndexPage() {
  const router = useRouter();

  // Liste des vidéos disponibles
  const availableVideos = [
    { id: 'casalink', title: 'Démonstration de Casalink' },
    // Ajouter d'autres vidéos ici au besoin
  ];

  // Si pas de vidéos disponibles, rediriger vers l'accueil
  useEffect(() => {
    if (availableVideos.length === 0) {
      router.push('/');
    }
  }, [router, availableVideos.length]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Vidéos disponibles</h1>

      {availableVideos.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {availableVideos.map((video) => (
            <Link
              href={`/videos/${video.id}`}
              key={video.id}
              className='rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800'
            >
              <div className='mb-3 flex aspect-video items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12 text-gray-400 dark:text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h2 className='text-lg font-medium'>{video.title}</h2>
              <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                Cliquez pour regarder la vidéo
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className='py-10 text-center'>
          <p className='text-gray-600 dark:text-gray-400'>
            Aucune vidéo n&apos;est disponible pour le moment.
          </p>
          <Link
            href='/'
            className='mt-4 inline-block rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90'
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      )}
    </div>
  );
}
