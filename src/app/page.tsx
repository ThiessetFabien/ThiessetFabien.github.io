/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

'use client';

// Corrigez l'import de framer-motion
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { memo, useEffect, useState } from 'react';

import { AchievementsCard } from '@/src/components/ui/cards/AchievementsCard';
import { ExperiencesCard } from '@/src/components/ui/cards/ExperiencesCard';
import { HeroCard } from '@/src/components/ui/cards/HeroCard';
import { FooterCard } from '@/src/components/ui/cards/layouts.cards/FooterCard';
import { HeaderCard } from '@/src/components/ui/cards/layouts.cards/HeaderCard';
import { ProjectsCard } from '@/src/components/ui/cards/ProjectsCard';
import SkillsCard from '@/src/components/ui/cards/SkillsCard';
import LoadingSpinner from '@/src/components/ui/spinner/LoadingSpinner';
import {
  cnGap,
  cnPadding,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
  cnSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexBetweenY, cnFlexCol } from '@/src/styles/flex.style';
import { cnParagraph } from '@/src/styles/font.style';
import { useCardGrid } from '@/src/styles/grid.style';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { ContactForm } from '@forms/ContactForm';
import { Card, CardContent, CardFooter } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { useIsClient } from '../hooks/useIsClient.hook';

/**
 * Chargement différé des composants lourds pour améliorer les performances
 */
const LazyMap = dynamic(() => import('@/src/components/ui/cards/MapCard'), {
  ssr: false,
  loading: () => <LoadingSpinner size='lg' message='Loading map...' />,
});

const LazyTestimonialsCard = dynamic(
  () => import('@/src/components/ui/carousels/TestimonialsCarousel'),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner size='md' message='Loading testimonials...' />
    ),
  }
);

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */
const HomePage: React.FC = (): JSX.Element => {
  const [data, setData] = useState<CardProps[]>([]);

  // Utilisation correcte de useEffect (pas UseEffect)
  useEffect(() => {
    // Importation dynamique des données
    import('@api/data.json')
      .then((module) => {
        // Utilisation d'un type casting pour éviter l'erreur TypeScript
        setData(module.default as unknown as CardProps[]);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données:', error);
        // Définir un état d'erreur ou des données par défaut si nécessaire
        setData([]);
      });
  }, []);

  const gridConfig = useCardGrid(data);
  const isClient = useIsClient();

  return (
    <>
      {gridConfig.map((card, index: number) => (
        <Card
          key={index}
          id={`card-${index}`}
          className={cn('h-full items-stretch', cnFlexCol, card.colSpan)}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex h-full flex-col'
          >
            {card.imageSrc && !card.map && (
              <HeroCard
                title={card.title}
                description={card.description}
                content={card.content}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                cta1={card.cta1}
                icon1={card.icon1}
                href1={card.href1}
                downloadActive1={card.downloadActive1}
                cta2={card.cta2}
                icon2={card.icon2}
                href2={card.href2}
                downloadActive2={card.downloadActive2}
                cta3={card.cta3}
                icon3={card.icon3}
                href3={card.href3}
                downloadActive3={card.downloadActive3}
                className={cn(
                  cnGap,
                  cnPadding,
                  cnFlexBetweenY,
                  'w-full flex-auto space-y-0'
                )}
              />
            )}
            {!card.imageSrc ? (
              <>
                <HeaderCard
                  title={card.title}
                  description={card.description}
                  index={index}
                  className={cnPadding}
                />
                <CardContent
                  className={cn(
                    'flex-1',
                    !card.testimonials
                      ? cnPaddingX
                      : 'container h-full min-w-full flex-auto overflow-hidden p-0'
                  )}
                >
                  {card.experiences &&
                    card.experiences?.length > 0 &&
                    !card.technologies && (
                      <ExperiencesCard
                        experiences={card.experiences}
                        className=''
                      />
                    )}
                  {isClient &&
                    card.topTechnologies &&
                    card.technologies &&
                    card.technologies.length > 0 && (
                      <SkillsCard
                        topTechnologies={card.topTechnologies}
                        technologies={card.technologies}
                        content={card.content}
                        className={cn(
                          'flex w-full min-w-full flex-row flex-wrap',
                          'container overflow-hidden',
                          cnSmallGap
                        )}
                      />
                    )}
                  {isClient &&
                    card.testimonials &&
                    card.testimonials.length > 0 && (
                      <LazyTestimonialsCard testimonials={card.testimonials} />
                    )}
                  {card.projects && card.projects.length > 0 && (
                    <ProjectsCard
                      projects={card.projects}
                      className={cn(
                        cnSmallGap,
                        'grid xs:auto-rows-auto sm:grid-cols-2 lg:grid-cols-4'
                      )}
                    />
                  )}
                  {card.achievements && card.achievements.length > 0 && (
                    <AchievementsCard
                      achievements={card.achievements}
                      className={cnSpaceY}
                    />
                  )}
                  {card.mailto && (
                    <ContactForm
                      mailto={card.mailto}
                      cta1={card.cta1}
                      icon1={card.icon1}
                      href1={card.href1}
                      downloadActive1={card.downloadActive1}
                      cta2={card.cta2}
                      icon2={card.icon2}
                      href2={card.href2}
                      downloadActive2={card.downloadActive2}
                      cta3={card.cta3}
                      icon3={card.icon3}
                      href3={card.href3}
                      downloadActive3={card.downloadActive3}
                      className={cnSpaceY}
                    />
                  )}
                  {isClient && card.map && <LazyMap />}
                  {!card.experiences &&
                    !card.topTechnologies &&
                    !card.technologies &&
                    !card.testimonials &&
                    !card.projects &&
                    !card.achievements &&
                    !card.mailto && (
                      <p className={cnParagraph}>
                        {typeof card.content === 'string' &&
                          capitalizeFirstLetterOfPhrase(
                            formatSpecialWords(card.content)
                          )}
                      </p>
                    )}
                </CardContent>
              </>
            ) : (
              <CardContent className='hidden' />
            )}
            {!card.mailto &&
              ((card.cta1 && card.href1) || (card.cta2 && card.href2)) && (
                <CardFooter
                  className={cn(cnPaddingX, cnPaddingBottom, 'flex-none')}
                >
                  <FooterCard
                    className={'flex w-full'}
                    cta1={card.cta1}
                    icon1={card.icon1}
                    href1={card.href1}
                    downloadActive1={card.downloadActive1}
                    cta2={card.cta2}
                    icon2={card.icon2}
                    href2={card.href2}
                    downloadActive2={card.downloadActive2}
                    cta3={card.cta3}
                    icon3={card.icon3}
                    href3={card.href3}
                    downloadActive3={card.downloadActive3}
                  />
                </CardFooter>
              )}
          </motion.div>
        </Card>
      ))}
    </>
  );
};

export default memo(HomePage);
