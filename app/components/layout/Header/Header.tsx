import { ToggleDarkMode } from '../../ui/ToggleDarkMode/ToggleDarkMode';

export const Header = () => {
  return (
    <header className='h-[8.119rem] border-b'>
      <div className='align-center flex h-full items-center justify-center p-8'>
        <a
          href='/'
          className='pointer-events-auto text-center font-title text-5xl'
        >
          FT
        </a>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
