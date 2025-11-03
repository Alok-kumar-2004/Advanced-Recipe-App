/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9DC183',
        secondary: '#E07A5F',
        'light-bg': '#FFF5E4',
        'light-text': '#222222',
        'dark-bg': '#1E1E1E',
        'dark-text': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Poppins', 'Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

