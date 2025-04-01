export const capitalizeFirstLetterOfEachWord = (str: string) => {
  return str
    .split(' ')
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    })
    .join(' ');
};

/**
 * Capitalizes the first letter of each phrase in a string. Phrases are split by `.`, `?`, or `!`.
 *
 * @param str - The input string.
 * @returns The string with the first letter of each phrase capitalized.
 */
export const capitalizeFirstLetterOfPhrase = (str: string) => {
  return str
    .split(/(?<=\.|\?|!)\s+/)
    .map((phrase) => {
      if (phrase.length === 0) return phrase;
      return phrase.charAt(0).toLocaleUpperCase() + phrase.slice(1);
    })
    .join(' ');
};

/**
 * Formats a given string by replacing specific words or phrases with their corresponding
 * formatted versions as defined in a replacements map.
 *
 * @param string - The input string to format. Can be `string`, `undefined`, or `null`.
 * @returns The formatted string with replacements applied, or an empty string if the input is `undefined` or `null`.
 */
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
    agile: 'Agile',
    scrum: 'Scrum',
    html: 'HTML',
    covid: 'COVID',
    linux: 'Linux',
    w3c: 'W3C',
    développeur: 'Développeur',
    'coordinnateur de projet': 'Coordinnateur de Projet',
    jest: 'Jest',
    ancodea: 'Ancodea',
    'qualité du prendre soin': 'Qualité du Prendre Soin',
    'bien-être': 'Bien-Être',
  };
  let formattedString = string;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    formattedString = formattedString.replace(regex, value);
  }

  return formattedString;
};
