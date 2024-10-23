'use client';

import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>&copy; {year} Created with ❤️ by Thiesset Fabien</p>
    </footer>
  );
};
