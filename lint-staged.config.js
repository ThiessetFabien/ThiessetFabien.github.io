/* eslint-env node */

const config = {
  // Vérifie et corrige les fichiers JS/TS avec ESLint et Prettier
  '*.{js,jsx,ts,tsx}': (files) => {
    const filesToCheck = files
      .filter((file) => !file.includes('backups/'))
      .filter((file) => !file.includes('node_modules/'))
      .join(' ');

    if (!filesToCheck) return [];

    return [`prettier --write ${filesToCheck}`, `eslint --fix ${filesToCheck}`];
  },
  // Formate les fichiers CSS/SCSS avec Prettier
  '*.{css,scss}': 'prettier --write',
  // Formate les fichiers JSON et Markdown avec Prettier
  '*.{json,md}': 'prettier --write',
  // Formate les fichiers de configuration
  '*.{cjs,mjs}': 'prettier --write',
};

export default config;
