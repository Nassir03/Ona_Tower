'use client'
import {useExperience} from './ExperienceState'

function Hotspot({number,label,className,onClick}:{number:string;label:string;className:string;onClick:()=>void}){return <button onClick={onClick} className={`group absolute z-20 flex items-center gap-2 text-left ${className}`}><span className="grid size-7 place-items-center rounded-full border border-bone/50 bg-charcoal/75 text-[8px] text-bone backdrop-blur transition-colors group-hover:border-hairline group-hover:bg-bone group-hover:text-graphite">{number}</span><span className="hidden whitespace-nowrap text-[8px] uppercase tracking-[.18em] text-bone/70 group-hover:block md:block">{label}</span></button>}

function Tower({id,label,side}:{id:'tower-01'|'tower-02';label:string;side:'left'|'right'}){
  const{destination,navigateTo}=useExperience()
  const focused=destination===id||destination==='floor-08'
  return <button onClick={()=>navigateTo(id)} aria-label={`Enter ${label}`} className={`group absolute bottom-[24%] ${side==='left'?'left-[34%]':'right-[25%]'} h-[59%] w-[14%] origin-bottom transition-[filter,transform] hover:-translate-y-1 hover:brightness-110 focus-visible:outline focus-visible:outline-hairline ${focused?'brightness-110':''}`}>
    <span className="absolute inset-y-0 left-0 right-[18%] overflow-hidden border border-bone/50 bg-gradient-to-r from-stone via-bone to-stone shadow-[0_28px_50px_rgba(0,0,0,.42)] [clip-path:polygon(7%_0,100%_4%,100%_100%,0_100%,0_7%)]">
      <span className="absolute inset-x-[8%] top-[5%] flex h-[88%] flex-col justify-around">{Array.from({length:11},(_,i)=><span key={i} onClick={event=>{if(id==='tower-01'&&i===7){event.stopPropagation();navigateTo('floor-08')}}} role={id==='tower-01'&&i===7?'button':undefined} tabIndex={id==='tower-01'&&i===7?0:undefined} className={`relative block h-[5.7%] border-y border-graphite/25 bg-graphite/10 transition-all before:absolute before:inset-y-0 before:left-[48%] before:w-px before:bg-graphite/20 group-hover:bg-graphite/15 ${id==='tower-01'&&i===7&&destination==='tower-01'?'translate-x-1 cursor-pointer border-hairline bg-hairline/35':''}`}/>)}</span>
      <span className="absolute inset-y-0 left-[10%] w-px bg-graphite/20"/><span className="absolute inset-y-0 right-[10%] w-px bg-graphite/20"/>
    </span>
    <span className="absolute bottom-0 right-0 top-[4%] w-[19%] border-y border-r border-bone/25 bg-graphite/80 [clip-path:polygon(0_0,100%_10%,100%_100%,0_100%)]"/>
    <span className="absolute -top-[2%] left-[7%] right-[17%] h-[6%] bg-bone/75 [clip-path:polygon(8%_0,100%_55%,92%_100%,0_55%)]"/>
    <span className="absolute -top-16 left-1/2 hidden -translate-x-1/2 whitespace-nowrap border-l border-hairline pl-4 text-left text-[9px] uppercase tracking-[.18em] text-bone group-hover:block group-focus:block">{label}<small className="mt-1 block text-[8px] text-bone/50">11 residential levels · Enter →</small></span>
  </button>
}

export function DevelopmentModel(){
  const{destination,navigateTo}=useExperience()
  return <div className="absolute inset-[5%] overflow-visible [perspective:1200px]">
    <div className="absolute inset-x-[8%] bottom-[8%] h-[42%] border border-bone/40 bg-gradient-to-br from-stone/60 via-graphite/50 to-charcoal/70 shadow-[0_45px_90px_rgba(0,0,0,.5)] [transform:rotateX(58deg)_rotateZ(-3deg)] [transform-style:preserve-3d]">
      <span className="absolute inset-[7%] border border-hairline/35"/>
      <span className="absolute left-[6%] top-[16%] h-[65%] w-[24%] rounded-[50%] border border-bone/20 bg-graphite/45"/>
      <span className="absolute bottom-[9%] left-[32%] h-[34%] w-[34%] rounded-[48%] border border-hairline/50 bg-stone/20"/>
      <span className="absolute right-[6%] top-[12%] h-[34%] w-[24%] border border-bone/25 bg-graphite/90 shadow-xl"/>
      <span className="absolute bottom-[8%] right-[8%] h-[24%] w-[25%] border border-bone/15 bg-charcoal/70"/>
      <span className="absolute left-[10%] top-[48%] h-px w-[75%] rotate-[-8deg] bg-hairline/45"/>
      <span className="absolute left-[28%] top-[12%] h-[76%] w-px rotate-[18deg] bg-bone/15"/>
      <span className="absolute bottom-[5%] left-[4%] text-[7px] uppercase tracking-[.22em] text-bone/45">Resident arrival</span>
    </div>
    <Tower id="tower-01" label="Tower 01" side="left"/><Tower id="tower-02" label="Tower 02" side="right"/>
    {destination!=='arrival'&&<><Hotspot number="01" label="Tower One" className="left-[31%] top-[26%]" onClick={()=>navigateTo('tower-01')}/><Hotspot number="02" label="Tower Two" className="right-[19%] top-[30%]" onClick={()=>navigateTo('tower-02')}/><Hotspot number="03" label="Commercial" className="bottom-[27%] right-[8%]" onClick={()=>navigateTo('commercial')}/><Hotspot number="04" label="Community · Concept" className="bottom-[14%] left-[48%]" onClick={()=>navigateTo('community')}/><Hotspot number="05" label="Location" className="left-[10%] top-[42%]" onClick={()=>navigateTo('location')}/></>}
  </div>
}
