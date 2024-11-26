/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
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
        'shadcn-purple': {
          50: '270 100% 98%',
          100: '268.7 100% 95.5%',
          200: '268.6 100% 91.8%',
          300: '269.2 97.4% 85.1%',
          400: '270 95.2% 75.3%',
          500: '270.7 91% 65.1%',
          600: '271.5 81.3% 55.9%',
          700: '272.1 71.7% 47.1%',
          800: '272.9 67.2% 39.4%',
          900: '273.6 65.6% 32%',
          950: '273.5 86.9% 21%',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
