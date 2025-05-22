'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLoading } from '@src/contexts/LoadingContext';

export default function VideoPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Activer l'écran de chargement pendant la vérification
    setLoading(true);

    async function checkVideo() {
      try {
        // Vérifier si la vidéo existe via l'API
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          console.warn(`Vidéo non trouvée: ${id}`);
          // Rediriger vers la page 404
          router.push('/not-found');
          return;
        }

        // Si tout va bien, désactiver l'écran de chargement
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la vérification de la vidéo:', error);
        router.push('/not-found');
        
      }
    }

    if (id) {
      checkVideo();
    } else {
      router.push('/not-found');
    }
  }, [id, router, setLoading]);

  // Ajouter l'extension .mp4 si elle n'est pas déjà présente
  const videoSrc = id.endsWith('.mp4') ? `/videos/${id}` : `/videos/${id}.mp4`;

  // Même chose pour les sous-titres
  const captionSrc = id.endsWith('.mp4')
    ? `/videos/${id.replace('.mp4', '')}.vtt`
    : `/videos/${id}.vtt`;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>Vidéo: {id}</h1>

      <div className='video-container'>
        <video
          controls
          autoPlay={false}
          muted={false}
          src={videoSrc}
          className='w-full rounded-lg shadow-lg'
          onError={() => {
            setLoading(true); // Activer l'écran de chargement avant la redirection
            router.push('/not-found');
          }}
          preload='metadata'
          playsInline
        >
          <track
            kind='captions'
            src={captionSrc}
            srcLang='fr'
            label='Sous-titres en français'
          />
          Votre navigateur ne prend pas en charge la lecture de vidéos.
        </video>
      </div>
    </div>
  );
}
