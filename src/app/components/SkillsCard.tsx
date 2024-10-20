import React from 'react';
import styles from '../styles/SkillsCard.module.scss';

interface SkillsCardProps {
  skills: string[];
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  return (
    <div className={styles.skillsCard}>
      {skills.map((skill, index) => (
        <div key={index} className={styles.skill}>
          {skill}
        </div>
      ))}
    </div>
  );
};
