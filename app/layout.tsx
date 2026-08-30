import type {Metadata} from 'next'
import {Cormorant_Garamond,Manrope} from 'next/font/google'
import './globals.css'
import {SiteChrome} from '@/components/SiteChrome'
import {SmoothScroll} from '@/components/SmoothScroll'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const metadata:Metadata={title:{default:'ONA Towers | Zanzibar',template:'%s | ONA Towers'},description:'Generous residences designed for modern Zanzibar living.'}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
