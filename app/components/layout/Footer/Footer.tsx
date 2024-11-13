import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>&copy; {year} Created with ❤️ by Thiesset Fabien</p>
      <div>
        Fonts made from <a href='http://www.onlinewebfonts.com'>Web Fonts</a> is
        licensed by CC BY 4.0
      </div>{' '}
    </footer>
  );
};
