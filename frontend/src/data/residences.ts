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
  { id: 'coffee', number: '01', title: 'Coffee & Bakery', subtitle: 'Everyday Rituals', description: 'Morning espresso and fresh artisanal bakery right within Tower A.', imageKey: 'lifestyleCoffee', highlight: 'TOWER A · LIVE' },
  { id: 'social-lounge', number: '02', title: 'Social Lounge', subtitle: 'Connection & Pleasure', description: 'An elegant gathering space shaped around the rituals of connection and hospitality.', imageKey: 'amenitySocialLounge', highlight: 'TOWER A · LIVE' },
  { id: 'beauty-studio', number: '03', title: 'Beauty Studio', subtitle: 'Dedicated Wellbeing', description: 'Afternoon treatments and self-care thoughtfully placed close to home.', imageKey: 'amenityBeautyStudio', highlight: 'TOWER A · LIVE' },
  { id: 'mini-market', number: '04', title: 'Mini Market', subtitle: 'Effortless Convenience', description: 'Curated daily essentials and fresh provisions right at your doorstep.', imageKey: 'amenityMiniMarket', highlight: 'TOWER A · LIVE' },
  { id: 'art-salon', number: '05', title: 'Art Salon', subtitle: 'Culture & Thought', description: 'Art becomes part of daily life in Tower B with curated exhibitions and salon spaces.', imageKey: 'amenityArtSalon', highlight: 'TOWER B · BEYOND' },
  { id: 'study-lounge', number: '06', title: 'Study Lounge', subtitle: 'Curiosity & Focus', description: 'Quiet spaces inviting reading, deep thought, and executive focus.', imageKey: 'amenityStudyLounge', highlight: 'TOWER B · BEYOND' },
  { id: 'concierge', number: '07', title: 'Concierge Desk', subtitle: 'Seamless Hospitality', description: 'Personalized resident assistance, travel services, and welcoming reception.', imageKey: 'amenityConcierge', highlight: 'TOWER B · BEYOND' },
  { id: 'kids-club', number: '08', title: 'Kids’ Club', subtitle: 'Family & Growth', description: 'Dedicated playful spaces giving families room to connect, learn, and grow.', imageKey: 'amenityKidsClub', highlight: 'TOWER B · BEYOND' },
  { id: 'pool', number: '09', title: 'Terrace Pool', subtitle: 'Space to slow down', description: 'Reflecting pools and swimming terrace overlooking the Zanzibar horizon.', imageKey: 'lifestylePool', highlight: 'ONA HOUSE' },
  { id: 'dining', number: '10', title: 'Restaurant & Outdoor Dining', subtitle: 'Dining above the everyday', description: 'Panoramic dining experience framed by ocean light and breezes.', imageKey: 'lifestyleRestaurant', highlight: 'ONA HOUSE' },
];

export const COMMERCIAL_MODULES: CommercialModule[] = [
  { id: 'work', label: '01 / WORK', title: 'Office Level', lead: 'Work within the development.', description: 'A confirmed office level in the separate commercial / service building.', imageKey: 'commercialOffice', highlights: ['Office level', 'Separate commercial / service building'] },
  { id: 'coffee-work', label: '02 / MEET', title: 'Coffee & Work Area', lead: 'A place to meet, work or pause.', description: 'A coffee / work area is shown on the ground floor.', imageKey: 'commercialBoardroom', highlights: ['Ground-floor coffee / work area', 'Reception / waiting / display area'] },
  { id: 'convenience', label: '03 / SERVICES', title: 'Supermarket', lead: 'Everyday convenience.', description: 'A supermarket is shown on the ground floor of the commercial / service building.', imageKey: 'commercialMarket', highlights: ['Ground-floor supermarket', '2 parking levels', 'Entrance / office / supporting spaces'] },
];
