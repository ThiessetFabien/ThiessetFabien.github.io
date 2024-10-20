import React from 'react';
import styles from '../styles/CVCard.module.scss';

export const CVCard: React.FC = () => {
  return (
    <div className={styles.cvCard}>
      <button>Lire CV</button>
      <button>Télécharger CV</button>
    </div>
  );
};
