import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ivory:'#F7F3EC', sand:'#E4D9C4', charcoal:'#2B2723', ocean:'#4C6B70', deepgreen:'#3E4C3B', bronze:'#A9825C' },
    fontFamily: { display:['var(--font-fraunces)'], sans:['var(--font-inter)'] },
    spacing: { section:'clamp(6rem, 10vw, 11rem)' },
    transitionTimingFunction: { calm:'cubic-bezier(0.22, 1, 0.36, 1)' },
  }}, plugins: [],
} satisfies Config
