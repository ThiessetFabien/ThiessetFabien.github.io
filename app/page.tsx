'use client';

import { Card } from './components/ui/Card/Card';

const HomePage = () => {
  return (
    <div>
      <Card
        title='Développeur humain, créatif et innovant.'
        imageSrc='/images/photo.png'
        imageAlt='Photo de Fabien'
        cta1='Embauchez un expert'
        cta2='Découvrez mes projets'
        href='#'
        content={
          <p>
            Soyons honnêtes et oeuvrons ensemble pour un monde accessible et
            humain. Vous avez besoin d'un site Web qui soit superbe et qui
            fonctionne réellement.
          </p>
        }
      />
    </div>
  );
};

export default HomePage;
