'use client';

import React from 'react';
import styles from './Navbar.module.scss';

type FilterType = 'all' | 'about' | 'work';

interface navbarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const Navbar: React.FC<navbarProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__content}>
        {(['all', 'about', 'work'] as FilterType[]).map((filter) => (
          <div
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`${styles.navbar__filter} ${
              currentFilter === filter ? styles.active : ''
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        ))}
      </div>
    </nav>
  );
};
