/* eslint-env node */

export default {
  // Vérifie et corrige les fichiers JS/TS avec ESLint et Prettier
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'eslint --max-warnings=0',
  ],
  // Formate les fichiers CSS/SCSS avec Prettier
  '*.{css,scss}': 'prettier --write',
  // Formate les fichiers JSON et Markdown avec Prettier
  '*.{json,md}': 'prettier --write',
};
