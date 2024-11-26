import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='h-[8.119rem]'>
      <div className='align-center flex h-full items-center justify-center p-8'>
        <Link href='/' className='pointer-events-auto text-center text-5xl'>
          FT
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
