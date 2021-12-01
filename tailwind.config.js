const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        button: '0 8px 0 0 rgba(0, 0, 0, 0.25)',
        'button-sm': '0 4px 0 0 rgba(0, 0, 0, 0.25)',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      primary: {
        light: '#F04276',
        normal: '#D22D5E',
        vivid: '#DA0B49',
        background: '#F8789E',
      },
      dark: {
        // normal: '#414952',
        // secondary:'#636978',
        normal: colors.coolGray[800],
        secondary: colors.coolGray[600],
      },
      light: {
        normal: colors.coolGray[50],
        secondary: colors.coolGray[100],
      },
      alipay: {
        normal: '#1677FF',
        light: '#3388FF',
        vivid: '#0060E5',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      boxShadow: ['active'],
      transform: ['active'],
    },
  },
  plugins: [],
};
