import React from 'react';
import { SocialCardProps } from '../../../@types/social';
import styles from './SocialCard.module.scss';

export const SocialCard: React.FC<SocialCardProps> = ({ platform, link }) => {
  return (
    <div className={styles.socialCard}>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        {platform}
      </a>
    </div>
  );
};
