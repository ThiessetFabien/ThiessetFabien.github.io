import Image from 'next/image';

interface ProfileImageInterface {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

export const ProfileImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ProfileImageInterface) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
      sizes='(max-width: 640px) 100px, (max-width: 768px) 200px, 300px'
    />
  );
};
