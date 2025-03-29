export const capitalizeFirstLetterOfEachWord = (str: string) => {
  return str
    .split(' ')
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const capitalizeFirstLetterOfPhrase = (str: string) => {
  return str
    .split(/(?<=\.|\?|!)\s+/)
    .map((phrase) => {
      if (phrase.length === 0) return phrase;
      return phrase.charAt(0).toLocaleUpperCase() + phrase.slice(1);
    })
    .join(' ');
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
    'node\\.js': 'Node.js',
    'next\\.js': 'Next.js',
    'express\\.js': 'Express.js',
    sql: 'SQL',
    nosql: 'NoSQL',
    mongodb: 'MongoDB',
    postgresql: 'PostgreSQL',
    tailwind: 'Tailwind',
    'react\\.js': 'React.js',
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
    mas: 'MAS',
    area: 'Area',
    rncp: 'RNCP',
    'nest\\.js': 'Nest.js',
    rsai: 'RSAI',
    benoit: 'Benoît',
    sdk: 'SDK',
    'full-stack': 'Full-Stack',
    douai: 'Douai',
    france: 'France',
    'applications web et mobile': 'Applications Web et Mobile',
    'scrum master': 'Scrum Master',
    "o'clock": "O'Clock",
    'front-end': 'Front-End',
    'arch linux': 'Arch Linux',
  };
  let formattedString = string;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formattedString = formattedString.replace(regex, value);
  }

  return formattedString;
};
