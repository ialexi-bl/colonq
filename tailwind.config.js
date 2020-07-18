module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        faded: '#aaa',
        primary: {
          100: '#ebf4ff',
          200: '#c3dafe',
          300: '#a3bffa',
          400: '#7f9cf5',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
      },
      borderRadius: {
        none: 0,
        xl: '.25rem',
        sm: '.5rem',
        default: '1rem',
        lg: '1.5rem',
        full: '500px',
      },
      minWidth: (theme) => theme('spacing'),
    },
  },
  variants: {},
  plugins: [],
}
