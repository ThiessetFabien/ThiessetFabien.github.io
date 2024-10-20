import React from 'react';
import styles from '../styles/ExperienceCard.module.scss';

export const ExperienceCard: React.FC = () => {
  return (
    <div className={styles.experienceCard}>
      <h2>Expériences</h2>
      <p>Liste des expériences professionnelles sans détails.</p>
    </div>
  );
};
