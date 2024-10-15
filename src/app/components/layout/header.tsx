export const Header = () => {
  return (
    <header>
      <nav className='flex items-center justify-center px-3 py-12'>
        <ul className='rounded-sm-3xl border-1 flex gap-4 p-1.5'>
          <li className='bg-midnight-navy text-ice-white top-0 w-full p-4 text-center'>
            All
          </li>
          <li className='bg-midnight-navy text-ice-white top-0 w-full p-4 text-center'>
            About
          </li>
          <li className='bg-midnight-navy text-ice-white top-0 w-full p-4 text-center'>
            Work
          </li>
        </ul>
      </nav>
    </header>
  );
};
