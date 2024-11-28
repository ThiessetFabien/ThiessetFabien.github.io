'use client';

import React from 'react';
import CardData from '@api/cards.data.json';
import { CardComponent } from '@/ui/Card/Card';

const HomePage = () => {
  return (
    <main>
      {CardData.map((cardProps, index) => (
        <CardComponent key={index} {...cardProps} />
      ))}
    </main>
  );
};

export default HomePage;
