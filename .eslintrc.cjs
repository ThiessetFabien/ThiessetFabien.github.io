/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript/base', // Utiliser la base au lieu de la version complète
    'prettier',
  ],
  plugins: ['import-alias'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  rules: {
    // Désactiver les règles problématiques
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // Désactivé car nous utilisons TypeScript pour la validation de types
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    'react/no-array-index-key': 'off', // Désactivé pour éviter les nombreux avertissements
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-curly-brace-presence': 'warn',
    'react/button-has-type': 'warn', // Réduit en avertissement
    'react/jsx-no-useless-fragment': 'warn', // Réduit en avertissement

    // Règles JavaScript
    'no-else-return': 'warn',
    'consistent-return': 'off', // Désactivé car cause trop d'avertissements
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-nested-ternary': 'warn', // Réduit en avertissement
    'no-plusplus': 'off', // Désactivé pour permettre les opérateurs ++ et --
    'no-param-reassign': 'warn', // Réduit en avertissement
    'no-underscore-dangle': ['warn', { allow: ['_options', '_id'] }], // Autorise certains identifiants avec _
    'no-cond-assign': ['error', 'except-parens'], // Permet l'assignation dans les conditions si elle est entre parenthèses

    // Règles TypeScript
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-shadow': 'warn', // Réduit en avertissement
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        // Réduit en avertissement avec exceptions
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: true,
      },
    ],

    // Règles d'importation
    'import/no-duplicates': 'warn',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off', // Désactivé pour permettre les importations par défaut avec des noms
    'import-alias/import-alias': [
      'error',
      {
        relativeDepth: 0,
        aliases: [
          { alias: '@src', matcher: '^src' },
          { alias: '@app', matcher: '^src/app' },
          { alias: '@api', matcher: '^src/app/api' },
          { alias: '@components', matcher: '^src/components' },
          { alias: '@common', matcher: '^src/components/common' },
          { alias: '@forms', matcher: '^src/components/forms' },
          { alias: '@layouts', matcher: '^src/components/layouts' },
          { alias: '@ui', matcher: '^src/components/ui' },
          { alias: '@config', matcher: '^src/config' },
          { alias: '@fonts', matcher: '^src/fonts' },
          { alias: '@hooks', matcher: '^src/hooks' },
          { alias: '@lib', matcher: '^src/lib' },
          { alias: '@services', matcher: '^src/services' },
          { alias: '@utils', matcher: '^src/utils' },
          { alias: '@middlewares', matcher: '^src/middlewares' },
          { alias: '@providers', matcher: '^src/components/providers' },
          { alias: '@schemas', matcher: '^src/schemas' },
          { alias: '@styles', matcher: '^src/styles' },
          { alias: '@types', matcher: '^src/types' },
        ],
      },
    ],

    // Règles de formatage et d'accessibilité
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Règles de contexte React
    'react/jsx-no-constructed-context-values': 'warn', // Réduit en avertissement
  },
  ignorePatterns: [
    '**/.next/**',
    '**/node_modules/**',
    '**/public/**',
    '**/build/**',
    '**/dist/**',
    '**/out/**',
    'scripts/**/*.js',
    'netlify/**/*.js',
    'next-env.d.ts',
    '**/*.config.js',
    '**/*.config.cjs',
  ],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      excludedFiles: ['src/**/*.js'],
      extends: ['airbnb/base'], // Utiliser la version de base sans React
      rules: {
        'no-console': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
