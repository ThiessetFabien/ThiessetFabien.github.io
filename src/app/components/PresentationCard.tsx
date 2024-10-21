import Image from 'next/image';
import React from 'react';
import styles from '../styles/PresentationCard.module.scss';

export const PresentationCard: React.FC = () => {
  return (
    <div className={styles.presentationCard}>
      <Image src='' alt='Ma photo' width='100' height='100' />
      <div>
        <h2>Thiesset Fabien</h2>
        <p>
          Développeur web passionné, je façonne le futur du web avec
          détermination. Prêt à relever tous les défis pour créer des
          expériences en ligne extraordinaires!
        </p>
      </div>
    </div>
  );
};
