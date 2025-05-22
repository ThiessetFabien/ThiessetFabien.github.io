import Image from 'next/image';

import { cn } from '@src/lib/utils';
import { cnBorderRadiusFull } from '@styles/border.style';
import { cnSizeFull } from '@styles/size.style';
import { baseUrl } from '@src/utils/baseUrl.util';

interface TestimonialImageProps {
  src: string;
  alt: string;
}

export const TestimonialImage = ({ src, alt }: TestimonialImageProps) => {
  const isAbsoluteUrl = src.startsWith('http://') || src.startsWith('https://');

  const isDataUrl = src.startsWith('data:image/');

  let imageUrl;
  if (isAbsoluteUrl || isDataUrl) {
    imageUrl = src;
  } else if (src.startsWith('media.licdn.com')) {
    imageUrl = `https://${src}`;
  } else {
    imageUrl = `${baseUrl}${src}`;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      sizes='(max-width: 768px) 64px, 96px'
      className={cn(
        'aspect-square object-cover',
        cnSizeFull,
        cnBorderRadiusFull
      )}
      loading='lazy'
      priority={false}
      unoptimized={isAbsoluteUrl || src.startsWith('media.licdn.com')}
    />
  );
};
