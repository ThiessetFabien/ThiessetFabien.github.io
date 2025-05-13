'use client';

import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@lib/components/ui/card';
import { useLoading } from '@src/contexts/LoadingContext';
import { cnBorderNone } from '@src/styles/border.style';
import { cnSmallSpaceY } from '@src/styles/boxModel.style';
import { cnFlexCol, cnFlexFullCenter } from '@src/styles/flex.style';
import { cnFlexCenterY } from '@styles/flex.style';

import { ActionButton } from '../components/ui/buttons/ActionButton';
import { cn } from '../lib/utils';
import {
  cnBigDescription,
  cnLightTextMuted,
  cnSmallText,
  cnTitle1,
} from '../styles/font.style';

export default function NotFound() {
  const { setLoading } = useLoading();

  // Désactiver l'écran de chargement dès que le composant NotFound est monté
  useEffect(() => {
    setLoading(false);
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
          'min m-0 min-h-[100dvh] p-0 lg:pl-20',
          cnBorderNone,
          cnSmallSpaceY,
          'rounded-none'
        )}
      >
        <CardHeader className='max-h-[10vh] w-full'>
          <h1 className={cn(cnTitle1, 'text-2xl font-bold')}>
            Erreur 404 : Page non trouvée
          </h1>
        </CardHeader>
        <CardContent className={cn(cnFlexCenterY, cnFlexCol)}>
          <p className={cn(cnBigDescription, 'w-full')}>
            Cette page n’existe pas ou a été supprimée. Vous pouvez essayer de
            revenir à la page d’accueil pour trouver ce que vous cherchez.
          </p>{' '}
          <p className={cn(cnSmallText, cnLightTextMuted)}>
            « Mais, vous savez, moi je ne crois pas qu’il y ait de bonne ou de
            mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui
            avec vous, je dirais que c’est d’abord des rencontres, des gens qui
            m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où
            j’étais seul chez moi. Et c’est assez curieux de se dire que les
            hasards, les rencontres forgent une destinée… Parce que quand on a
            le goût de la chose, quand on a le goût de la chose bien faite, le
            beau geste, parfois on ne trouve pas l’interlocuteur en face, je
            dirais, le miroir qui vous aide à avancer. Alors ce n’est pas mon
            cas, comme je le disais là, puisque moi au contraire, j’ai pu ; et
            je dis merci à la vie, je lui dis merci, je chante la vie, je danse
            la vie… Je ne suis qu’amour ! Et finalement, quand beaucoup de gens
            aujourd’hui me disent : « Mais comment fais-tu pour avoir cette
            humanité ? » Eh bien je leur réponds très simplement, je leur dis
            que c’est ce goût de l’amour, ce goût donc qui m’a poussé
            aujourd’hui à entreprendre une construction mécanique, mais demain,
            qui sait, peut-être simplement à me mettre au service de la
            communauté, à faire le don, le don de soi… ».
            <span className='italic'>
              {' '}
              Otis interprété par Edouard Baer dans Astérix et Obélix : Mission
              Cléopâtre.
            </span>
          </p>
        </CardContent>
        <CardFooter className={'max-h-[10vh]'}>
          <ActionButton href='/' cta='Retour à l’accueil' variant={'default'} />
        </CardFooter>
      </Card>
    </main>
  );
}
