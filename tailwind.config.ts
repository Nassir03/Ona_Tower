import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bone:'#F4F1EC', stone:'#DCD5C8', graphite:'#34312C', charcoal:'#1E1C1A', sage:'#8A9483', hairline:'#9C8368' },
    fontFamily: { display:['var(--font-fraunces)'], sans:['var(--font-inter)'] },
    spacing: { section:'clamp(6rem, 10vw, 11rem)' },
    transitionTimingFunction: { calm:'cubic-bezier(0.22, 1, 0.36, 1)' },
  }}, plugins: [],
} satisfies Config
