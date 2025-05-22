import type { Metadata } from 'next';

/**
 * Métadonnées spécifiques pour la page 404 (not-found)
 */
export const metadata: Metadata = {
  title: 'Page non trouvée | Fabien Thiesset - Développeur Full-Stack',
  description:
    "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour explorer le portfolio de Fabien Thiesset.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
};
