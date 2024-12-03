export interface Projects {
  title: string;
  organization: string;
  imageSrc: string;
  imageAlt: string;
  website: string;
  github: string;
  tags: Tags[];
}

export interface Tags {
  tag: string;
}
