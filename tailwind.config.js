/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'site-background-color': 'hsla(0, 0%, 0%, 1)',
        'site-text-color': 'hsla(0, 0%, 100%, 1)',
      },
      fontFamily: {
        title: ['Orpheus Pro', 'Georgia', 'Times New Roman', 'Times', 'serif'],
        body: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
