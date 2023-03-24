/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{html,ts}'
  ],
  safelist: ['bg-blue-400', 'bg-red-400', 'bg-green-400'],
  theme: {
    fontFamily: {
      'sans': ['Roboto, ui-sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
