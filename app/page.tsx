'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/lib/components/ui/card';
import CardData from '@api/cards.data.json';
import { FooterCard } from '@/components/ui/Card/LayoutCard/FooterCard';
import { TestimonialsCarousel } from '@/components/ui/Carousel/TestimonialsCarousel';
import { Map } from '@/components/ui/Card/MapCard';
import { CardExperiences } from '@/components/ui/Card/ExperiencesCard';
import { CardProjects } from '@/components/ui/Card/ProjectsCard';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import PresentationCard from '@/ui/Card/PresentationCard';
import { HeaderCard } from '@/ui/Card/LayoutCard/HeaderCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import { cnPadding, cnGap } from '@/styles/boxModelStyles';
import type CardProps from './types/CardProps';
import { MailCard } from '@/ui/Card/MailCard';
import { OtherSkillsCard } from '@/ui/Card/OtherSkillsCard';
import { QuoteCard } from './_components/ui/Card/Quote';
import { AchievementsCard } from '@/ui/Card/AchievementsCard';
import { cnParagraph } from '@/styles/fontStyles';

/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const HomePage: React.FC = (): JSX.Element => {
  const gridConfig = useCardGrid(CardData as CardProps[]);

  return (
    <>
      {gridConfig.map((card, index: number) => (
        <Card
          key={index}
          id={`card-${index}`}
          className={cn('h-full w-full', card.colSpan)}
        >
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
            />
          )}
          {!card.imageSrc && card.map && (
            <Map title={card.title} description={card.description} />
          )}
          {!card.imageSrc && !card.map && (
            <>
              <HeaderCard title={card.title} description={card.description} />
              <CardContent className={cnPadding}>
                {card.experiences &&
                  card.experiences.length > 0 &&
                  !card.technologies && (
                    <CardExperiences experiences={card.experiences} />
                  )}
                {card.top3Technologies && (
                  <SkillsCard top3Technologies={card.top3Technologies} />
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
                {card.quote && <QuoteCard quote={card.quote} />}
                {!card.experiences &&
                  !card.top3Technologies &&
                  !card.technologies &&
                  !card.testimonials &&
                  !card.projects &&
                  !card.achievements &&
                  !card.mailto &&
                  !card.quote && <p className={cnParagraph}>{card.content}</p>}
              </CardContent>
            </>
          )}
          {((card.cta1 && card.href1) || (card.cta2 && card.href2)) && (
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
