'use client'
import {useEffect,useRef,useState} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {journeyChapters} from '@/data/journey'
import {JourneyFrame} from './JourneyFrame'
import {MobileJourney} from './MobileJourney'

export function BuildingJourney(){
  const root=useRef<HTMLElement>(null)
  const[active,setActive]=useState(0)
  const[reduced,setReduced]=useState(false)
  useEffect(()=>{
    const element=root.current
    const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(prefersReduced)
    if(!element||innerWidth<768||prefersReduced)return
    gsap.registerPlugin(ScrollTrigger)
    const context=gsap.context(()=>{
      const slides=gsap.utils.toArray<HTMLElement>('.journey-slide')
      gsap.set(slides[0],{autoAlpha:1})
      gsap.set(slides.slice(1),{autoAlpha:0})
      gsap.set(slides[0].querySelector('[data-image]'),{scale:1})
      const timeline=gsap.timeline({scrollTrigger:{trigger:element,start:'top top',end:`+=${innerHeight*(journeyChapters.length+2)}`,pin:true,scrub:1,invalidateOnRefresh:true,onUpdate:self=>setActive(Math.min(journeyChapters.length-1,Math.floor(self.progress*journeyChapters.length)))}})
      timeline.to(slides[0].querySelector('[data-image]'),{scale:1.03,duration:1,ease:'none'})
      slides.slice(1).forEach((slide,offset)=>{
        const index=offset+1
        const transition=index===3?.8:.42
        timeline.to(slides[index-1],{autoAlpha:0,duration:transition,ease:'power2.inOut'})
          .fromTo(slide,{autoAlpha:0},{autoAlpha:1,duration:transition,ease:'power2.inOut'},'<')
        const finished=slide.querySelector<HTMLElement>('.journey-finished')
        if(finished){
          gsap.set(finished,{autoAlpha:1})
          if(slide.dataset.reveal==='crossfade')timeline.fromTo(finished,{autoAlpha:0},{autoAlpha:1,duration:1,ease:'none'})
          else timeline.fromTo(finished,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1,ease:'none'})
        }else timeline.to(slide.querySelector('[data-image]'),{scale:1.03,duration:.65,ease:'none'})
      })
    },root)
    return()=>context.revert()
  },[])
  return <section ref={root} id="building-journey" data-building-journey className={`relative bg-charcoal text-bone ${reduced?'':'md:h-screen'}`}>
    <div className={reduced?'hidden':'hidden md:block'}>{journeyChapters.map((chapter,index)=><JourneyFrame key={index} chapter={chapter} index={index}/>)}</div>
    <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex" aria-label={`Building Journey chapter ${active+1} of ${journeyChapters.length}`}><div className="absolute inset-y-0 w-px bg-bone/25"/>{journeyChapters.map((_,index)=><span key={index} className={`relative block size-1.5 rounded-full border transition-colors ${index===active?'border-hairline bg-hairline':'border-bone/65 bg-charcoal'}`}/>)}</div>
    <span className="pointer-events-none absolute bottom-6 right-6 z-20 hidden text-[9px] tracking-[.2em] md:block">{String(active+1).padStart(2,'0')} / {String(journeyChapters.length).padStart(2,'0')}</span>
    {reduced?<MobileJourney chapters={journeyChapters} className="block"/>:<MobileJourney chapters={journeyChapters}/>} 
  </section>
}
