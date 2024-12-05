'use client';

import Image from 'next/image';

export const CardImage = ({
  imageSrc,
  imageAlt,
  width,
  height,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  width: number;
  height: number;
  className?: string;
}) => (
  <Image
    src={`/images${imageSrc}`}
    alt={imageAlt || ''}
    width={width}
    height={height}
    priority
    className={className}
  />
);
