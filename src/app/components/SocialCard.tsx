import React from 'react';
import styles from '../styles/SocialCard.module.scss';

interface SocialCardProps {
  platform: 'GitHub' | 'LinkedIn';
  link: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({ platform, link }) => {
  return (
    <div className={styles.socialCard}>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        {platform}
      </a>
    </div>
  );
};
