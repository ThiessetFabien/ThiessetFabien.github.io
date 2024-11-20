'use client';

import CardData from './api/cards.data.json';
import { Card } from './components/ui/Card/Card';

const HomePage = () => {
  return (
    <div>
      {CardData.map((cardProps, index) => (
        <Card key={index} {...cardProps} />
      ))}
    </div>
  );
};

export default HomePage;
