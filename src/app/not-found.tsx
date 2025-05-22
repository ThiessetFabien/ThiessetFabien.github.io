'use client';

import { useEffect } from 'react';
import { useLoading } from '@src/contexts/LoadingContext';
import { cn } from '@lib/utils';
import {
  cnTitle1,
  cnBigDescription,
  cnSmallText,
  cnLightTextMuted,
} from '@styles/font.style';
import {
  cnFlexCol,
  cnFlexFullCenter,
  cnFlexCenterY,
} from '@styles/flex.style';
import { cnBorderNone } from '@styles/border.style';
import { cnSmallSpaceY } from '@styles/boxModel.style';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@lib/components/ui/card';
import { ActionButton } from '@src/components/ui/buttons/ActionButton';

export default function NotFound() {
  const { setLoading } = useLoading();

  // Désactiver l'écran de chargement après un court délai
  useEffect(() => {
    // On laisse un peu de temps pour que la transition soit fluide
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <main
      className={cn(
        cnFlexCol,
        cnFlexFullCenter,
        'col-span-12 my-auto h-full min-h-[80dvh] w-full'
      )}
    >
      <Card
        className={cn(
          cnFlexCol,
          'justify-center',
          'min-h-[80dvh] p-6 lg:p-8',
          cnBorderNone,
          cnSmallSpaceY,
          'rounded-lg shadow-lg'
        )}
      >
        <CardHeader className='w-full'>
          <h1
            className={cn(
              cnTitle1,
              'text-3xl font-bold text-red-600 dark:text-red-400'
            )}
          >
            Erreur 404 : Page non trouvée
          </h1>
        </CardHeader>
        <CardContent className={cn(cnFlexCenterY, cnFlexCol)}>
          <p className={cn(cnBigDescription, 'mb-4 w-full')}>
            Cette page n'existe pas ou a été déplacée. Vous pouvez revenir à la
            page d'accueil pour trouver ce que vous cherchez.
          </p>
          <p className={cn(cnSmallText, cnLightTextMuted, 'mt-6 italic')}>
            « Mais, vous savez, moi je ne crois pas qu'il y ait de bonne ou de
            mauvaise situation. Moi, si je devais résumer ma vie aujourd'hui
            avec vous, je dirais que c'est d'abord des rencontres, des gens qui
            m'ont tendu la main, peut-être à un moment où je ne pouvais pas, où
            j'étais seul chez moi... »
            <span className='mt-2 block font-medium not-italic'>
              — Otis (Edouard Baer), Astérix et Obélix : Mission Cléopâtre
            </span>
          </p>
        </CardContent>
        <CardFooter>
          <ActionButton
            href='/'
            cta="Retour à l'accueil"
            variant='default'
            onClick={() => setLoading(true)} // Activer l'écran de chargement avant de revenir à l'accueil
          />
        </CardFooter>
      </Card>
    </main>
  );
}
