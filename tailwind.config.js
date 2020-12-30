module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.scss'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        disabled: {
          100: '#959393',
          400: '#707070',
          700: '#3D3D3D',
          1000: '#2B2B2B',
        },
        navigation: '#181830',
        secondary: {
          100: '#2d2d4d',
          200: '#252749',
          300: '#1f2246',
          400: '#1a1d42',
          500: '#161a3d',
          600: '#141838',
          700: '#121533',
          800: '#11132c',
          900: '#111125',
          1000: '#0f0f1e',
        },
        primary: {
          100: '#be77f8',
          200: '#ac5bf3',
          300: '#9c45eb',
          400: '#8d33e1',
          500: '#8025d4',
          600: '#7318c3',
          700: '#660eaf',
          800: '#590699',
          900: '#4b0082',
          1000: '#3a0065',
        },
        correct: {
          DEFAULT: '#19963c',
          active: '#158133',
          hover: '#20aa47',
        },
        error: {
          DEFAULT: '#ab1d1d',
          hover: '#bb2424',
          active: '#991616',
        },
        warning: {
          DEFAULT: '#ccbc38',
        },
        transparent: {
          DEFAULT: 'transparent',
          active: 'rgba(0, 0, 0, 0.1)',
          hover: 'rgba(255, 255, 255, 0.03)',
        },

        light: '#f3f2ff',
        faded: '#aaa',
      },
      transitionDuration: {
        route: '500ms',
        routeLoading: '250ms',
        routeLoadingDelay: '250ms',
      },
      borderRadius: {
        none: 0,
        sm: '.25rem',
        default: '.5rem',
        lg: '1rem',
        full: '500px',
      },
      minWidth: (theme) => theme('spacing'),
      spacing: {
        28: '7rem',
      },
      inset: {
        12: '3rem',
      },
      zIndex: {
        loading: 600,
        navigation: 590,
        notification: 580,
      },
      flex: {
        2: '2 2 0%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    standardFontWeights: true,
    defaultLineHeights: true,
  },
  plugins: [],
}
