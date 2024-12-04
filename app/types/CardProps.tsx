import { Technologies } from './Technologies';
import { Experiences } from './Experiences';
import { Projects } from './Projects';

export default interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  cta1?: string;
  icon1?: string;
  href1?: string;
  downloadActive1: boolean;
  cta2?: string;
  icon2?: string;
  href2?: string;
  downloadActive2: boolean;
  map?: boolean;
  experiences?: Experiences[];
  otherExperiences?: Experiences[];
  projects?: Projects[];
  technologies?: Technologies[];

  content?: React.ReactNode;
  className?: string;
}
