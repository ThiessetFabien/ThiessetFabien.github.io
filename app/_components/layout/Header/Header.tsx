import Link from 'next/link';

import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

export const Header = () => {
  return (
    <header className='sticky top-0 bg-background'>
      <div className='align-center m-auto flex h-full max-w-3xl items-center justify-between px-4 py-8'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-4xl'
        >
          FT
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
