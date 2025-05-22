'use client';

import { useEffect, useState } from 'react';

import { FooterLayout } from '@layouts/FooterLayout';
import { cn } from '@lib/utils';
import { useLoading } from '@src/contexts/LoadingContext';
import { useData } from '@src/contexts/DataContext';
import { ANIMATION_TIMING } from '@src/config/constants';
import { cnFlexCenterX, cnFlexCol } from '@styles/flex.style';
import { cnMarginTop, cnPadding, cnSmallSpaceY } from '@styles/boxModel.style';
import { cnLightTextMuted } from '@styles/font.style';
import { cnSizeFull } from '@styles/size.style';

interface ContentLayoutProps {
  children: React.ReactNode;
}

/**
 * Composant intermédiaire de mise en page du contenu avec animation de chargement
 *
 * Ce composant gère :
 * - L'animation de transition lors du chargement
 * - L'accessibilité avec le lien "skip to content"
 * - Le footer avec les données utilisateur
 *
 * @param props - Propriétés du composant
 * @param props.children - Contenu à afficher
 * @returns Composant ContentLayout rendu
 */
export function ContentLayout({ children }: ContentLayoutProps): JSX.Element {
  const { isPageLoading } = useLoading();
  const { data } = useData();
  const [visible, setVisible] = useState(false);

  // Vérifier que data est valide
  const hasData = Array.isArray(data) && data.length > 0;

  useEffect(() => {
    if (!isPageLoading) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, ANIMATION_TIMING.FADE_IN_DELAY);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading]);

  return (
    <div
      className={cn(
        'h-full w-full transition-opacity duration-700',
        visible && 'opacity-100',
        visible && 'pointer-events-auto'
      )}
    >
      <main id='main-content' aria-label='Contenu principal' className='h-full'>
        {children}
      </main>

      {hasData && (
        <FooterLayout
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
      )}
    </div>
  );
}
