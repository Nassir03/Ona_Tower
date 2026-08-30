const A='/ona-assets/'
export const cinematicAssets={
 hero:A+'01_hero/01-hero-main-dual-towers-aerial.png',heroSecondary:A+'01_hero/02-hero-secondary-tower-street-angle.png',
 vision:A+'02_vision/01-vision-single-tower-aerial.png',visionDetail:A+'02_vision/02-vision-architecture-closeup.png',
 masterplan:A+'03_development/01-development-masterplan-main.png',groundServices:A+'03_development/02-development-ground-services-plan.png',
 residences:{tower:A+'04_residences/01-residences-tower-exterior.png',typical:A+'04_residences/02-residences-typical-floorplan.png',twoBed:A+'04_residences/03-residences-two-bedroom-plan-approx-203sqm-derived.png',threeBed:A+'04_residences/04-residences-three-bedroom-plan-approx-236sqm.jpg',penthouseLevel:A+'04_residences/05-residences-penthouse-level-overview.png',penthouse3:A+'04_residences/06-residences-penthouse-3-bedroom-approx-416sqm.jpg',penthouse4:A+'04_residences/07-residences-penthouse-4-bedroom-approx-482sqm-derived.png'},
 interiors:{living:A+'05_interiors/01-interiors-living-main.png',ocean:A+'05_interiors/02-interiors-living-ocean-view.png',kitchen:A+'05_interiors/03-interiors-kitchen-dining.png',bedroom:A+'05_interiors/04-interiors-primary-bedroom.png',dining:A+'05_interiors/05-interiors-dining.png'},
 lifestyle:{pool:A+'06_lifestyle/01-lifestyle-pool-hero.png',restaurant:A+'06_lifestyle/02-lifestyle-rooftop-restaurant.png',gym:A+'06_lifestyle/03-lifestyle-gym.png',coffee:A+'06_lifestyle/04-lifestyle-coffee-corner.png'},
 commercial:{ground:A+'07_commercial/01-commercial-ground-floor-plan.png',office:A+'07_commercial/02-commercial-office-level-plan.png',terrace:A+'07_commercial/03-commercial-terrace-lifestyle-plan.png',market:A+'07_commercial/04-commercial-supermarket-visual.png',boardroom:A+'07_commercial/05-commercial-boardroom-visual.png'},
} as const
export const residenceTypes=[
 {id:'two-bedroom',label:'Two Bedroom',meta:'2 bedrooms · Approx. 203 sqm',plan:cinematicAssets.residences.twoBed,note:'Derived presentation plan from supplied architectural material.'},
 {id:'three-bedroom',label:'Three Bedroom',meta:'3 bedrooms · Approx. 236 sqm',plan:cinematicAssets.residences.threeBed,note:'Architectural floor plan.'},
 {id:'penthouse-3',label:'Signature Penthouse',meta:'3 bedrooms · Approx. 416 sqm',plan:cinematicAssets.residences.penthouse3,note:'Signature penthouse plan.'},
 {id:'penthouse-4',label:'Signature Penthouse',meta:'4 bedrooms · Approx. 482 sqm',plan:cinematicAssets.residences.penthouse4,note:'Derived presentation plan from supplied architectural material.'},
] as const
export const projectFacts=['Two residential towers','11 residential levels + penthouse','Four residences per typical floor','Commercial / lifestyle component']
