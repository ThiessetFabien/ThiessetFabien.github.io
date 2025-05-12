'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { memo, useEffect, useState } from 'react';

import { Card, CardContent, CardFooter } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { ExperiencesCard } from '@src/components/ui/cards/ExperiencesCard';
import { HeroCard } from '@src/components/ui/cards/HeroCard';
import { FooterCard } from '@src/components/ui/cards/layouts.cards/FooterCard';
import { Header1Card } from '@src/components/ui/cards/layouts.cards/Header1Card';
import SkillsCard from '@src/components/ui/cards/SkillsCard';
import { ProjectsSection } from '@src/components/ui/sections/ProjectsSection';
import LoadingSpinner from '@src/components/ui/spinner/LoadingSpinner';
import {
  cnPadding,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
} from '@src/styles/boxModel.style';
import { cnFlexBetweenY, cnFlexCol } from '@src/styles/flex.style';
import { useCardGrid } from '@src/styles/grid.style';
import type { CardProps } from '@src/types/CardProps';
import type { ExperiencesProps } from '@src/types/ExperiencesProps';

import { useIsClient } from '../hooks/useIsClient.hook';
import { cnBorderNone } from '../styles/border.style';

const LazyTestimonialsCard = dynamic(
  () => import('@src/components/ui/cards/TestimonialsCard'),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner size='lg' message='Chargement des recommandations...' />
    ),
  }
);

/**
 * Renders the home page with various sections including cards, maps, and carousels.
 * @returns {JSX.Element} The rendered home page component.
 */
const HomePage: React.FC = (): JSX.Element => {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    import('@api/data.json')
      .then((module) => {
        setData(module.default as unknown as CardProps[]);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
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
          className={cn(
            'min m-0 min-h-[100dvh] p-0 lg:pl-20',
            cnFlexCol,
            cnBorderNone,
            'rounded-none',

            card.colSpan
          )}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(cnFlexCol, 'h-full')}
          >
            <>
              {card.title && (
                <Header1Card
                  title={card.title}
                  description={card.description}
                  className={cn(cnPadding)}
                />
              )}
              <CardContent
                className={cn(
                  'flex-1',
                  !card.testimonials
                    ? cnPaddingX
                    : 'container h-full min-w-full flex-auto overflow-hidden p-0'
                )}
              >
                {card.imageSrc && !card.map && (
                  <HeroCard
                    name={card.name}
                    familyName={card.familyName}
                    expertises={card.expertises}
                    description={card.description}
                    services={card.services}
                    imageSrc={card.imageSrc}
                    imageAlt={card.imageAlt}
                    className={cn(
                      cnFlexBetweenY,
                      'w-full max-w-full space-y-0'
                    )}
                  />
                )}
                {card.jobs && <SkillsCard jobs={card.jobs} />}
                {card.projects && card.projects.length > 0 && (
                  <ProjectsSection
                    projects={card.projects}
                    className={cn(
                      cnSmallGap,
                      'grid xs:auto-rows-auto sm:grid-cols-2'
                    )}
                  />
                )}
                {card.experiences && card.experiences?.length > 0 && (
                  <ExperiencesCard
                    experiences={card.experiences as ExperiencesProps[]}
                    className=''
                  />
                )}
                {isClient &&
                  card.testimonials &&
                  card.testimonials.length > 0 && (
                    <LazyTestimonialsCard testimonials={card.testimonials} />
                  )}
              </CardContent>
            </>
            {!card.mailto &&
              !card.jobs &&
              ((card.cta1 && card.href1) || (card.cta2 && card.href2)) &&
              card.cta1 &&
              card.cta2 &&
              card.cta3 && (
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
