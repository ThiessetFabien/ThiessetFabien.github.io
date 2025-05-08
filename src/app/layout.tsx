'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

import { Footer } from '@layouts/FooterLayout';
import { Toaster } from '@lib/components/ui/toaster';
import { cn } from '@lib/utils';
import LoadingScreen from '@src/components/ui/loading/LoadingScreen';
import { FloatingMenubar } from '@src/components/ui/sheet/FloatingMenubar';
import { VideoRedirectHandler } from '@src/components/VideoRedirectHandler';
import { menuItems } from '@src/config/menuItems.config';
import { LoadingProvider } from '@src/contexts/LoadingContext';
import { useLoading } from '@src/contexts/LoadingContext';
import { Expletus_Sans } from '@src/fonts/ExpletusSans.font';
import { Poppins } from '@src/fonts/Poppins.font';
import {
  cnFlexCenterX,
  cnFlexCol,
  cnFlexFullCenter,
} from '@src/styles/flex.style';
import { cnMarginTop, cnPadding, cnSmallSpaceY } from '@styles/boxModel.style';

import '@src/styles/globals.css';
import '@src/styles/reset.css';
import { MetaHead } from '../components/layouts/MetaHead';
import { FloatingToggles } from '../components/ui/toggles/FloatingToggles';
import { cnLightTextMuted } from '../styles/font.style';
import { cnSizeFull } from '../styles/size.style';
import { CardProps } from '../types/CardProps';

import { metadata } from './metadata';
/**
 * Root layout component for the application.
 * Provides theming, global styles, and layout structure.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It includes global providers, theming, and layout structure.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 *
 * @remarks
 * - This component uses `useState` to manage the `data` state, which is populated
 *   by dynamically importing a JSON file.
 * - The `useEffect` hook is used to load the data asynchronously on component mount.
 * - The layout includes a `ThemeProvider` for managing themes, a `Footer` component
 *   that displays data from the loaded JSON, and a `Toaster` for notifications.
 *
 * @example
 * ```tsx
 * <RootLayout>
 *   <div>Your content here</div>
 * </RootLayout>
 * ```
 */

// Composant intermédiaire simplifié
function LayoutContent({
  children,
  data,
}: {
  children: React.ReactNode;
  data: CardProps[];
}) {
  const { isPageLoading } = useLoading();
  const [visible, setVisible] = useState(false);

  // Effet pour gérer la visibilité du contenu
  useEffect(() => {
    if (!isPageLoading) {
      // Court délai pour s'assurer que le loader a terminé sa transition
      const timer = setTimeout(() => {
        setVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading]);

  return (
    <div
      className='w-full transition-opacity duration-700'
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none', // Désactive les interactions si invisible
      }}
    >
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:p-2 focus:text-foreground'
      >
        Aller au contenu principal
      </a>

      <main
        id='main-content'
        aria-label='Contenu principal'
        className={cn(
          'h-full',
          'grid grid-cols-1 lg:auto-rows-auto lg:grid-cols-12'
        )}
      >
        {children}
      </main>

      <Footer
        name={data[0]?.name}
        familyName={data[0]?.familyName}
        expertises={data[0]?.expertises}
        className={cn(
          cnPadding,
          cnMarginTop,
          cnSizeFull,
          cnFlexCol,
          cnLightTextMuted,
          cnSmallSpaceY,
          cnFlexCenterX,
          'mx-auto'
        )}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    import('@api/data.json')
      .then((module: { default: unknown }) => {
        setData(module.default as unknown as CardProps[]);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setData([]);
      });
  }, []);

  return (
    <html
      lang='fr'
      suppressHydrationWarning
      className='w-full'
      itemScope
      itemType='https://schema.org/WebPage'
    >
      <MetaHead
        title={`${metadata?.title}`}
        description={`${metadata?.description}`}
      />
      <body
        className={cn(
          'container relative z-0',
          'min-h-[100dvh] min-w-[100dvw]',
          'font-poppins-sans text-foreground',
          cnFlexFullCenter,
          cnFlexCol
        )}
        style={{
          ...Poppins.style,
          ...Expletus_Sans.style,
        }}
      >
        <VideoRedirectHandler />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <LoadingScreen />
            <Suspense fallback={<LoadingScreen />}>
              <LayoutContent data={data}>{children}</LayoutContent>
            </Suspense>
          </LoadingProvider>
          <FloatingToggles />
          <FloatingMenubar items={menuItems} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
