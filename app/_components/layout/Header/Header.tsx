import Link from 'next/link';

import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';
import { Section } from '@/components/Section/Section';

export const Header = () => {
  return (
    <header className='sticky top-0 bg-background'>
      <Section className='align-center flex h-full items-center justify-between p-8 font-bold'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-lg'
        >
          Hey, I'm Fabien 👋🏼
        </Link>
        <ToggleDarkMode />
      </Section>
    </header>
  );
};
