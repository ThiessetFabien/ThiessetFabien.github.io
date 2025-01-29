/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/hooks/FormatText';
import useCardGrid from '@/hooks/useCardGrid';
import { Card, CardContent, CardFooter } from '@/lib/components/ui/card';
import { cn } from '@/lib/utils';
import {
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import { cnGap, cnPadding } from '@/styles/boxModelStyles';
import { cnFlexBetweenX, cnFlexBetweenY, cnFlexCol } from '@/styles/flexStyles';
import { cnParagraph } from '@/styles/fontStyles';
import type { CardProps } from '@/types/CardProps';
import { AchievementsCard } from '@/ui/Cards/AchievementsCard';
import { ExperiencesCard } from '@/ui/Cards/ExperiencesCard';
import { FooterCard } from '@/ui/Cards/LayoutCards/FooterCard';
import { HeaderCard } from '@/ui/Cards/LayoutCards/HeaderCard';
import { MailCard } from '@/ui/Cards/MailCard';
import { PresentationCard } from '@/ui/Cards/PresentationCard';
import { ProjectsCard } from '@/ui/Cards/ProjectsCard';
import SkillsCard from '@/ui/Cards/SkillsCard';
import fetchData from '@api/data.json';

import { useIsClient } from './hooks/useIsClient';
import { cnSizeFull } from './styles/sizeStyles';

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const LazyMap = dynamic(() => import('@/ui/Cards/MapCard'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const LazyTestimonialsCard = dynamic(
  () => import('@/ui/Carousels/TestimonialsCarousel'),
  {
    ssr: false,
  }
);

const HomePage: React.FC = (): JSX.Element => {
  const gridConfig = useCardGrid(fetchData as CardProps[]);
  const isClient = useIsClient();

  return (
    <>
      {gridConfig.map((card, index: number) => (
        <Card
          key={index}
          id={`card-${index}`}
          className={cn(cnSizeFull, cnFlexCol, card.colSpan)}
        >
          {card.imageSrc && !card.map && (
            <PresentationCard
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
                  'flex-auto',
                  !card.testimonials
                    ? cnPaddingX
                    : 'container h-full min-w-full flex-1 overflow-hidden p-0'
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
                  <MailCard
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
          {!card.imageSrc &&
            !card.mailto &&
            ((card.cta1 && card.href1) || (card.cta2 && card.href2)) && (
              <CardFooter className={cn(cnPaddingX, cnPaddingBottom)}>
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
        </Card>
      ))}
    </>
  );
};

export default HomePage;
