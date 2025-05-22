'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';

import { Card, CardContent, CardFooter } from '@lib/components/ui/card';
import { cn } from '@lib/utils';
import { ExperiencesSection } from '@ui/sections/ExperiencesSection';
import { HeroSection } from '@ui/sections/HeroSection';
import { FooterCard } from '@ui/cards/layouts.cards/FooterCard';
import { Header1Card } from '@ui/cards/layouts.cards/Header1Card';
import SkillsCard from '@ui/sections/AboutSection';
import { ProjectsSection } from '@ui/sections/ProjectsSection';
import LoadingSpinner from '@ui/spinner/LoadingSpinner';
import { useData } from '@src/contexts/DataContext';
import { useIsClient } from '@src/hooks/useIsClient.hook';
import { getSectionId } from '@src/config/sectionMappings';
import {
  cnPadding,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
} from '@styles/boxModel.style';
import { cnFlexBetweenY, cnFlexCenterY, cnFlexCol } from '@styles/flex.style';
import { cnBorderNone } from '@styles/border.style';
import type { ExperiencesProps } from '@src/types/ExperiencesProps';

const LazyTestimonialsCard = dynamic(
  () => import('@ui/sections/ContactSection'),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner size='lg' message='Chargement des recommandations...' />
    ),
  }
);

const LazyMapCard = dynamic(() => import('@ui/cards/MapCard'), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const { data } = useData();
  const isClient = useIsClient();

  return (
    <>
      {data.map((card, index: number) => {
        const sectionId = getSectionId(index);

        return (
          <Card
            key={index}
            id={sectionId}
            className={cn(
              'min m-0 h-full min-h-[100dvh] p-0 lg:pl-20',
              cnFlexCol,
              cnFlexCenterY,
              cnBorderNone,
              'rounded-none'
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
                    <HeroSection
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
                    <ExperiencesSection
                      experiences={card.experiences as ExperiencesProps[]}
                      className=''
                    />
                  )}
                  {isClient &&
                    card.testimonials &&
                    card.testimonials.length > 0 && (
                      <LazyTestimonialsCard testimonials={card.testimonials} />
                    )}
                  {isClient && card.map && <LazyMapCard />}
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
                      className='flex w-full'
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
        );
      })}
    </>
  );
};

export default memo(HomePage);
