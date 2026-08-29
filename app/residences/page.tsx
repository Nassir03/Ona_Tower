import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import {PageHero} from '@/components/ui/PageHero'
import {Media} from '@/components/ui/Media'
import {residences} from '@/lib/data'
export const metadata={title:'Residences'}
export default function Page(){return <><PageHero eyebrow="RESIDENCES" title="Space for life to unfold." copy="Three distinct residential expressions, united by generous proportions and a calm relationship with the outdoors."/><section className="section-space"><div className="page-shell space-y-28">{residences.map((r,i)=><article className={`group grid gap-10 md:grid-cols-2 md:items-center ${i%2?'md:[&>*:first-child]:order-2':''}`} key={r.slug}><Media src={r.image} alt={`${r.name} concept`} className="aspect-[4/3]"/><div className="md:px-12"><span className="eyebrow text-hairline">0{i+1}</span><h2 className="display text-6xl">{r.name}</h2><p className="mt-7 text-xl">{r.size} · {r.beds}</p><p className="mt-5 max-w-md text-graphite/60">A spacious home built around comfort, privacy, climate and the freedom to live at your own pace.</p><Link href={`/residences/${r.slug}`} className="arrow-link mt-8">Explore residence <ArrowRight size={16}/></Link></div></article>)}</div></section></>}
