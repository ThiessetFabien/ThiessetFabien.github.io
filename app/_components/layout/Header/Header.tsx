import Link from 'next/link';
import Header from 'next/headers';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

export const Header = () => {
  return (
    <header>
      <div className='align-center flex h-full items-center justify-between p-8 font-bold'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-5xl'
        >
          Fabien Thiesset
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
