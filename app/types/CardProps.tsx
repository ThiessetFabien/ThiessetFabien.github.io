import { Technologies } from './Technologies';
import { Experiences } from './Experiences';

export default interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  cta1?: string;
  href1?: string;
  downloadActive1: boolean;
  cta2?: string;
  href2?: string;
  downloadActive2: boolean;
  map?: boolean;
  experiences?: Experiences[];
  otherExperiences?: Experiences[];
  technologies?: Technologies[];

  content?: React.ReactNode;
  className?: string;
}
