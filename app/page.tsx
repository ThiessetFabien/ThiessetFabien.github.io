'use client';

import React from 'react';
import CardData from '@api/cards.data.json';
import { Card } from '@/ui/Card/Card';
import { Header } from '@/layout/Header/Header';
import { Footer } from '@/layout/Footer/Footer';

const HomePage = () => {
  return (
    <main>
      <Header />
      {CardData.map((cardProps, index) => (
        <Card key={index} {...cardProps} />
      ))}
      <Footer />
    </main>
  );
};

export default HomePage;
