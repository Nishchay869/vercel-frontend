/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#F9F1D8',
          200: '#F4DE97',
          300: '#EFC856',
          400: '#EAB115',
          500: '#D49B00',
        },
        church: {
          dark: '#1A1A2E',
          light: '#F5F5DC',
          accent: '#8B4513',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'display': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}

