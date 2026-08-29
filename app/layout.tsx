import type {Metadata} from 'next'
import {Fraunces,Inter} from 'next/font/google'
import './globals.css'
import {SiteChrome} from '@/components/SiteChrome'
import {SmoothScroll} from '@/components/SmoothScroll'
const fraunces=Fraunces({subsets:['latin'],variable:'--font-fraunces',weight:['300','400']})
const inter=Inter({subsets:['latin'],variable:'--font-inter'})
export const metadata:Metadata={title:{default:'ONA Towers | Zanzibar',template:'%s | ONA Towers'},description:'Generous residences designed for modern Zanzibar living.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${fraunces.variable} ${inter.variable}`}><body><SmoothScroll/><SiteChrome>{children}</SiteChrome></body></html>}
