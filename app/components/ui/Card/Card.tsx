import React from 'react';

interface CardProps {
  title: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className='px-10 py-16'>
      <div className='font-title text-3xl text-white'>{title}</div>
      <div className='font-body text-lg font-normal text-white'>{content}</div>
    </div>
  );
};
