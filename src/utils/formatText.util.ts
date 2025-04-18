export const capitalizeFirstLetterOfEachWord = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const capitalizeFirstLetterOfPhrase = (str: string) => {
  return str.replace(/(?:^|[.!?]\s+)(\w)/g, (match, char) =>
    match.replace(char, char.toUpperCase())
  );
};

export const formatSpecialWords = (string: string | undefined | null) => {
  if (string === undefined || string === null) {
    return '';
  }

  const replacements: { [key: string]: string } = {
    api: 'API',
    apis: 'APIs',
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
    rncp: 'RNCP',
    'nest\\.js': 'Nest.JS',
    rsai: 'RSAI',
    benoit: 'Benoît',
    sdk: 'SDK',
  };

  let formattedString = string;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formattedString = formattedString.replace(regex, value);
  }

  return formattedString;
};
