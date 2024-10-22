'use client';

import { useState } from 'react';
import { ContactCard } from './components/ContactCard';
import { CVCard } from './components/CVCard';
import { ExperienceCard } from './components/ExperienceCard';
import { MapCard } from './components/MapCard';
import { PresentationCard } from './components/PresentationCard';
import { ProjectCard } from './components/ProjectCard';
import { RecommendationCard } from './components/RecommendationCard';
import { SkillsCard } from './components/SkillsCard';
import { SocialCard } from './components/SocialCard';
import { TitleCard } from './components/TitleCard';
import styles from './Home.module.scss';

const HomePage = () => {
  const [filter, setFilter] = useState<'all' | 'about' | 'work'>('all');

  const handleFilterChange = (newFilter: 'all' | 'about' | 'work') => {
    setFilter(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <TitleCard />
        <PresentationCard />
        <MapCard />
        <SocialCard platform='GitHub' link='https://github.com/username' />
        <SocialCard
          platform='LinkedIn'
          link='https://linkedin.com/in/username'
        />
        <ContactCard />
        <ProjectCard
          projects={[
            {
              image: '/project1.jpg',
              link: 'https://project1.com',
              tags: ['React', 'Next.js'],
            },
          ]}
        />
        <RecommendationCard
          recommendations={[{ text: 'Great work!', author: 'John Doe' }]}
        />
        <SkillsCard skills={['JavaScript', 'React', 'Next.js']} />
        <ExperienceCard />
        <CVCard />
      </div>
    </div>
  );
};

export default HomePage;
