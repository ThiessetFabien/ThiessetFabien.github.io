'use client';
import React from 'react';
import dynamicYear from '@/utils/dynamicYear';

export const Footer: React.FC = () => {
  return (
    <footer className='grid justify-center p-4 text-center'>
      <p className='text-sm font-light'>
        &copy; {dynamicYear} Fabien Thiesset - All rights reserved.
        <br />
        Fonts made from
        <a href='http://www.onlinewebfonts.com'>Web Fonts</a> is licensed by CC
        BY 4.0
      </p>
    </footer>
  );
};
