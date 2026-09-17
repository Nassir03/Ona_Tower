/** Central verified source of truth for ONA Towers. */
export const ONA_FACTS = {
  projectName: 'ONA Towers', location: 'Zanzibar', tagline: 'Ishii juu. Ona zaidi.',
  developmentSummary: { residentialTowersCount: 2, commercialBuildingsCount: 1, description: 'A contemporary mixed-use development in Zanzibar comprising two residential towers and a separate commercial and lifestyle building.' },
  residential: {
    towersCount: 2, towerNames: ['Residential Tower A', 'Residential Tower B'],
    structurePerTower: { groundLevel: 'Ground level with parking and building services', residentialFloors: 11, penthouseLevel: 1, approximateApartmentsPerTower: 46 },
    typicalFloor: { residencesPerFloor: 4, twoBedroomUnits: 2, threeBedroomUnits: 2 },
    twoBedroom: { name: '02 Bedroom Residence', bedrooms: 2, approximateAreaSqm: 203, areaDisplay: 'Approx. 203 sqm', description: 'Two-bedroom residence shown in the supplied project drawing.' },
    threeBedroom: { name: '03 Bedroom Residence', bedrooms: 3, approximateAreaSqm: 236, areaDisplay: 'Approx. 236 sqm', description: 'Three-bedroom residence shown in the supplied project drawing.' },
    penthouses: [
      { id: 'penthouse-3bed', name: '03 Bedroom Signature Penthouse', bedrooms: 3, approximateAreaSqm: 416, areaDisplay: 'Approx. 416 sqm', description: 'Three-bedroom residence on the penthouse level.' },
      { id: 'penthouse-4bed', name: '04 Bedroom Signature Penthouse', bedrooms: 4, approximateAreaSqm: 482, areaDisplay: 'Approx. 482 sqm', description: 'Four-bedroom residence on the penthouse level.' },
    ],
  },
  commercialBuilding: {
    title: 'Commercial / Service Building', description: 'A separate building containing confirmed commercial, service and lifestyle functions.',
    levels: [
      { level: 'Ground Floor', functions: ['Supermarket', 'Coffee / work area', 'Reception / waiting / display area', 'Entrance / office / supporting spaces'] },
      { level: 'Parking Levels', functions: ['2 parking levels'] }, { level: 'Office Level', functions: ['Office level'] },
      { level: 'Terrace / Lifestyle Level', functions: ['Restaurant', 'Outdoor restaurant', 'Pool', 'Gym'] },
    ],
  },
} as const;
