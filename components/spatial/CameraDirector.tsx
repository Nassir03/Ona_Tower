'use client'
import {motion,useReducedMotion} from 'framer-motion'
import {destinations} from '@/data/spatial'
import {useExperience} from './ExperienceState'

export function CameraDirector({children}:{children:React.ReactNode}){const{destination,view}=useExperience();const reduce=useReducedMotion();const camera=destinations[destination].camera;const adjustment=view==='aerial'?{scale:.82,y:-8,rotate:-3}:view==='ground'?{scale:1.16,y:14,rotate:0}:{scale:1,y:0,rotate:camera.rotate};return <motion.div className="absolute inset-0 origin-center" animate={{scale:camera.scale*adjustment.scale,x:`${camera.x}%`,y:`${camera.y+adjustment.y}%`,rotate:adjustment.rotate}} transition={{duration:reduce?0:camera.duration,ease:[.22,1,.36,1]}} data-scene={camera.scene}>{children}</motion.div>}
