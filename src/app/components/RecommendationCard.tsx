import React from 'react';
import { RecommendationCardProps } from '../@types/recommandation.d';
import styles from '../styles/RecommendationCard.module.scss';

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
