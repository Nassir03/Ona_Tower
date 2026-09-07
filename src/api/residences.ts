import { apiRequest } from './client';

export interface ResidenceSummaryApi {
  id: string;
  slug: string;
  name: string;
  type: string;
  bedrooms?: number | null;
  size_m2?: number | null;
  short_description?: string | null;
  status: string;
  display_order: number;
  cover_image?: string | null;
}

export interface ResidenceDetailApi extends ResidenceSummaryApi {
  long_description?: string | null;
  features: string[];
  media: Array<{
    id: string;
    media_type: 'image' | 'video';
    url: string;
    alt_text: string;
    display_order: number;
  }>;
  floor_plans: Array<{
    id: string;
    plan_name: string;
    file_url: string;
    preview_image_url?: string | null;
    hotspot_metadata?: Record<string, unknown> | unknown[] | null;
  }>;
}

export const listResidences = () => apiRequest<ResidenceSummaryApi[]>('/residences');
export const getResidence = (slug: string) => apiRequest<ResidenceDetailApi>(`/residences/${encodeURIComponent(slug)}`);
