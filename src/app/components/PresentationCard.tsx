import Image from 'next/image';
import React from 'react';
import styles from '../styles/PresentationCard.module.scss';

export const PresentationCard: React.FC = () => {
  return (
    <div className={styles.presentationCard}>
      <Image src='' alt='Ma photo' width='100' height='100' />
      <div>
        <h2>Nom Prénom</h2>
        <p>Paragraphe de présentation sur deux lignes.</p>
      </div>
    </div>
  );
};
