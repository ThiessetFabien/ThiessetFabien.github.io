import React from 'react';
import { CallToActionProps } from '../../../types/CallToActionProps';

export const CallToAction: React.FC<CallToActionProps> = ({
  cta1,
  cta2,
  href,
}) => {
  return (
    <>
      <a
        href={href}
        className='flex h-24 w-full items-center justify-center border border-border-color px-8 text-center text-xl font-bold'
      >
        {cta1.toLocaleUpperCase()}
        <span className='ml-2'>&rarr;</span>
      </a>
      <a
        href={href}
        className='flex h-24 w-full items-end justify-center px-8 text-center text-xl font-bold'
      >
        {cta2.toLocaleUpperCase()}
      </a>
    </>
  );
};
