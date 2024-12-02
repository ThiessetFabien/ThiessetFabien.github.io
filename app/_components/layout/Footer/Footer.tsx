import React from 'react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='grid justify-center p-4 text-center'>
      <div>
        <p className='text-sm font-light'>
          &copy; {year} Fabien Thiesset - All rights reserved.
          <br />
          Fonts made from
          <a href='http://www.onlinewebfonts.com'>Web Fonts</a> is licensed by
          CC BY 4.0
        </p>
      </div>
    </footer>
  );
};
