import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface VideoPlayerProps {
  videoId: string | undefined;
  fallbackVideoId?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

export function VideoPlayer({
  videoId,
  fallbackVideoId,
  autoPlay = false,
  muted = false,
  controls = true,
  className = 'w-full rounded-lg shadow-lg',
}: VideoPlayerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoId || videoId === 'undefined') {
      if (fallbackVideoId) {
        // Utilisation de fallback, évite le console.log pour ESLint
      } else {
        // Rediriger vers la page not_found si aucun ID vidéo valide n'est fourni
        router.push('/not-found');
        return;
      }
    }

    // Réinitialiser les états lorsque l'ID de la vidéo change
    setHasError(false);
    setIsLoading(true);

    // Vérifier si la vidéo existe
    const checkVideoExists = async () => {
      try {
        const id = videoId || fallbackVideoId;
        if (!id) return;

        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          // Si la vidéo n'existe pas, rediriger vers not_found
          router.push('/not-found');
        }
      } catch (error) {
        console.error('Error checking video existence:', error);
      }
    };

    checkVideoExists();

    // Simuler un court délai de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [videoId, fallbackVideoId, router]);

  const handleVideoError = () => {
    setHasError(true);
    console.error('Video loading error for ID:', videoId || fallbackVideoId);
    // Rediriger vers la page not_found après une erreur de chargement vidéo
    router.push('/not-found');
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary' />
      </div>
    );
  }

  const actualVideoId =
    !videoId || videoId === 'undefined' ? fallbackVideoId : videoId;

  if (!actualVideoId) {
    return (
      <div className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 dark:bg-red-900/30 dark:text-red-300'>
        La vidéo n&apos;est pas disponible.
      </div>
    );
  }

  // Ajouter l'extension .mp4 si elle n'est pas déjà présente
  const videoSrc = actualVideoId.endsWith('.mp4')
    ? `/videos/${actualVideoId}`
    : `/videos/${actualVideoId}.mp4`;

  // Même chose pour les sous-titres
  const captionSrc = actualVideoId.endsWith('.mp4')
    ? `/videos/${actualVideoId.replace('.mp4', '')}.vtt`
    : `/videos/${actualVideoId}.vtt`;

  return (
    <div className='video-container'>
      <video
        ref={videoRef}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        src={videoSrc}
        className={className}
        onError={handleVideoError}
        onLoadedData={handleVideoLoaded}
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
      {hasError && (
        <div className='mt-2 rounded bg-red-100 p-2 text-red-700 dark:bg-red-900/30 dark:text-red-300'>
          <p className='font-medium'>Erreur de lecture vidéo</p>
          <p className='text-sm'>
            Cette vidéo n&apos;est pas disponible. Veuillez réessayer
            ultérieurement.
          </p>
        </div>
      )}
    </div>
  );
}
