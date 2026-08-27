import {PageHero} from '@/components/ui/PageHero'
import {Media} from '@/components/ui/Media'
import {experienceSteps} from '@/lib/data'
export const metadata={title:'Experience'}
export default function Page(){return <><PageHero eyebrow="EXPERIENCE" title="Life, considered from arrival to retreat." copy="ONA is understood as a residential journey—not simply a collection of rooms."/><section>{experienceSteps.map(([t,c],i)=><article className={`grid min-h-[70vh] md:grid-cols-2 ${i%2?'md:[&>*:first-child]:order-2':''}`} key={t}><Media src={`/placeholders/${i%2?'experience':'residence-0'+((i%3)+1)}.svg`} alt={`${t} concept`} className="min-h-[55vh]"/><div className="flex flex-col justify-center bg-ivory p-8 md:p-16 lg:p-24"><span className="text-xs text-bronze">0{i+1}</span><h2 className="display mt-8 text-7xl">{t}</h2><p className="mt-8 max-w-lg text-charcoal/65">{c}</p></div></article>)}</section></>}
