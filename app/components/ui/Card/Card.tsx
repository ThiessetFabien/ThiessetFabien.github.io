import Image from 'next/image';
import React from 'react';

interface CardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className='grid gap-[1.1rem] px-10 py-16'>
      <div className='border-[0.1rem] border-solid border-red-500'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className='h-auto w-full'
        ></Image>
      </div>
      <div className='flex h-[9.4rem] flex-col justify-end border-[0.1rem] border-solid border-blue-500'>
        <div className='font-title text-3xl text-white'>{title}</div>
      </div>
      <div className='border-[0.1rem] border-solid border-green-500 font-body text-lg font-normal text-white'>
        {content}
      </div>
    </div>
  );
};
