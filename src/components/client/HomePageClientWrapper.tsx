'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingScreen from '@ui/loading/LoadingScreen';

const HomePage = dynamic(() => import('./HomePage'), {
  loading: () => <LoadingScreen />,
});

export default function HomePageClientWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomePage />
    </Suspense>
  );
}
