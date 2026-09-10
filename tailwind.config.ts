import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#193659',
          dark: '#0A131F',
          surface: '#102035',
          card: '#13253B',
          light: '#274A74',
        },
        sand: {
          DEFAULT: '#A58A71',
          light: '#C5B19D',
          dark: '#8C725B',
        },
        slate: {
          DEFAULT: '#718F9B',
          light: '#92AEBA',
          dark: '#56717D',
        },
        bone: '#F8F6F2',
        stone: '#D5CFC7',
        graphite: '#102035',
        charcoal: '#0A131F',
        warmblack: '#070D14',
        cleanwhite: '#FFFFFF',
        ivory: '#FFFDF8',
        champagne: '#A58A71',
        hairline: '#A58A71',
      },
      fontFamily: {
        display: ['Futura', 'Montserrat', 'Glacial Indifference', 'sans-serif'],
        balgin: ['Balgin', 'Futura', 'sans-serif'],
        script: ['Mistrully', 'cursive'],
        sans: ['Glacial Indifference', 'Montserrat', '-apple-system', 'sans-serif'],
        editorial: ['Mistrully', 'cursive'],
      },
      spacing: { section: 'clamp(6rem, 10vw, 11rem)' },
      transitionTimingFunction: { calm: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
} satisfies Config
