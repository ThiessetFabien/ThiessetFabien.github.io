export interface CardProps {
  imageSrc?: string | null;
  imageAlt: string | null;
  title: string | null;
  cta1?: string | null;
  cta2?: string | null;
  href?: string | null;
  content?: React.ReactNode;
}
