import { cn } from '@/lib/utils';

export const cnTitle1 = cn(
  'font-caption font-bold leading-tight tracking-tight',
  'text-2xl',
  'sm:text-3xl',
  'md:text-4xl'
);

export const cnTitle2Size = cn('text-base', 'sm:text-lg', 'md:text-xl');

export const cnTitle2 = cn(
  'font-caption font-bold leading-tight tracking-tight'
);

export const cnTitle3 = cn(
  'font-caption',
  'text-xs',
  'sm:text-sm',
  'md:text-base'
);

export const cnBigDescription = cn('text-sm', 'sm:text-base', 'md:text-lg');

export const cnDescription = cn('font-light leading-relaxed');

export const cnParagraph = cn('font-light', 'leading-relaxed', 'text-xs');

export const cnSmallText = cn('text-xs lg:text-sm', 'leading-relaxed ');

export const cnBoldTextMuted = cn('text-muted-foreground', 'font-semibold');

export const cnLightTextMuted = cn('text-muted-foreground', 'font-light');

export const capitalizeFirstLetterOfEachWord = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const capitalizeFirstLetterOfPhrase = (str: string) => {
  return str.replace(/(?:^|[.!?]\s+)(\w)/g, (match, char) =>
    match.replace(char, char.toUpperCase())
  );
};

export const formatSpecialWords = (string: string) => {
  const replacements: { [key: string]: string } = {
    api: 'API',
    css: 'CSS',
    sass: 'SASS',
    'node\\.js': 'Node.JS',
    'next\\.js': 'Next.JS',
    'express\\.js': 'Express.JS',
    sql: 'SQL',
    nosql: 'NoSQL',
    mongodb: 'MongoDB',
    postgresql: 'PostgreSQL',
    tailwind: 'Tailwind',
    'react\\.js': 'React.JS',
    jwt: 'JWT',
    restful: 'RESTful',
    fabien: 'Fabien',
    it: 'IT',
    oprah: 'Oprah',
    winfrey: 'Winfrey',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    'demon slayer': 'Demon Slayer',
    'my hero academia': 'My Hero Academia',
    humanitude: 'Humanitude',
    'sp.': 'SP.',
    mas: 'MAS',
    area: 'Area',
  };

  let formattedString = string;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formattedString = formattedString.replace(regex, value);
  }

  return formattedString;
};
