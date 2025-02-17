/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        canela: ['Canela Thin', 'serif'],
        lato: ['Lato', 'serif'],
        akzidenz: ['AkzidenzGroteskPro', 'sans-serif'], // Add your custom font
      },
      colors: {
        primary: '#F1ECE0', // Replace with your preferred primary color
      },
    },
  },
  plugins: [],
}