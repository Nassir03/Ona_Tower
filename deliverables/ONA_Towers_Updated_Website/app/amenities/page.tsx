import {PageHero} from '@/components/ui/PageHero'
import {Media} from '@/components/ui/Media'
import {amenityGroups} from '@/lib/data'
export const metadata={title:'Amenities'}
export default function Page(){return <><PageHero eyebrow="AMENITIES" title="A better everyday." copy="Places for wellbeing, convenience and connection—composed as part of residential life, not added around it."/><section className="section-space"><div className="page-shell space-y-24">{amenityGroups.map((g,i)=><article className="grid gap-10 border-t border-graphite/20 pt-10 md:grid-cols-2" key={g.title}><div><span className="text-xs text-hairline">0{i+1}</span><h2 className="display mt-5 text-6xl">{g.title}</h2><ul className="mt-10 space-y-3 text-sm text-graphite/65">{g.items.map(x=><li key={x}>{x}</li>)}</ul></div><Media src={g.image} alt={`${g.title} concept`} className="aspect-[16/10]"/></article>)}</div></section></>}
