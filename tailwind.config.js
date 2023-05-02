/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'default': 'Roboto',
      },
      colors: {
        'gray-100': '#CCCCCC',
        'gray-400': '#777777',
        'lilac-300': '#7695EC',
        'lilac-400': '#667fca',
        'green-400': '#47B960',
        'red-400': '#FF5151',
      },
    },
  },
  plugins: [],
}
