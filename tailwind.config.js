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
    },
  },
  plugins: [],
}