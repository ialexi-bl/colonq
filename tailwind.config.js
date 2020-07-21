module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        disabled: '#707070',
        navigation: '#181830',
        correct: {
          default: '#19963c',
          hover: '#20aa47',
          active: '#158133',
        },
        error: {
          default: '#ab1d1d',
          hover: '#bb2424',
          active: '#991616',
        },
        accent: {
          100: '#be77f8',
          200: '#ac5bf3',
          300: '#9c45eb',
          400: '#8d33e1',
          500: '#8025d4',
          600: '#7318c3',
          700: '#660eaf',
          800: '#590699',
          hover: '#560096',
          active: '#3a0065',
          default: '#4b0082',
        },
        transparent: {
          default: 'transparent',
          active: 'rgba(0, 0, 0, 0.1)',
          hover: 'rgba(255, 255, 255, 0.03)',
        },

        faded: '#aaa',
      },
      borderRadius: {
        none: 0,
        sm: '.25rem',
        default: '.5rem',
        lg: '1rem',
        full: '500px',
      },
      minWidth: (theme) => theme('spacing'),
    },
  },
  variants: {},
  plugins: [],
}
