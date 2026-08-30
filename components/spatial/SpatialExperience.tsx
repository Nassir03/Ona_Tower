'use client'
import Link from 'next/link'
import {useEffect,useState} from 'react'
import {ArrowRight,X} from 'lucide-react'
import {destinations,pathToDestination,type OnaDestination} from '@/data/spatial'
import {ExperienceState,useExperience} from './ExperienceState'
import {CameraDirector} from './CameraDirector'
import {DevelopmentModel} from './DevelopmentModel'
import {SceneLayers} from './SceneLayers'
import {SpatialInterface} from './SpatialInterface'

function ExperienceWorld(){
 const{destination,navigateTo,goBack}=useExperience()
 const[entered,setEntered]=useState(destination!=='arrival')
 useEffect(()=>{const enter=()=>{if(destination==='arrival'){setEntered(true);navigateTo('masterplan')}};const wheel=(event:WheelEvent)=>{if(event.deltaY>35)enter()};addEventListener('wheel',wheel,{passive:true});return()=>removeEventListener('wheel',wheel)},[destination,navigateTo])
 return <section className="relative h-[100svh] overflow-hidden bg-charcoal text-bone" aria-label="Interactive ONA Towers spatial experience">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_32%,rgba(244,241,236,.3),rgba(156,131,104,.08)_36%,rgba(52,49,44,.14)_58%,rgba(30,28,26,.92)_84%)]"/>
  <div className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(rgba(244,241,236,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,236,.5)_1px,transparent_1px)] [background-size:80px_80px]"/>
  <CameraDirector><DevelopmentModel/></CameraDirector>
  <SceneLayers/>
  {destination==='arrival'&&!entered&&<div className="absolute inset-0 z-20 flex items-end bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent px-6 pb-16 md:px-[7vw] md:pb-[8vh]"><div className="w-full max-w-[570px]"><div className="mb-7 flex items-center gap-4"><span className="h-px w-12 bg-hairline"/><p className="text-[9px] uppercase tracking-[.28em] text-bone/60">Zanzibar · Tanzania</p></div><h1 className="font-display text-[clamp(4.5rem,8vw,8.5rem)] font-light leading-[.78] tracking-[-.035em]">ONA<br/><span className="ml-[.32em] italic text-stone">Towers</span></h1><p className="mt-8 max-w-md text-sm leading-relaxed text-bone/62 md:text-base">A spatial introduction to two residential towers, generous homes and a new vertical community in Zanzibar.</p><div className="mt-8 grid gap-3 sm:flex sm:flex-wrap"><button onClick={()=>{setEntered(true);navigateTo('masterplan')}} className="button-light w-full justify-between sm:w-auto">Enter the development <ArrowRight size={14}/></button><Link href="/guided" className="button-ghost w-full justify-between sm:w-auto">Take the guided tour</Link></div><div className="mt-7 flex gap-6 border-t border-bone/15 pt-5 text-[7px] uppercase tracking-[.14em] text-bone/45 sm:gap-8 sm:text-[8px]"><span>2 towers</span><span>11 residential levels</span><span className="hidden sm:inline">203–482 m² homes</span></div></div></div>}
  <SpatialInterface/>
  {destination==='enquiry'&&<ContextualEnquiry onClose={goBack}/>} 
 </section>
}

function ContextualEnquiry({onClose}:{onClose:()=>void}){
 const{previous}=useExperience();const context=destinations[previous??'masterplan'];const[sent,setSent]=useState(false)
 return <div className="absolute inset-0 z-50 flex justify-end bg-charcoal/45 backdrop-blur-sm"><aside className="h-full w-full overflow-y-auto bg-bone p-7 text-graphite sm:max-w-xl md:p-12"><button onClick={onClose} className="float-right" aria-label="Close enquiry"><X/></button><p className="eyebrow mt-12 text-hairline">ENQUIRE FROM</p><h2 className="font-display text-5xl">{context.label}</h2><p className="mt-3 text-sm text-graphite/55">{context.context}</p>{sent?<div className="mt-16 border-l border-hairline pl-6"><h3 className="font-display text-4xl">Thank you.</h3><p className="mt-4 text-sm text-graphite/60">Your spatial context has been retained. Sales integration will be connected when contact details are confirmed.</p></div>:<form onSubmit={event=>{event.preventDefault();setSent(true)}} className="mt-12 space-y-7">{['Name','Phone / WhatsApp','Email'].map(label=><label className="block text-[9px] uppercase tracking-widest" key={label}>{label}<input required={label!=='Email'} type={label==='Email'?'email':'text'} className="mt-2 w-full border-0 border-b border-graphite/25 bg-transparent py-2 outline-none"/></label>)}<label className="block text-[9px] uppercase tracking-widest">Message<textarea defaultValue={`I would like to know more about ${context.label}.`} rows={4} className="mt-2 w-full border-0 border-b border-graphite/25 bg-transparent py-2 outline-none"/></label><button className="button-dark">Send enquiry</button></form>}</aside></div>
}

export function SpatialExperience({initialDestination}:{initialDestination?:OnaDestination}){const initial=initialDestination??(typeof window==='undefined'?'arrival':pathToDestination(location.pathname));return <ExperienceState initialDestination={initial}><ExperienceWorld/></ExperienceState>}
