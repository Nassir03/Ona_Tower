import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bone:'#F5F0E8', stone:'#D6C7B6', graphite:'#0B0B0A', charcoal:'#0B0B0A', warmblack:'#171715', cleanwhite:'#FFFDF8', sage:'#8A9483', hairline:'#B56F4D' },
    fontFamily: { display:['var(--font-manrope)','Arial','sans-serif'], sans:['var(--font-manrope)','Arial','sans-serif'], editorial:['var(--font-bodoni)','Georgia','serif'] },
    spacing: { section:'clamp(6rem, 10vw, 11rem)' },
    transitionTimingFunction: { calm:'cubic-bezier(0.22, 1, 0.36, 1)' },
  }}, plugins: [],
} satisfies Config
