'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function VideoRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathname?.includes('/videos/undefined') ||
      pathname?.includes('/undefined')
    ) {
      router.replace('/not-found');
    }
  }, [pathname, router]);

  return null;
}
