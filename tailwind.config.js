/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        canela: ['ananda', 'serif'],
        ananda: ['ananda', 'serif'],
        lato: ['Lato', 'serif'],
        akzidenz: ['AkzidenzGroteskPro', 'sans-serif'], // Add your custom font
      },
      colors: {
        primary: '#e6d9c6', // Replace with your preferred primary color
      },
    },
  },
  plugins: [],
}