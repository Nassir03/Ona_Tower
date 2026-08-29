export type OnaDestination = 'arrival'|'masterplan'|'tower-01'|'tower-02'|'floor-08'|'residence-2br'|'plan-transformation'|'interior'|'commercial'|'community'|'parking'|'location'|'enquiry'
export type SpatialScene = 'development'|'tower'|'floor'|'residence'|'interior'|'commercial'|'location'
export type ViewMode = 'aerial'|'building'|'ground'

export type CameraBookmark = {position:[number,number,number];target:[number,number,number];fov:number;duration:number;scene:SpatialScene;view:ViewMode;scale:number;x:number;y:number;rotate:number;preload?:string[]}
export type Destination = {id:OnaDestination;label:string;parent?:OnaDestination;url:string;camera:CameraBookmark;context:string;description?:string}

export const destinations:Record<OnaDestination,Destination>={
  arrival:{id:'arrival',label:'ONA Towers',url:'/',camera:{position:[0,3,12],target:[0,3,0],fov:40,duration:1.4,scene:'development',view:'ground',scale:1.12,x:17,y:2,rotate:0},context:'Space to live differently.'},
  masterplan:{id:'masterplan',label:'ONA Map',url:'/explore',camera:{position:[8,12,14],target:[0,0,0],fov:48,duration:1.6,scene:'development',view:'aerial',scale:.92,x:0,y:1,rotate:-1},context:'Explore ONA'},
  'tower-01':{id:'tower-01',label:'Tower 01',parent:'masterplan',url:'/explore/tower-01',camera:{position:[-4,6,9],target:[-2,3,0],fov:35,duration:1.5,scene:'tower',view:'building',scale:1.55,x:22,y:5,rotate:0},context:'Select a level',description:'11 residential floors · approximately 46 residences'},
  'tower-02':{id:'tower-02',label:'Tower 02',parent:'masterplan',url:'/explore/tower-02',camera:{position:[4,6,9],target:[2,3,0],fov:35,duration:1.5,scene:'tower',view:'building',scale:1.55,x:-22,y:5,rotate:0},context:'Select a level',description:'11 residential floors · approximately 46 residences'},
  'floor-08':{id:'floor-08',label:'Level 08',parent:'tower-01',url:'/explore/tower-01/floor-08',camera:{position:[-2,5,6],target:[-2,4,0],fov:30,duration:1.2,scene:'floor',view:'building',scale:2.05,x:28,y:18,rotate:-3},context:'Select a residence',description:'Ocean and sunrise orientations'},
  'residence-2br':{id:'residence-2br',label:'2 Bedroom',parent:'floor-08',url:'/residences/two-bedroom',camera:{position:[0,4,5],target:[0,0,0],fov:28,duration:1.1,scene:'residence',view:'building',scale:1,x:0,y:0,rotate:0},context:'203 m² · Step inside',description:'Concept residence · final unit data to follow'},
  'plan-transformation':{id:'plan-transformation',label:'Plan Transformation',parent:'residence-2br',url:'/explore/tower-01/floor-08/2-bedroom/plan',camera:{position:[0,2,4],target:[0,0,0],fov:26,duration:1,scene:'residence',view:'building',scale:1,x:0,y:0,rotate:0},context:'From drawing to home'},
  interior:{id:'interior',label:'Living Room',parent:'plan-transformation',url:'/explore/tower-01/floor-08/2-bedroom/interior',camera:{position:[0,1.7,2],target:[0,1,0],fov:60,duration:1.3,scene:'interior',view:'ground',scale:1,x:0,y:0,rotate:0},context:'Explore this home'},
  commercial:{id:'commercial',label:'Commercial',parent:'masterplan',url:'/explore/commercial',camera:{position:[5,3,7],target:[4,1,0],fov:38,duration:1.4,scene:'commercial',view:'ground',scale:1.7,x:-28,y:17,rotate:2},context:'Commercial & service component',description:'Current concept: supermarket, coffee corner and entrance / office functions'},
  community:{id:'community',label:'Community',parent:'masterplan',url:'/explore/community',camera:{position:[0,3,7],target:[0,0,0],fov:40,duration:1.3,scene:'development',view:'ground',scale:1.35,x:0,y:-17,rotate:0},context:'A vertical residential community',description:'Facilities shown here remain conceptual'},
  parking:{id:'parking',label:'Parking',parent:'masterplan',url:'/explore/parking',camera:{position:[5,5,9],target:[4,0,0],fov:42,duration:1.2,scene:'commercial',view:'aerial',scale:1.35,x:-24,y:0,rotate:0},context:'Arrival & movement',description:'Two parking levels in the commercial component'},
  location:{id:'location',label:'Zanzibar',parent:'masterplan',url:'/location',camera:{position:[0,25,28],target:[0,0,0],fov:55,duration:1.8,scene:'location',view:'aerial',scale:.48,x:0,y:0,rotate:0},context:'ONA in Zanzibar',description:'Connections and landmarks will use verified location data only'},
  enquiry:{id:'enquiry',label:'Enquire',parent:'masterplan',url:'/enquire',camera:{position:[8,12,14],target:[0,0,0],fov:48,duration:.7,scene:'development',view:'aerial',scale:.82,x:0,y:0,rotate:-2},context:'Talk to ONA'},
}

export const spatialObjects={
  tower01:{objectName:'Tower_01',destination:'tower-01' as OnaDestination,label:'Tower 01'},
  tower02:{objectName:'Tower_02',destination:'tower-02' as OnaDestination,label:'Tower 02'},
  commercial:{objectName:'Commercial',destination:'commercial' as OnaDestination,label:'Commercial'},
  arrival:{objectName:'Arrival',destination:'masterplan' as OnaDestination,label:'Resident Arrival'},
  community:{objectName:'Community',destination:'community' as OnaDestination,label:'Community'},
}

export const pathToDestination=(path:string):OnaDestination=>{
  if(path.includes('/interior'))return'interior';if(path.endsWith('/plan'))return'plan-transformation';if(path.includes('/floor-08'))return'floor-08';if(path.includes('/residences/two-bedroom'))return'residence-2br';if(path.includes('/tower-01'))return'tower-01';if(path.includes('/tower-02'))return'tower-02';if(path.includes('/commercial'))return'commercial';if(path.includes('/community'))return'community';if(path.includes('/parking'))return'parking';if(path==='/location')return'location';if(path==='/enquire')return'enquiry';if(path.startsWith('/explore'))return'masterplan';return'arrival'
}
