import type { Metadata } from 'next';
import { metadata as baseMetadata } from './metadata';
import HomePageClientWrapper from '@components/client/HomePageClientWrapper';

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Fabien LEROY - Portfolio',
  description:
    'Portfolio de Fabien LEROY - Développeur Full Stack JavaScript/TypeScript',
};

export default function Page() {
  return <HomePageClientWrapper />;
}
