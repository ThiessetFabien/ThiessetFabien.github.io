'use client';

import React from 'react';
import CardData from './api/cards.data.json';
import { Card } from './components/ui/Card/Card';

const HomePage = () => {
  return (
    <>
      {CardData.map((cardProps, index) => (
        <Card key={index} {...cardProps} />
      ))}
    </>
  );
};

export default HomePage;
