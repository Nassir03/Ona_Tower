import {notFound} from 'next/navigation'
import Link from 'next/link'
import {residences} from '@/lib/data'
import {PageHero} from '@/components/ui/PageHero'
import {Media} from '@/components/ui/Media'
import {InteractiveFloorPlan} from '@/components/InteractiveFloorPlan'
import {SpatialExperience} from '@/components/spatial/SpatialExperience'
export function generateStaticParams(){return residences.map(({slug})=>({slug}))}
export default function Page({params}:{params:{slug:string}}){
  if(params.slug==='two-bedroom')return <SpatialExperience initialDestination="residence-2br"/>
  const residence=residences.find(item=>item.slug===params.slug)
  if(!residence)notFound()
  return <><PageHero eyebrow="ONA RESIDENCE" title={residence.name} copy={`${residence.size} · ${residence.beds} · ${residence.baths}`} image={residence.image}/><section className="section-space"><div className="page-shell grid gap-16 md:grid-cols-[1.2fr_.8fr]"><Media src={residence.image} alt={`${residence.name} interior concept`} className="aspect-[4/3]"/><div><p className="eyebrow">KEY FEATURES</p><h2 className="display text-6xl">Generous by design.</h2><ul className="mt-10 divide-y divide-graphite/20">{residence.features.map(item=><li className="py-4 text-sm" key={item}>{item}</li>)}</ul></div></div></section><section className="section-space bg-bone"><div className="page-shell"><p className="eyebrow">INTERACTIVE FLOOR PLAN</p><h2 className="display mb-14 text-6xl">Explore the spaces.</h2><InteractiveFloorPlan/><p className="mt-4 text-xs text-graphite/50">Concept plan for interaction and layout only. Final architectural drawings will replace this placeholder.</p></div></section><section className="bg-charcoal py-24 text-bone"><div className="page-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><h2 className="display text-6xl">Make this residence yours.</h2><Link href={`/enquire?residence=${residence.slug}`} className="button-light">Enquire about this residence</Link></div></section></>
}
