'use client'
import {useEffect,useRef,useState} from 'react'
import {useInView,useReducedMotion} from 'framer-motion'

function Counter({value,prefix='',suffix=''}:{value:number;prefix?:string;suffix?:string}){
  const ref=useRef<HTMLSpanElement>(null)
  const visible=useInView(ref,{once:true,margin:'-10%'})
  const reduce=useReducedMotion()
  const[count,setCount]=useState(0)
  useEffect(()=>{if(!visible)return;if(reduce){setCount(value);return}let frame=0;const start=performance.now();const run=(now:number)=>{const p=Math.min((now-start)/1200,1);setCount(Math.round(value*(1-Math.pow(1-p,3))));if(p<1)frame=requestAnimationFrame(run)};frame=requestAnimationFrame(run);return()=>cancelAnimationFrame(frame)},[visible,value,reduce])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export function StatsStrip(){return <section className="bg-charcoal py-20 text-ivory"><div className="page-shell"><div className="grid gap-12 md:grid-cols-3">{[
  ['2 Bedroom',202,'≈ ',' m²'],['3 Bedroom',235,'≈ ',' m²'],['Penthouses',400,'','+ m²'],
].map(([label,value,prefix,suffix])=><div key={label as string}><p className="text-xs uppercase tracking-[.18em] text-ivory/55">{label}</p><strong className="mt-3 block font-display text-[clamp(3.4rem,6vw,6rem)] font-normal"><Counter value={value as number} prefix={prefix as string} suffix={suffix as string}/></strong></div>)}</div><p className="mt-14 border-t border-ivory/15 pt-8 text-ivory/65">Designed around how people live, not just how many units can fit.</p></div></section>}
