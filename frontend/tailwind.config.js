/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9ee',
          100: '#fdf2d7',
          200: '#fae2ae',
          300: '#f6cb7a',
          400: '#f2ad44',
          500: '#ef931f',
          600: '#e07815',
          700: '#b95c14',
          800: '#934818',
          900: '#763c16',
        }
      }
    },
  },
  plugins: [],
}
