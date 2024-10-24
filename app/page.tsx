'use client';

import { useState } from 'react';
import { ContactCard } from './components/Card/ContactCard';
import { CVCard } from './components/Card/CVCard';
import { ExperienceCard } from './components/Card/ExperienceCard';
import { MapCard } from './components/Card/MapCard';
import { PresentationCard } from './components/Card/PresentationCard';
import { ProjectCard } from './components/Card/ProjectCard';
import { RecommendationCard } from './components/Card/RecommendationCard';
import { SkillsCard } from './components/Card/SkillsCard';
import { SocialCard } from './components/Card/SocialCard';
import { TitleCard } from './components/Card/TitleCard';
import styles from './Home.module.scss';

const HomePage = () => {
  const [filter, setFilter] = useState<'all' | 'about' | 'work'>('all');

  const handleFilterChange = (newFilter: 'all' | 'about' | 'work') => {
    setFilter(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <PresentationCard />
        <TitleCard />
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
