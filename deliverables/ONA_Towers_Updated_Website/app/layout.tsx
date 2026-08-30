import type {Metadata} from 'next'
import {Bodoni_Moda,Manrope} from 'next/font/google'
import './globals.css'
import {SiteChrome} from '@/components/SiteChrome'
import {SmoothScroll} from '@/components/SmoothScroll'
const bodoni=Bodoni_Moda({subsets:['latin'],variable:'--font-bodoni',weight:'variable',style:['normal','italic'],axes:['opsz'],display:'swap',adjustFontFallback:false})
const manrope=Manrope({subsets:['latin'],variable:'--font-manrope',weight:'variable',display:'swap'})
export const metadata:Metadata={title:{default:'ONA Towers | Zanzibar',template:'%s | ONA Towers'},description:'Generous residences designed for modern Zanzibar living.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}><body><SmoothScroll/><SiteChrome>{children}</SiteChrome></body></html>}
