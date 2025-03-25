import Image from 'next/image';

import { baseUrl } from '@/src/lib/utils/baseUrl.util';

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
  } else {
    if (src.startsWith('media.licdn.com')) {
      imageUrl = `https://${src}`;
    } else {
      imageUrl = `${baseUrl}${src}`;
    }
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={120}
      height={120}
      className='aspect-square h-full w-full'
      loading='lazy'
      unoptimized={isAbsoluteUrl || src.startsWith('media.licdn.com')}
    />
  );
};
