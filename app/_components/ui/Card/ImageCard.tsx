'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * @file CardImage.tsx
 * @description This file exports a component that renders an image for a card.
 */

/**
 * CardImage component.
 * @param {Object} props - The props for the component.
 * @param {string} props.imageSrc - The source URL for the image.
 * @param {string} [props.imageAlt] - The alt text for the image.
 * @param {number} props.width - The width of the image.
 * @param {number} props.height - The height of the image.
 * @param {string} [props.className] - Additional class names to apply to the image.
 * @returns {JSX.Element} The rendered CardImage component.
 * @example
 * <CardImage imageSrc="/path/to/image.jpg" imageAlt="Description" width={590} height={332} className="custom-class" />
 */

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
    className={cn('mb-4 rounded-xl', className)}
  />
);
