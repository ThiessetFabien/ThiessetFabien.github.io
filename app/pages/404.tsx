import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='mb-4 text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mb-8 text-lg'>
        Oops! The page you are looking for does not exist.
      </p>
      <Link href='/'>
        <a className='text-blue-500 hover:underline'>Go back to Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
