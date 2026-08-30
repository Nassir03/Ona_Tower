import { ResidenceTypology, MasterplanHotspot, LifestyleScene, CommercialModule } from '../types';
import { ONA_FACTS } from './projectFacts';

const { twoBedroom, threeBedroom, penthouses, typicalFloor, structurePerTower } = ONA_FACTS.residential;

export const RESIDENCE_TYPOLOGIES: ResidenceTypology[] = [
  { id: '2-bedroom', code: 'TYPOLOGY 02', name: twoBedroom.name, tagline: 'Two-bedroom residence', bedrooms: twoBedroom.bedrooms, approxAreaSqm: twoBedroom.approximateAreaSqm, areaDisplay: twoBedroom.areaDisplay, description: twoBedroom.description, features: ['2 Bedrooms', twoBedroom.areaDisplay, `${typicalFloor.twoBedroomUnits} units per typical residential floor`], imageKey: 'twoBedroomPlan', planKey: 'twoBedroomPlan' },
  { id: '3-bedroom', code: 'TYPOLOGY 03', name: threeBedroom.name, tagline: 'Three-bedroom residence', bedrooms: threeBedroom.bedrooms, approxAreaSqm: threeBedroom.approximateAreaSqm, areaDisplay: threeBedroom.areaDisplay, description: threeBedroom.description, features: ['3 Bedrooms', threeBedroom.areaDisplay, `${typicalFloor.threeBedroomUnits} units per typical residential floor`], imageKey: 'threeBedroomPlan', planKey: 'threeBedroomPlan' },
  { id: 'penthouse-3bed', code: 'PENTHOUSE 01', name: penthouses[0].name, tagline: 'Penthouse level', bedrooms: penthouses[0].bedrooms, approxAreaSqm: penthouses[0].approximateAreaSqm, areaDisplay: penthouses[0].areaDisplay, description: penthouses[0].description, features: ['3 Bedrooms', penthouses[0].areaDisplay, 'Penthouse level'], imageKey: 'penthouseThreeBedroomPlan', planKey: 'penthouseThreeBedroomPlan' },
  { id: 'penthouse-4bed', code: 'PENTHOUSE 02', name: penthouses[1].name, tagline: 'Penthouse level', bedrooms: penthouses[1].bedrooms, approxAreaSqm: penthouses[1].approximateAreaSqm, areaDisplay: penthouses[1].areaDisplay, description: penthouses[1].description, features: ['4 Bedrooms', penthouses[1].areaDisplay, 'Penthouse level'], imageKey: 'penthouseFourBedroomPlan', planKey: 'penthouseFourBedroomPlan' },
];

const residentialDetails = [`${structurePerTower.residentialFloors} residential floors + ${structurePerTower.penthouseLevel} penthouse level`, `${typicalFloor.residencesPerFloor} residences per typical floor (2 × 2-bed, 2 × 3-bed)`, `Approx. ${structurePerTower.approximateApartmentsPerTower} apartments`];
export const MASTERPLAN_HOTSPOTS: MasterplanHotspot[] = [
  { id: 'tower-a', number: '01', title: 'Residential Tower A', category: 'LIVE', description: 'Residential tower with ground-level parking and building services, 11 residential floors and one penthouse level.', xPercent: 0, yPercent: 0, keyDetails: residentialDetails },
  { id: 'tower-b', number: '02', title: 'Residential Tower B', category: 'LIVE', description: 'Residential tower with ground-level parking and building services, 11 residential floors and one penthouse level.', xPercent: 0, yPercent: 0, keyDetails: residentialDetails },
  { id: 'commercial-building', number: '03', title: 'Commercial / Service Building', category: 'WORK', description: ONA_FACTS.commercialBuilding.description, xPercent: 0, yPercent: 0, keyDetails: ['Ground floor: supermarket, coffee / work area, reception / waiting / display and supporting spaces', '2 parking levels', 'Office level', 'Terrace: restaurant, outdoor restaurant, pool and gym'] },
];

export const LIFESTYLE_SCENES: LifestyleScene[] = [
  { id: 'pool', number: '01', title: 'Pool', subtitle: 'Space to slow down', description: 'Pool on the terrace / lifestyle level.', imageKey: 'lifestylePool', highlight: 'POOL' },
  { id: 'dining', number: '02', title: 'Restaurant & Outdoor Dining', subtitle: 'Dining above the everyday', description: 'Restaurant and outdoor restaurant on the terrace / lifestyle level.', imageKey: 'lifestyleRestaurant', highlight: 'RESTAURANT & TERRACE' },
  { id: 'gym', number: '03', title: 'Gym', subtitle: 'Space for movement', description: 'Gym on the terrace / lifestyle level.', imageKey: 'lifestyleGym', highlight: 'GYM' },
  { id: 'coffee', number: '04', title: 'Coffee & Work Area', subtitle: 'A place to meet, work or pause', description: 'Coffee / work area on the ground floor.', imageKey: 'lifestyleCoffee', highlight: 'COFFEE & WORK' },
  { id: 'supermarket', number: '05', title: 'Supermarket', subtitle: 'Everyday convenience', description: 'Supermarket on the ground floor.', imageKey: 'commercialMarket', highlight: 'SUPERMARKET' },
];

export const COMMERCIAL_MODULES: CommercialModule[] = [
  { id: 'work', label: '01 / WORK', title: 'Office Level', lead: 'Work within the development.', description: 'A confirmed office level in the separate commercial / service building.', imageKey: 'commercialOffice', highlights: ['Office level', 'Separate commercial / service building'] },
  { id: 'coffee-work', label: '02 / MEET', title: 'Coffee & Work Area', lead: 'A place to meet, work or pause.', description: 'A coffee / work area is shown on the ground floor.', imageKey: 'commercialBoardroom', highlights: ['Ground-floor coffee / work area', 'Reception / waiting / display area'] },
  { id: 'convenience', label: '03 / SERVICES', title: 'Supermarket', lead: 'Everyday convenience.', description: 'A supermarket is shown on the ground floor of the commercial / service building.', imageKey: 'commercialMarket', highlights: ['Ground-floor supermarket', '2 parking levels', 'Entrance / office / supporting spaces'] },
];
