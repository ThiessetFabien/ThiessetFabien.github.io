import { Technology } from '@/types/Technology';

export default interface CardProps {
  imageSrc?? string ;
  imageAlt?? string;
  title: string | null;
  cta1?? string;
  cta2?? string;
  href1?? string;
  href2?? string;
  content?? React.ReactNode;
  technologies?? Technology[];
}
