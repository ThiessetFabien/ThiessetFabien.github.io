import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoId: string | undefined;
  fallbackVideoId?: string;
}

export function VideoPlayer({ videoId, fallbackVideoId }: VideoPlayerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoId || videoId === 'undefined') {
      if (fallbackVideoId) {
        console.log(`Video fallback: ${fallbackVideoId}`);
      } else {
        router.push('/not-found');
      }
    }

    setIsLoading(false);
  }, [videoId, fallbackVideoId, router]);

  const handleVideoError = () => {
    setHasError(true);
    console.error('Video loading error');
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const actualVideoId =
    !videoId || videoId === 'undefined' ? fallbackVideoId : videoId;

  if (!actualVideoId) {
    return <div>Video is not available.</div>;
  }

  return (
    <div className='video-container'>
      <video
        controls
        src={`/videos/${actualVideoId}`}
        className='w-full rounded-lg'
        onError={handleVideoError}
      />
      {hasError && (
        <p className='mt-2 text-red-500'>
          This video is not available. Please try again later.
        </p>
      )}
    </div>
  );
}
