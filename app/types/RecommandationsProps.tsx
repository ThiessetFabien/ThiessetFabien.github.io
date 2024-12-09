export interface Recommandations {
  recommandations: Recommandation[];
  className: string;
}

export interface Recommandation {
  name: string;
  context: string;
  date: string;
  content: string;
  imageSrc: string;
  linkedin: string;
  mail: string;
  phone: string;
}
