import React from 'react';

interface CallToActionProps {
  cta1: string;
  cta2: string;
  href: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  cta1,
  cta2,
  href,
}) => {
  return (
    <div>
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
    </div>
  );
};
