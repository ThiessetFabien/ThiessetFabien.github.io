import { Technologies } from './Technologies';
import { Experiences } from './Experiences';

export default interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  cta1?: string;
  cta2?: string;
  href1?: string;
  href2?: string;
  map?: boolean;
  experiences?: Experiences[];
  content?: React.ReactNode;
  technologies?: Technologies[];
  className?: string;
}
