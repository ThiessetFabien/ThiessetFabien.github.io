import Image from 'next/image';

export const ImageSection = ({
  imageSrc,
  imageAlt,
  className,
}: {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}) => (
  <Image
    src={imageSrc}
    alt={imageAlt || ''}
    width={100}
    height={100}
    priority
    className={className}
  />
);
