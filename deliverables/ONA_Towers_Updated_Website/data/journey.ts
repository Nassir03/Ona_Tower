export type JourneyChapter =
  | { type: 'exterior'; image: string; caption?: string }
  | { type: 'floor'; blueprintImage: string; finishedImage: string; label: string; size: string; caption?: string; revealStyle: 'crossfade' | 'wipe' }
  | { type: 'compound'; image: string; caption?: string }
  | { type: 'amenity'; image: string; label: string; caption?: string }

export const journeyChapters: JourneyChapter[] = [
  { type:'exterior', image:'/placeholders/hero.svg', caption:'Space to live differently.' },
  { type:'exterior', image:'/placeholders/residence-03.svg', caption:'A silhouette shaped by place.' },
  { type:'exterior', image:'/placeholders/residence-02.svg', caption:'Balconies drawn into the breeze.' },
  { type:'exterior', image:'/placeholders/tower-cutaway.svg', caption:'From tower to threshold.' },
  { type:'floor', blueprintImage:'/placeholders/blueprint-2br.svg', finishedImage:'/placeholders/residence-01.svg', label:'Two Bedroom Residence', size:'≈ 203 m²', caption:'Broad living. Deep veranda.' , revealStyle:'wipe' },
  { type:'floor', blueprintImage:'/placeholders/blueprint-3br.svg', finishedImage:'/placeholders/residence-02.svg', label:'Three Bedroom Residence', size:'≈ 236 m²', caption:'Family space, quietly composed.', revealStyle:'wipe' },
  { type:'floor', blueprintImage:'/placeholders/blueprint-penthouse.svg', finishedImage:'/placeholders/residence-03.svg', label:'Penthouse Collection', size:'416–482 m²', caption:'The horizon becomes a room.', revealStyle:'wipe' },
  { type:'compound', image:'/placeholders/compound.svg', caption:'Return to light and landscape.' },
  { type:'amenity', image:'/placeholders/amenity-pool.svg', label:'Pool', caption:'Cool water. Open sky.' },
  { type:'amenity', image:'/placeholders/amenity-gym.svg', label:'Gym & Wellness', caption:'Space for everyday wellbeing.' },
  { type:'amenity', image:'/placeholders/amenity-lounge.svg', label:'Resident Lounge', caption:'Meet, gather, belong.' },
  { type:'amenity', image:'/placeholders/amenity-kids.svg', label:'Children’s Space', caption:'Room to play and grow.' },
]
