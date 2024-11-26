import { Technology } from '@/types/Technology';

export default interface CardProps {
  imageSrc?: string | null;
  imageAlt?: string | null;
  title: string | null;
  cta1?: string | null | undefined;
  cta2?: string | null | undefined;
  href1?: string | null | undefined;
  href2?: string | null | undefined;
  content?: React.ReactNode;
  technologies?: Technology[];
}
