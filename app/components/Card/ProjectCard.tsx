import Image from 'next/image.js';
import React from 'react';
import styles from './ProjectCard.module.scss';

interface project {
  image: string;
  link: string;
  tags: string[];
}

interface projectcardprops {
  projects: project[];
}

export const ProjectCard: React.FC<projectcardprops> = ({ projects }) => {
  return (
    <div className={styles.projectCard}>
      {projects.map((project, index) => (
        <div key={index} className={styles.project}>
          <Image src={project.image} alt='Project' width='100' height='100' />
          <a href={project.link} target='_blank' rel='noopener noreferrer'>
            Voir le projet
          </a>
          <div className={styles.tags}>
            {project.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
