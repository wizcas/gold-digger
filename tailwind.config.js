const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      sky: colors.sky,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
