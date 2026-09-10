import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// --- Types ---
interface ResidenceMedia {
  id: string;
  media_type: 'image' | 'video';
  url: string;
  alt_text: string;
  display_order: number;
}

interface FloorPlan {
  id: string;
  plan_name: string;
  file_url: string;
  preview_image_url?: string | null;
  hotspot_metadata?: Record<string, unknown> | unknown[] | null;
}

interface ResidenceSummary {
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

interface ResidenceDetail extends ResidenceSummary {
  long_description?: string | null;
  features: string[];
  media: ResidenceMedia[];
  floor_plans: FloorPlan[];
}

interface Amenity {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  display_order: number;
  active: boolean;
}

interface SmartFeature {
  id: string;
  name: string;
  benefit_statement: string;
  display_order: number;
}

interface LocationPoint {
  id: string;
  name: string;
  category: string;
  distance_or_travel_note?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  map_url?: string | null;
  display_order: number;
}

interface EnquiryRecord {
  id: string;
  reference_number: string;
  name: string;
  phone: string;
  email?: string | null;
  residence_interest?: string | null;
  enquiry_type: string;
  message?: string | null;
  consent: boolean;
  source: string;
  status: string;
  created_at: string;
}

// --- In-Memory Seed Data ---
const RESIDENCES: ResidenceDetail[] = [
  {
    id: 'res-2br',
    slug: '2-bedroom',
    name: '02 Bedroom Residence',
    type: '2 Bedroom',
    bedrooms: 2,
    size_m2: 203,
    short_description: 'Two-bedroom residence shown in the supplied project drawing.',
    features: ['2 bedrooms', 'Approx. 203 sqm', '2 units per typical residential floor'],
    display_order: 1,
    status: 'active',
    cover_image: '/ona-assets/residences/two-bedroom-plan-approx-203sqm.png',
    media: [
      {
        id: 'm-2br-1',
        media_type: 'image',
        url: '/ona-assets/residences/two-bedroom-plan-approx-203sqm.png',
        alt_text: 'Two-bedroom residence project drawing',
        display_order: 1,
      },
    ],
    floor_plans: [
      {
        id: 'fp-2br-1',
        plan_name: '02 Bedroom Residence Plan',
        file_url: '/ona-assets/residences/two-bedroom-plan-approx-203sqm.png',
        preview_image_url: '/ona-assets/residences/two-bedroom-plan-approx-203sqm.png',
      },
    ],
  },
  {
    id: 'res-3br',
    slug: '3-bedroom',
    name: '03 Bedroom Residence',
    type: '3 Bedroom',
    bedrooms: 3,
    size_m2: 236,
    short_description: 'Three-bedroom residence shown in the supplied project drawing.',
    features: ['3 bedrooms', 'Approx. 236 sqm', '2 units per typical residential floor'],
    display_order: 2,
    status: 'active',
    cover_image: '/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg',
    media: [
      {
        id: 'm-3br-1',
        media_type: 'image',
        url: '/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg',
        alt_text: 'Three-bedroom residence project drawing',
        display_order: 1,
      },
    ],
    floor_plans: [
      {
        id: 'fp-3br-1',
        plan_name: '03 Bedroom Residence Plan',
        file_url: '/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg',
        preview_image_url: '/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg',
      },
    ],
  },
  {
    id: 'res-penthouse-3',
    slug: 'penthouse-3bed',
    name: '03 Bedroom Signature Penthouse',
    type: 'Penthouse',
    bedrooms: 3,
    size_m2: 416,
    short_description: 'Three-bedroom residence on the penthouse level.',
    features: ['3 bedrooms', 'Approx. 416 sqm', 'Penthouse level'],
    display_order: 3,
    status: 'active',
    cover_image: '/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg',
    media: [
      {
        id: 'm-p3-1',
        media_type: 'image',
        url: '/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg',
        alt_text: 'Three-bedroom signature penthouse project drawing',
        display_order: 1,
      },
    ],
    floor_plans: [
      {
        id: 'fp-p3-1',
        plan_name: '03 Bedroom Signature Penthouse Plan',
        file_url: '/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg',
        preview_image_url: '/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg',
      },
    ],
  },
  {
    id: 'res-penthouse-4',
    slug: 'penthouse-4bed',
    name: '04 Bedroom Signature Penthouse',
    type: 'Penthouse',
    bedrooms: 4,
    size_m2: 482,
    short_description: 'Four-bedroom residence on the penthouse level.',
    features: ['4 bedrooms', 'Approx. 482 sqm', 'Penthouse level'],
    display_order: 4,
    status: 'active',
    cover_image: '/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png',
    media: [
      {
        id: 'm-p4-1',
        media_type: 'image',
        url: '/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png',
        alt_text: 'Four-bedroom signature penthouse project drawing',
        display_order: 1,
      },
    ],
    floor_plans: [
      {
        id: 'fp-p4-1',
        plan_name: '04 Bedroom Signature Penthouse Plan',
        file_url: '/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png',
        preview_image_url: '/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png',
      },
    ],
  },
];

const AMENITIES: Amenity[] = [
  { id: 'amenity-1', name: 'Pool', category: 'Lifestyle', description: 'Pool on the terrace / lifestyle level.', display_order: 1, active: true },
  { id: 'amenity-2', name: 'Restaurant & Outdoor Dining', category: 'Lifestyle', description: 'Restaurant and outdoor restaurant on the terrace / lifestyle level.', display_order: 2, active: true },
  { id: 'amenity-3', name: 'Gym', category: 'Lifestyle', description: 'Gym on the terrace / lifestyle level.', display_order: 3, active: true },
  { id: 'amenity-4', name: 'Coffee & Work Area', category: 'Commercial', description: 'Coffee / work area on the ground floor.', display_order: 4, active: true },
  { id: 'amenity-5', name: 'Supermarket', category: 'Commercial', description: 'Supermarket on the ground floor.', display_order: 5, active: true },
];

const SMART_FEATURES: SmartFeature[] = [
  { id: 'smart-1', name: 'Integrated mixed-use living', benefit_statement: 'Residences, lifestyle facilities and commercial functions are brought together within one development.', display_order: 1 },
];

const LOCATION_POINTS: LocationPoint[] = [
  { id: 'loc-1', name: 'Zanzibar', category: 'Location', distance_or_travel_note: 'ONA Towers development location', display_order: 1 },
];

const enquiriesStore: EnquiryRecord[] = [];

function makeReferenceNumber(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ONA-${datePart}-${randomSuffix}`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3015);

  app.use(express.json());

  // --- Health Endpoints ---
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ona-towers-api' });
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ona-towers-api' });
  });

  app.get('/api/health/database', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ona-towers-api', database: 'connected' });
  });

  // --- Residences API ---
  app.get('/api/residences', (_req: Request, res: Response) => {
    const summaries: ResidenceSummary[] = RESIDENCES
      .filter((r) => r.status === 'active')
      .sort((a, b) => a.display_order - b.display_order)
      .map(({ id, slug, name, type, bedrooms, size_m2, short_description, status, display_order, cover_image }) => ({
        id,
        slug,
        name,
        type,
        bedrooms,
        size_m2,
        short_description,
        status,
        display_order,
        cover_image,
      }));
    res.json(summaries);
  });

  app.get('/api/residences/:slug', (req: Request, res: Response) => {
    const slug = req.params.slug;
    const residence = RESIDENCES.find((r) => r.slug === slug);
    if (!residence) {
      res.status(404).json({
        error: {
          code: 'not_found',
          message: 'Residence not found',
        },
      });
      return;
    }
    res.json(residence);
  });

  // --- Content Endpoints ---
  app.get('/api/amenities', (_req: Request, res: Response) => {
    const items = AMENITIES
      .filter((a) => a.active)
      .sort((a, b) => a.display_order - b.display_order);
    res.json(items);
  });

  app.get('/api/smart-features', (_req: Request, res: Response) => {
    const items = SMART_FEATURES.sort((a, b) => a.display_order - b.display_order);
    res.json(items);
  });

  app.get('/api/location-points', (_req: Request, res: Response) => {
    const items = LOCATION_POINTS.sort((a, b) => a.display_order - b.display_order);
    res.json(items);
  });

  // --- Enquiries API ---
  app.post('/api/enquiries', (req: Request, res: Response) => {
    const {
      name,
      phone,
      email,
      residence_interest,
      enquiry_type = 'general',
      message,
      consent,
      source = 'website',
      company_website = '',
    } = req.body || {};

    // Bot honeypot: silently succeed without storing
    if (typeof company_website === 'string' && company_website.trim().length > 0) {
      res.status(201).json({
        success: true,
        reference_number: 'RECEIVED',
        message: 'Thank you. Your enquiry has been received.',
      });
      return;
    }

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters.');
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      errors.push('Valid phone number is required.');
    } else {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) {
        errors.push('Phone number must contain between 7 and 15 digits.');
      }
    }
    if (consent !== true) {
      errors.push('Consent is required to process enquiry.');
    }

    if (errors.length > 0) {
      res.status(422).json({
        error: {
          code: 'validation_error',
          message: errors.join(' '),
          details: errors,
        },
      });
      return;
    }

    // Duplicate enquiry prevention (5 minutes window)
    const fiveMinutesAgo = Date.now() - 300 * 1000;
    const isDuplicate = enquiriesStore.some((item) => {
      const isSamePerson =
        (email && item.email && item.email.toLowerCase() === email.toLowerCase()) ||
        item.phone === phone.trim();
      const isSameInterest = item.residence_interest === (residence_interest || null);
      const isRecent = new Date(item.created_at).getTime() > fiveMinutesAgo;
      return isSamePerson && isSameInterest && isRecent;
    });

    if (isDuplicate) {
      res.status(409).json({
        error: {
          code: 'duplicate_enquiry',
          message: 'An enquiry with matching details was submitted recently. Please wait a few moments.',
        },
      });
      return;
    }

    const referenceNumber = makeReferenceNumber();
    const record: EnquiryRecord = {
      id: `enq-${Date.now()}`,
      reference_number: referenceNumber,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      residence_interest: residence_interest || null,
      enquiry_type,
      message: message ? message.trim() : null,
      consent: true,
      source,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    enquiriesStore.push(record);

    res.status(201).json({
      success: true,
      reference_number: referenceNumber,
      message: 'Thank you. Your enquiry has been received.',
    });
  });

  // --- Static & Vite Frontend Handling ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express 5 wildcard route
    app.get('*all', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
