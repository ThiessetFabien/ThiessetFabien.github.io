import React from 'react';
import { SkillsCardProps } from '../@types/skills.d';
import styles from '../styles/SkillsCard.module.scss';

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
