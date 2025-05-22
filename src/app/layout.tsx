import { Suspense } from 'react';

import { Toaster } from '@lib/components/ui/toaster';
import { cn } from '@lib/utils';
import LoadingScreen from '@ui/loading/LoadingScreen';
import { FloatingMenubar } from '@ui/sheet/FloatingMenubar';
import { VideoRedirectHandler } from '@components/VideoRedirectHandler';
import { menuItems } from '@config/menuItems.config';
import { LoadingProvider } from '@src/contexts/LoadingContext';
import { DataProvider } from '@src/contexts/DataContext';
import { expletusSans as EXPLETUS_SANS } from '@fonts/ExpletusSans.font';
import { poppins as POPPINS } from '@fonts/Poppins.font';
import { cnFlexCol, cnFlexFullCenter } from '@styles/flex.style';
import { ThemeProvider } from '@components/providers/ThemeProvider';
import { FloatingToggles } from '@ui/toggles/FloatingToggles';
import { ContentLayout } from '@components/layouts/ContentLayout';

import '@src/styles/globals.css';
import '@src/styles/reset.css';

// Importer les métadonnées depuis metadata.ts
import {
  metadata as metadataConfig,
  viewport as viewportConfig,
} from './metadata';

// Exporter les métadonnées pour Next.js App Router
export const metadata = metadataConfig;
export const viewport = viewportConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang='fr'
      className='w-full'
      itemScope
      itemType='https://schema.org/WebPage'
      suppressHydrationWarning
    >
      <head>
        {/* Script externe pour l'initialisation du thème, version async recommandée par Next.js */}
        <script src='/theme-init.js' async />
      </head>
      <body
        className={cn(
          'container relative z-0',
          'min-h-[100dvh] min-w-[100dvw]',
          'font-poppins-sans text-foreground',
          cnFlexFullCenter,
          cnFlexCol
        )}
        style={{
          ...POPPINS.style,
          ...EXPLETUS_SANS.style,
        }}
      >
        <VideoRedirectHandler />
        <ThemeProvider>
          <DataProvider>
            <LoadingProvider>
              <LoadingScreen />
              <Suspense fallback={<LoadingScreen />}>
                <ContentLayout>{children}</ContentLayout>
              </Suspense>
            </LoadingProvider>
          </DataProvider>
          <FloatingToggles />
          <FloatingMenubar items={menuItems} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
