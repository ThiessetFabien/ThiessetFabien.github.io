import { Technology } from '@/types/Technology';

export default interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  cta1?: string;
  cta2?: string;
  href1?: string;
  href2?: string;
  map?: boolean;
  content?: React.ReactNode;
  technologies?: Technology[];
}
