import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F7F5F0',
        stone: '#D7D0C5',
        graphite: '#171716',
        charcoal: '#080808',
        warmblack: '#171716',
        cleanwhite: '#FFFDF8',
        ivory: '#FFFDF8',
        champagne: '#AE9A7C',
        hairline: '#AE9A7C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
        editorial: ['var(--font-display)', 'Georgia', 'serif'],
      },
      spacing: { section: 'clamp(6rem, 10vw, 11rem)' },
      transitionTimingFunction: { calm: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
} satisfies Config
