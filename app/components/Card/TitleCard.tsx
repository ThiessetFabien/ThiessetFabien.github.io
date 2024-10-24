import React from 'react';
import styles from './TitleCard.module.scss';

export const TitleCard: React.FC = () => {
  return (
    <div className={styles.title}>
      <h1 className={styles.title__text}>
        🌞 Personal Portfolio 🌞 Personal Portfolio 🌞 Personal Portfolio
      </h1>
    </div>
  );
};
