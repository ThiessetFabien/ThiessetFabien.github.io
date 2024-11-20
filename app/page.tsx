'use client';

import { Card } from './components/ui/Card/Card';
import { Map } from './components/ui/Map/Map';

const HomePage = () => {
  return (
    <div>
      <Card
        title='🚧🚧 En construction 🚧🚧'
        imageSrc=''
        imageAlt=''
        cta1=''
        cta2=''
        href=''
        content=''
      />
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
      <Card
        title='Véhiculé et mobile à 30 minutes et plus si télétravail'
        imageSrc=''
        imageAlt=''
        cta1=''
        cta2=''
        href=''
        content={<Map />}
      />
    </div>
  );
};

export default HomePage;
