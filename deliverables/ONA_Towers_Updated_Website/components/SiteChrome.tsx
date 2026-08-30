'use client'
import {usePathname} from 'next/navigation'
import {Navbar} from './Navbar'
import {Footer} from './Footer'
import {FloatingWhatsApp} from './FloatingWhatsApp'
export function SiteChrome({children}:{children:React.ReactNode}){const path=usePathname();const immersive=path==='/'||path==='/guided'||path==='/location'||path==='/enquire'||path.startsWith('/explore')||path.startsWith('/residences/two-bedroom');return <>{!immersive&&<Navbar/>}<main>{children}</main>{!immersive&&<Footer/>}{!immersive&&<FloatingWhatsApp/>}</>}
