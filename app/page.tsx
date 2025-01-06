/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/lib/components/ui/card';
import fetchData from '@api/data.json';
import { FooterCard } from '@/components/ui/Card/LayoutCard/FooterCard';
import { TestimonialsCarousel } from '@/components/ui/Carousel/TestimonialsCarousel';
import { CardExperiences } from '@/components/ui/Card/ExperiencesCard';
import { CardProjects } from '@/components/ui/Card/ProjectsCard';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import PresentationCard from '@/ui/Card/PresentationCard';
import { HeaderCard } from '@/ui/Card/LayoutCard/HeaderCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import { cnPadding, cnGap, cnPaddingX } from '@/styles/boxModelStyles';
import { MailCard } from '@/ui/Card/MailCard';
import { OtherSkillsCard } from '@/ui/Card/OtherSkillsCard';
import { QuoteCard } from '@/ui/Card/QuoteCard';
import { AchievementsCard } from '@/ui/Card/AchievementsCard';
import { cnParagraph } from '@/styles/fontStyles';

import dynamic from 'next/dynamic';
import type { CardProps } from './types/CardProps';

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const LazyMap = dynamic(() => import('@/ui/Card/MapCard'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const HomePage: React.FC = (): JSX.Element => {
  const gridConfig = useCardGrid(fetchData as CardProps[]);

  return (
    <>
      {gridConfig.map((card, index: number) => (
        <Card key={index} className={cn('h-full w-full', card.colSpan)}>
          {card.imageSrc && !card.map && (
            <PresentationCard
              title={card.title}
              description={card.description}
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
              cta4={card.cta4}
              icon4={card.icon4}
              href4={card.href4}
              downloadActive4={card.downloadActive4}
            />
          )}
          {!card.imageSrc && (
            <>
              <HeaderCard
                title={card.title}
                description={card.description}
                index={index}
              />
              <CardContent
                className={cn(cnPaddingX, 'container overflow-hidden')}
              >
                {card.experiences &&
                  card.experiences.length > 0 &&
                  !card.technologies && (
                    <CardExperiences experiences={card.experiences} />
                  )}
                {card.topTechnologies && (
                  <SkillsCard topTechnologies={card.topTechnologies} />
                )}
                {card.technologies && card.technologies.length > 0 && (
                  <OtherSkillsCard technologies={card.technologies} />
                )}
                {card.testimonials && card.testimonials.length > 0 && (
                  <TestimonialsCarousel testimonials={card.testimonials} />
                )}
                {card.projects && card.projects.length > 0 && (
                  <CardProjects projects={card.projects} />
                )}
                {card.achievements && card.achievements.length > 0 && (
                  <AchievementsCard achievements={card.achievements} />
                )}
                {card.mailto && <MailCard mailto={card.mailto} />}
                {card.map && <LazyMap />}
                {card.quote && <QuoteCard quote={card.quote} />}
                {!card.experiences &&
                  !card.topTechnologies &&
                  !card.technologies &&
                  !card.testimonials &&
                  !card.projects &&
                  !card.achievements &&
                  !card.mailto &&
                  !card.quote && <p className={cnParagraph}>{card.content}</p>}
              </CardContent>
            </>
          )}
          {!card.imageSrc &&
            ((card.cta1 && card.href1) || (card.cta2 && card.href2)) && (
              <CardFooter className={cnPadding}>
                <FooterCard
                  className={cn(cnGap, 'flex h-full w-full')}
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
