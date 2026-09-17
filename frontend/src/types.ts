export interface ResidenceTypology {
  id: string;
  code: string;
  name: string;
  tagline: string;
  bedrooms: number;
  areaDisplay: string;
  approxAreaSqm: number;
  description: string;
  features: string[];
  imageKey: string;
  planKey: string;
}

export interface MasterplanHotspot {
  id: string;
  number: string;
  title: string;
  category: 'LIVE' | 'LIFE' | 'WORK' | 'ARRIVAL';
  description: string;
  xPercent: number;
  yPercent: number;
  keyDetails: string[];
}

export interface LifestyleScene {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageKey: string;
  highlight: string;
}

export interface CommercialModule {
  id: string;
  label: string;
  title: string;
  lead: string;
  description: string;
  imageKey: string;
  highlights: string[];
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phoneOrWhatsapp: string;
  interestTypology: string;
  timeframe: string;
  message: string;
}
