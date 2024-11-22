/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderColor: {
        'border-color': 'hsla(220, 45%, 28%, 1)',
      },
      colors: {
        'site-background-color': 'hsla(0, 0%, 0%, 1)',
        'site-text-color-primary': 'hsla(0, 0%, 100%, 1)',
        'site-text-color-footer': 'hsla(0, 0%, 50%, 1)',
      },
      fontFamily: {
        title: ['Orpheus Pro', 'Georgia', 'Times New Roman', 'Times', 'serif'],
        body: ['Poppins', 'Arial', 'sans-serif'],
      },
      fontSize: {},
      gap: {
        'grid-gutter': '1.1rem',
      },
      filter: {
        white:
          'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
      },
    },
  },
  plugins: [],
};
