'use client';

import { Card } from './components/ui/Card/Card';

const HomePage = () => {
  return (
    <div className='flex flex-wrap items-center'>
      <Card
        title='Développeur humain, créatif et innovant.'
        content={
          <div className='flex flex-col items-center'>
            <img
              className=''
              src='/images/photo.png'
              alt='Photo de Fabien'
            ></img>
            <p>
              Soyons honnêtes et oeuvrons ensemble pour un monde accessible et
              humain. Vous avez besoin d'un site Web qui soit superbe et qui
              fonctionne réellement.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default HomePage;
