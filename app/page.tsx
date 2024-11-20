'use client';

import { cards } from './api/cards.api';
import { Card } from './components/ui/Card/Card';

const HomePage = () => {
  return (
    <div>
      {cards.map((cardProps, index) => (
        <Card key={index} {...cardProps} />
      ))}
    </div>
  );
};

export default HomePage;
