import {Media} from '@/components/ui/Media'
import type {JourneyChapter} from '@/data/journey'

export function JourneyFrame({chapter,index,mobile=false}:{chapter:JourneyChapter;index:number;mobile?:boolean}){
  if(chapter.type==='floor')return <article className={`${mobile?'relative min-h-[78svh]':'journey-slide invisible absolute inset-0'} bg-charcoal text-bone`} data-type="floor" data-reveal={chapter.revealStyle}>
    <div data-image className="absolute inset-0"><Media src={chapter.blueprintImage} alt={`${chapter.label} architectural blueprint placeholder`} className="h-full"/></div>
    <div className="journey-finished invisible absolute inset-0 [clip-path:inset(0_100%_0_0)]"><Media src={chapter.finishedImage} alt={`${chapter.label} finished residence placeholder`} className="h-full"/></div>
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/10"/>
    <div className="absolute bottom-10 left-5 right-12 z-10 md:bottom-16 md:left-[7vw]"><p className="mb-4 text-[10px] uppercase tracking-[.22em] text-bone/65">{chapter.label} · {chapter.size}</p><h2 className="max-w-4xl font-display text-5xl font-light leading-[.9] md:text-[clamp(4rem,7vw,7.5rem)]">{chapter.caption}</h2></div>
  </article>
  const image=chapter.image
  const label=chapter.type==='amenity'?chapter.label:index===0?'ONA Towers':chapter.type==='compound'?'The Compound':'Architecture'
  return <article className={`${mobile?'relative min-h-[78svh]':'journey-slide invisible absolute inset-0'} bg-charcoal text-bone`} data-type={chapter.type}>
    <div data-image className="absolute inset-0"><Media src={image} alt={`${label} architectural placeholder`} priority={index===0} className="h-full"/></div>
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/5 to-charcoal/20"/>
    <div className="absolute bottom-10 left-5 right-12 z-10 md:bottom-16 md:left-[7vw]"><p className="mb-4 text-[10px] uppercase tracking-[.22em] text-bone/65">{label}</p><h2 className="max-w-5xl font-display text-5xl font-light leading-[.9] md:text-[clamp(4rem,8vw,8rem)]">{chapter.caption}</h2></div>
  </article>
}
