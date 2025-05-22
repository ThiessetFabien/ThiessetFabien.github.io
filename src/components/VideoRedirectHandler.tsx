'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLoading } from '@src/contexts/LoadingContext';

export function VideoRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Check for invalid video paths
    if (
      pathname?.includes('/videos/undefined') ||
      pathname?.includes('/undefined') ||
      pathname?.endsWith('/videos/') ||
      pathname?.includes('/videos//') || // Double slash detection
      (pathname?.startsWith('/videos/') && pathname?.split('/').length > 3) // Trop de segments dans l'URL
    ) {
      console.warn('Invalid video path detected:', pathname);
      setLoading(true); // Activer l'écran de chargement pendant la redirection
      router.replace('/not-found');
    }

    // Vérifier si le chemin est /videos sans ID
    if (pathname === '/videos') {
      console.warn('Video index page not available:', pathname);
      setLoading(true); // Activer l'écran de chargement pendant la redirection
      router.replace('/not-found');
    }
  }, [pathname, router, setLoading]);

  return null;
}
