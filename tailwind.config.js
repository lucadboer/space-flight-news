/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto Condensed, sans-serif'
      },
      colors: {
        gray: '#1E2022',
        purple: '#302E53',
        orange: '#D07017',
      },
      backgroundImage: {
        galaxy: "url('/bg-header.png')",
      }
    },
  },
  plugins: [],
}