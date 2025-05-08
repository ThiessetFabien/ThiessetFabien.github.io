'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function VideoRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for invalid video paths
    if (
      pathname?.includes('/videos/undefined') ||
      pathname?.includes('/undefined') ||
      pathname?.endsWith('/videos/') ||
      pathname?.includes('/videos//') // Double slash detection
    ) {
      console.warn('Invalid video path detected:', pathname);
      router.replace('/not-found');
    }
  }, [pathname, router]);

  return null;
}
