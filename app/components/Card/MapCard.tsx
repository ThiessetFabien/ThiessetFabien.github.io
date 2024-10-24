import React from 'react';
import styles from './MapCard.module.scss';

export const MapCard: React.FC = () => {
  return (
    <div className={styles.mapCard}>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9f3f3f3f3!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611817431234!5m2!1sen!2sau'
        width='100%'
        height='100%'
        allowFullScreen
        loading='lazy'
      ></iframe>
    </div>
  );
};
