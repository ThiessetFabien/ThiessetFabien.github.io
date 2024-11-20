import { Map } from '../components/ui/Map/Map';

export const cards = [
  {
    title: '🚧🚧 En construction 🚧🚧',
  },
  {
    title: 'Développeur humain, créatif et innovant.',
    imageSrc: '/images/photo.png',
    imageAlt: 'Photo de Fabien',
    cta1: 'Embauchez un expert',
    cta2: 'Découvrez mes projets',
    href: '#',
    content: (
      <p>
        Soyons honnêtes et oeuvrons ensemble pour un monde accessible et humain.
        Vous avez besoin d'un site Web qui soit superbe et qui fonctionne
        réellement.
      </p>
    ),
  },
  {
    title: 'Véhiculé et mobile à 30 minutes et plus si télétravail',
    content: <Map />,
  },
];
