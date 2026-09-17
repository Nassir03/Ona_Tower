import { apiRequest } from './client';

export interface AmenityApi {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  display_order: number;
  active: boolean;
}

export interface SmartFeatureApi {
  id: string;
  name: string;
  benefit_statement: string;
  display_order: number;
}

export interface LocationPointApi {
  id: string;
  name: string;
  category: string;
  distance_or_travel_note?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  map_url?: string | null;
  display_order: number;
}

export const listAmenities = () => apiRequest<AmenityApi[]>('/amenities');
export const listSmartFeatures = () => apiRequest<SmartFeatureApi[]>('/smart-features');
export const listLocationPoints = () => apiRequest<LocationPointApi[]>('/location-points');
