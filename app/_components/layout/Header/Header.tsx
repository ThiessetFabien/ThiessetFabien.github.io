import Link from 'next/link';

import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

export const Header = () => {
  return (
    <header className='relative isolate bg-background'>
      <div className='align-center fixed top-0 z-auto m-auto flex h-full max-w-3xl items-center justify-between px-4 py-8'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-xl leading-tight tracking-tight'
        >
          FT
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
