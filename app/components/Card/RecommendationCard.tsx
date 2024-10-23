import React from 'react';
import { RecommendationCardProps } from '../../../@types/recommendation';
import styles from './RecommendationCard.module.scss';

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendations,
}) => {
  return (
    <div className={styles.recommendationCard}>
      {recommendations.map((rec, index) => (
        <div key={index} className={styles.recommendation}>
          <p>{rec.text}</p>
          <p>
            <strong>{rec.author}</strong>
          </p>
        </div>
      ))}
    </div>
  );
};
