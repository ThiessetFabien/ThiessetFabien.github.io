import React from 'react';
import styles from './ContactCard.module.scss';

export const ContactCard: React.FC = () => {
  return (
    <div className={styles.contactCard}>
      <form>
        <input type='text' placeholder='Nom' />
        <input type='email' placeholder='Email' />
        <textarea placeholder='Message'></textarea>
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  );
};
