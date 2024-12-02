import Link from 'next/link';

import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

export const Header = () => {
  return (
    <header className='bg-background'>
      <div className='align-center m-auto flex h-full max-w-3xl items-center justify-between p-8'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-2xl font-bold leading-tight tracking-tight'
        >
          FT
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
