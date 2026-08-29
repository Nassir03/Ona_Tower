'use client'
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react'
import {destinations,pathToDestination,type OnaDestination,type ViewMode} from '@/data/spatial'

type ExperienceValue={destination:OnaDestination;previous?:OnaDestination;view:ViewMode;navigateTo:(to:OnaDestination,replace?:boolean)=>void;goBack:()=>void;setView:(view:ViewMode)=>void}
const ExperienceContext=createContext<ExperienceValue|null>(null)

export function ExperienceState({children,initialDestination}:{children:React.ReactNode;initialDestination?:OnaDestination}){
  const[destination,setDestination]=useState<OnaDestination>(initialDestination??'arrival')
  const[previous,setPrevious]=useState<OnaDestination>()
  const[view,setView]=useState<ViewMode>(destinations[initialDestination??'arrival'].camera.view)
  useEffect(()=>{const onPop=()=>{const next=pathToDestination(location.pathname);setPrevious(destination);setDestination(next);setView(destinations[next].camera.view)};addEventListener('popstate',onPop);return()=>removeEventListener('popstate',onPop)},[destination])
  const navigateTo=useCallback((to:OnaDestination,replace=false)=>{if(to===destination)return;setPrevious(destination);setDestination(to);setView(destinations[to].camera.view);const url=destinations[to].url;if(replace)history.replaceState({onaDestination:to},'',url);else history.pushState({onaDestination:to},'',url);dispatchEvent(new Event('ona:navigate'))},[destination])
  const goBack=useCallback(()=>{if(previous)history.back();else navigateTo(destinations[destination].parent??'masterplan',true)},[destination,previous,navigateTo])
  const value=useMemo(()=>({destination,previous,view,navigateTo,goBack,setView}),[destination,previous,view,navigateTo,goBack])
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}
export function useExperience(){const value=useContext(ExperienceContext);if(!value)throw new Error('useExperience must be inside ExperienceState');return value}
