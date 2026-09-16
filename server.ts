import express, { NextFunction, Request, Response } from 'express';
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  for (const rawLine of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator <= 0) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadLocalEnv();

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
  assigned_to?: string | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at?: string | null;
}


interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  department?: string | null;
  password_hash: string;
  is_super_admin: boolean;
  active: boolean;
  last_login_at?: string | null;
  password_reset_requested_at?: string | null;
  created_at: string;
  updated_at: string;
}

interface SiteVisitRecord {
  id: string;
  session_id: string;
  page_path: string;
  visited_at: string;
}

interface AdminWorkspaceSettings {
  project_name: string;
  sales_email?: string | null;
  sales_phone?: string | null;
  whatsapp_number?: string | null;
  response_sla_hours: number;
  timezone: string;
  customer_site_url: string;
  notifications_enabled: boolean;
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

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@onatowers.dev').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ona-admin-local';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Oniria Assistant';
const ADMIN_ROLE = process.env.ADMIN_ROLE || 'Administrator';
const ADMIN_DEPARTMENT = process.env.ADMIN_DEPARTMENT || 'Administration';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'ona-local-development-secret';
const ADMIN_SESSION_HOURS = Number(process.env.ADMIN_SESSION_HOURS || '12');

function hashAdminPassword(password: string): string {
  const salt = randomBytes(16);
  const iterations = 260000;
  const digest = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  return `pbkdf2_sha256$${iterations}$${salt.toString('base64url')}$${digest.toString('base64url')}`;
}

function verifyAdminPassword(password: string, encoded: string): boolean {
  try {
    const [algorithm, iterationsText, saltText, digestText] = encoded.split('$');
    if (algorithm !== 'pbkdf2_sha256') return false;
    const supplied = pbkdf2Sync(password, Buffer.from(saltText, 'base64url'), Number(iterationsText), 32, 'sha256');
    return safeEqualString(supplied.toString('base64url'), digestText);
  } catch { return false; }
}

const nowSeed = new Date().toISOString();
const teamStore: AdminTeamMember[] = [{
  id: 'team-admin-local',
  name: ADMIN_NAME,
  email: ADMIN_EMAIL,
  phone: null,
  role: ADMIN_ROLE,
  department: ADMIN_DEPARTMENT,
  password_hash: hashAdminPassword(ADMIN_PASSWORD),
  is_super_admin: true,
  active: true,
  last_login_at: null,
  password_reset_requested_at: null,
  created_at: nowSeed,
  updated_at: nowSeed,
}];
const siteVisitsStore: SiteVisitRecord[] = [];
let adminWorkspaceSettings: AdminWorkspaceSettings = {
  project_name: 'ONA Towers',
  sales_email: null,
  sales_phone: null,
  whatsapp_number: null,
  response_sla_hours: 24,
  timezone: 'Africa/Dar_es_Salaam',
  customer_site_url: '/',
  notifications_enabled: true,
};
let adminSettingsUpdatedAt: string | null = null;

function b64url(value: string | Buffer): string {
  return Buffer.from(value).toString('base64url');
}

function makeAdminToken(member: AdminTeamMember): { token: string; expiresAt: number } {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_HOURS * 3600;
  const payload = b64url(JSON.stringify({ id: member.id, email: member.email, exp: expiresAt }));
  const signature = createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('base64url');
  return { token: `${payload}.${signature}`, expiresAt };
}

function safeEqualString(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function adminFromToken(token: string): AdminTeamMember | null {
  try {
    const [payloadPart, signaturePart] = token.split('.', 2);
    if (!payloadPart || !signaturePart) return null;
    const expected = createHmac('sha256', ADMIN_SESSION_SECRET).update(payloadPart).digest('base64url');
    if (!safeEqualString(expected, signaturePart)) return null;
    const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8')) as { id: string; email: string; exp: number };
    if (Number(payload.exp) <= Math.floor(Date.now() / 1000)) return null;
    return teamStore.find((item) => item.id === payload.id && item.active && item.email === payload.email) || null;
  } catch { return null; }
}

function currentAdmin(req: Request, res: Response): AdminTeamMember | null {
  const authorization = req.header('authorization') || '';
  const token = authorization.toLowerCase().startsWith('bearer ') ? authorization.slice(7).trim() : '';
  const member = token ? adminFromToken(token) : null;
  if (!member) {
    res.status(401).json({ error: { code: 'admin_unauthorized', message: 'Admin authentication is required. Please sign in again.' } });
    return null;
  }
  return member;
}

function requireSuperAdmin(req: Request, res: Response): AdminTeamMember | null {
  const member = currentAdmin(req, res);
  if (!member) return null;
  if (!member.is_super_admin) {
    res.status(403).json({ error: { code: 'admin_forbidden', message: 'Administrator permission is required for this action.' } });
    return null;
  }
  return member;
}

function makeReferenceNumber(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ONA-${datePart}-${randomSuffix}`;
}

async function startServer() {
  const app = express();
  const PORT = 3010;
  const httpServer = createHttpServer(app);

  app.use(express.json());
  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
      res.status(400).json({
        error: {
          code: 'invalid_json',
          message: 'The request body must be valid JSON.',
        },
      });
      return;
    }
    next(err);
  });

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


  // --- Anonymous customer-site analytics ---
  app.post('/api/analytics/visit', (req: Request, res: Response) => {
    const sessionId = String(req.body?.session_id || '').trim().slice(0, 80);
    const pagePath = String(req.body?.page_path || '').trim().slice(0, 220);
    if (sessionId.length < 8 || !pagePath) {
      res.status(422).json({ error: { code: 'validation_error', message: 'A valid session and page are required.' } });
      return;
    }
    if (!pagePath.startsWith('/admin')) {
      siteVisitsStore.push({ id: `visit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, session_id: sessionId, page_path: pagePath, visited_at: new Date().toISOString() });
    }
    res.status(201).json({ success: true });
  });

  function publicStaff(member: AdminTeamMember) {
    const { password_hash: _passwordHash, ...safe } = member;
    return safe;
  }

  function buildAnalytics() {
    const now = new Date();
    const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;
    const visits30 = siteVisitsStore.filter((visit) => new Date(visit.visited_at).getTime() >= thirtyDaysAgo);
    const uniqueSessions = new Set(visits30.map((visit) => visit.session_id)).size;
    const topCounts = new Map<string, number>();
    visits30.forEach((visit) => topCounts.set(visit.page_path, (topCounts.get(visit.page_path) || 0) + 1));
    const topPages = [...topCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([path, visits]) => ({ path, visits }));

    const daily = Array.from({ length: 14 }, (_, offset) => {
      const day = new Date(now);
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (13 - offset));
      const next = new Date(day); next.setDate(next.getDate() + 1);
      const value = siteVisitsStore.filter((visit) => {
        const time = new Date(visit.visited_at).getTime();
        return time >= day.getTime() && time < next.getTime();
      }).length;
      return { label: day.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), value };
    });

    const monthly = Array.from({ length: 12 }, (_, offset) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (11 - offset), 1);
      const next = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      const value = siteVisitsStore.filter((visit) => {
        const time = new Date(visit.visited_at).getTime();
        return time >= month.getTime() && time < next.getTime();
      }).length;
      return { label: month.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }), value };
    });

    return { total_visits_30_days: visits30.length, unique_sessions_30_days: uniqueSessions, daily, monthly, top_pages: topPages };
  }

  // --- Admin Workspace API ---
  app.post('/api/admin/login', (req: Request, res: Response) => {
    if (process.env.NODE_ENV === 'production' && (ADMIN_PASSWORD === 'ona-admin-local' || ADMIN_SESSION_SECRET === 'ona-local-development-secret')) {
      res.status(503).json({ error: { code: 'admin_not_configured', message: 'Admin access is not configured for production.' } });
      return;
    }
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const member = teamStore.find((item) => item.email === email && item.active);
    if (!member || !verifyAdminPassword(password, member.password_hash)) {
      res.status(401).json({ error: { code: 'admin_invalid_credentials', message: 'Invalid staff email or password.' } });
      return;
    }
    member.last_login_at = new Date().toISOString();
    member.password_reset_requested_at = null;
    member.updated_at = new Date().toISOString();
    const { token, expiresAt } = makeAdminToken(member);
    res.json({ token, token_type: 'bearer', expires_at: expiresAt, user: publicStaff(member) });
  });

  app.post('/api/admin/forgot-password', (req: Request, res: Response) => {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const member = teamStore.find((item) => item.email === email && item.active);
    if (member) {
      member.password_reset_requested_at = new Date().toISOString();
      member.updated_at = new Date().toISOString();
    }
    res.json({ success: true, message: 'If that staff account exists, a password reset request has been recorded.' });
  });

  app.get('/api/admin/me', (req: Request, res: Response) => {
    const member = currentAdmin(req, res); if (!member) return;
    res.json({ user: publicStaff(member) });
  });

  app.patch('/api/admin/profile', (req: Request, res: Response) => {
    const member = currentAdmin(req, res); if (!member) return;
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const phone = req.body?.phone ? String(req.body.phone).trim() : null;
    if (name.length < 2 || !email.includes('@')) {
      res.status(422).json({ error: { code: 'validation_error', message: 'Full name and a valid email are required.' } }); return;
    }
    if (teamStore.some((item) => item.id !== member.id && item.email === email)) {
      res.status(409).json({ error: { code: 'team_email_exists', message: 'A staff account with this email already exists.' } }); return;
    }
    member.name = name; member.email = email; member.phone = phone; member.updated_at = new Date().toISOString();
    const { token, expiresAt } = makeAdminToken(member);
    res.json({ token, token_type: 'bearer', expires_at: expiresAt, user: publicStaff(member) });
  });

  app.post('/api/admin/security/password', (req: Request, res: Response) => {
    const member = currentAdmin(req, res); if (!member) return;
    const currentPassword = String(req.body?.current_password || '');
    const next = String(req.body?.new_password || '');
    const confirm = String(req.body?.confirm_password || '');
    if (!verifyAdminPassword(currentPassword, member.password_hash)) {
      res.status(422).json({ error: { code: 'invalid_current_password', message: 'Current password is incorrect.' } }); return;
    }
    if (next.length < 8 || next !== confirm || next === currentPassword) {
      res.status(422).json({ error: { code: 'validation_error', message: 'Use a different password of at least 8 characters and confirm it correctly.' } }); return;
    }
    member.password_hash = hashAdminPassword(next); member.password_reset_requested_at = null; member.updated_at = new Date().toISOString();
    res.json({ success: true, message: 'Password updated successfully.' });
  });

  app.get('/api/admin/overview', (req: Request, res: Response) => {
    if (!currentAdmin(req, res)) return;
    const closedStatuses = new Set(['closed', 'archived']);
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const overdueBefore = Date.now() - adminWorkspaceSettings.response_sla_hours * 60 * 60 * 1000;
    const recent = [...enquiriesStore].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);
    res.json({
      total_enquiries: enquiriesStore.length,
      new_enquiries: enquiriesStore.filter((item) => item.status === 'new').length,
      active_enquiries: enquiriesStore.filter((item) => !closedStatuses.has(item.status)).length,
      closed_enquiries: enquiriesStore.filter((item) => closedStatuses.has(item.status)).length,
      enquiries_last_7_days: enquiriesStore.filter((item) => new Date(item.created_at).getTime() >= sevenDaysAgo).length,
      active_team_members: teamStore.filter((member) => member.active).length,
      overdue_enquiries: enquiriesStore.filter((item) => !closedStatuses.has(item.status) && new Date(item.created_at).getTime() < overdueBefore).length,
      recent_enquiries: recent,
      settings: adminWorkspaceSettings,
      analytics: buildAnalytics(),
    });
  });

  app.get('/api/admin/enquiries', (req: Request, res: Response) => {
    if (!currentAdmin(req, res)) return;
    const search = String(req.query.search || '').trim().toLowerCase();
    const status = String(req.query.status || 'all');
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(100, Math.max(1, Number(req.query.page_size || 25)));
    let items = [...enquiriesStore];
    if (search) items = items.filter((item) => [item.name, item.email || '', item.phone, item.reference_number, item.residence_interest || ''].some((value) => value.toLowerCase().includes(search)));
    if (status !== 'all') items = items.filter((item) => item.status === status);
    items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const total = items.length; const start = (page - 1) * pageSize;
    res.json({ items: items.slice(start, start + pageSize), total, page, page_size: pageSize });
  });

  app.patch('/api/admin/enquiries/:id', (req: Request, res: Response) => {
    if (!currentAdmin(req, res)) return;
    const item = enquiriesStore.find((enquiry) => enquiry.id === req.params.id);
    if (!item) { res.status(404).json({ error: { code: 'not_found', message: 'Enquiry not found.' } }); return; }
    const validStatuses = new Set(['new', 'contacted', 'qualified', 'viewing_scheduled', 'closed', 'archived']);
    if (req.body?.status !== undefined) {
      if (!validStatuses.has(req.body.status)) { res.status(422).json({ error: { code: 'validation_error', message: 'Invalid enquiry status.' } }); return; }
      item.status = req.body.status;
    }
    if (req.body?.assigned_to !== undefined) {
      const assignedTo = req.body.assigned_to || null;
      if (assignedTo && !teamStore.some((member) => member.id === assignedTo && member.active)) { res.status(422).json({ error: { code: 'invalid_assignee', message: 'The selected staff member is not available.' } }); return; }
      item.assigned_to = assignedTo;
    }
    if (req.body?.internal_notes !== undefined) item.internal_notes = req.body.internal_notes ? String(req.body.internal_notes).trim().slice(0, 5000) : null;
    item.updated_at = new Date().toISOString(); res.json(item);
  });

  app.get('/api/admin/team', (req: Request, res: Response) => {
    if (!currentAdmin(req, res)) return;
    const includeInactive = String(req.query.include_inactive || 'false') === 'true';
    res.json(teamStore.filter((member) => includeInactive || member.active).sort((a, b) => a.name.localeCompare(b.name)).map(publicStaff));
  });

  app.post('/api/admin/team', (req: Request, res: Response) => {
    if (!requireSuperAdmin(req, res)) return;
    const name = String(req.body?.name || '').trim(); const email = String(req.body?.email || '').trim().toLowerCase();
    const role = String(req.body?.role || 'Sales manager').trim(); const phone = req.body?.phone ? String(req.body.phone).trim() : null;
    const department = req.body?.department ? String(req.body.department).trim() : null; const password = String(req.body?.password || '');
    if (name.length < 2 || !email.includes('@') || role.length < 2 || password.length < 8) { res.status(422).json({ error: { code: 'validation_error', message: 'Name, valid email, responsibility and a password of at least 8 characters are required.' } }); return; }
    if (teamStore.some((member) => member.email === email)) { res.status(409).json({ error: { code: 'team_email_exists', message: 'A staff account with this email already exists.' } }); return; }
    const now = new Date().toISOString();
    const member: AdminTeamMember = { id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, email, phone, role, department, password_hash: hashAdminPassword(password), is_super_admin: Boolean(req.body?.is_super_admin), active: req.body?.active !== false, last_login_at: null, password_reset_requested_at: null, created_at: now, updated_at: now };
    teamStore.push(member); res.status(201).json(publicStaff(member));
  });

  app.patch('/api/admin/team/:id', (req: Request, res: Response) => {
    const actor = requireSuperAdmin(req, res); if (!actor) return;
    const member = teamStore.find((item) => item.id === req.params.id);
    if (!member) { res.status(404).json({ error: { code: 'not_found', message: 'Staff member not found.' } }); return; }
    const nextEmail = req.body?.email !== undefined ? String(req.body.email).trim().toLowerCase() : member.email;
    if (teamStore.some((item) => item.id !== member.id && item.email === nextEmail)) { res.status(409).json({ error: { code: 'team_email_exists', message: 'A staff account with this email already exists.' } }); return; }
    const nextActive = req.body?.active !== undefined ? Boolean(req.body.active) : member.active;
    const nextSuper = req.body?.is_super_admin !== undefined ? Boolean(req.body.is_super_admin) : member.is_super_admin;
    if (member.id === actor.id && !nextActive) { res.status(422).json({ error: { code: 'cannot_deactivate_self', message: 'You cannot remove your own access while signed in.' } }); return; }
    const otherAdmins = teamStore.filter((item) => item.id !== member.id && item.active && item.is_super_admin).length;
    if (member.is_super_admin && (!nextActive || !nextSuper) && otherAdmins === 0) { res.status(422).json({ error: { code: 'last_admin_required', message: 'At least one active administrator account is required.' } }); return; }
    if (req.body?.name !== undefined) member.name = String(req.body.name).trim();
    if (req.body?.email !== undefined) member.email = nextEmail;
    if (req.body?.phone !== undefined) member.phone = req.body.phone ? String(req.body.phone).trim() : null;
    if (req.body?.role !== undefined) member.role = String(req.body.role).trim();
    if (req.body?.department !== undefined) member.department = req.body.department ? String(req.body.department).trim() : null;
    member.is_super_admin = nextSuper; member.active = nextActive; member.updated_at = new Date().toISOString(); res.json(publicStaff(member));
  });

  app.post('/api/admin/team/:id/reset-password', (req: Request, res: Response) => {
    if (!requireSuperAdmin(req, res)) return;
    const member = teamStore.find((item) => item.id === req.params.id); const password = String(req.body?.new_password || '');
    if (!member) { res.status(404).json({ error: { code: 'not_found', message: 'Staff member not found.' } }); return; }
    if (password.length < 8) { res.status(422).json({ error: { code: 'validation_error', message: 'Password must contain at least 8 characters.' } }); return; }
    member.password_hash = hashAdminPassword(password); member.password_reset_requested_at = null; member.updated_at = new Date().toISOString();
    res.json({ success: true, message: 'Temporary password saved. Ask the staff member to sign in and change it.' });
  });

  app.delete('/api/admin/team/:id', (req: Request, res: Response) => {
    const actor = requireSuperAdmin(req, res); if (!actor) return;
    const member = teamStore.find((item) => item.id === req.params.id);
    if (!member) { res.status(404).json({ error: { code: 'not_found', message: 'Staff member not found.' } }); return; }
    if (member.id === actor.id) { res.status(422).json({ error: { code: 'cannot_deactivate_self', message: 'You cannot remove your own access while signed in.' } }); return; }
    const otherAdmins = teamStore.filter((item) => item.id !== member.id && item.active && item.is_super_admin).length;
    if (member.is_super_admin && otherAdmins === 0) { res.status(422).json({ error: { code: 'last_admin_required', message: 'At least one active administrator account is required.' } }); return; }
    member.active = false; member.updated_at = new Date().toISOString(); res.json({ success: true, message: 'Staff access removed. Historical enquiry assignments were preserved.' });
  });

  app.get('/api/admin/settings', (req: Request, res: Response) => {
    if (!currentAdmin(req, res)) return; res.json({ settings: adminWorkspaceSettings, updated_at: adminSettingsUpdatedAt });
  });

  app.patch('/api/admin/settings', (req: Request, res: Response) => {
    if (!requireSuperAdmin(req, res)) return;
    const next = req.body || {};
    adminWorkspaceSettings = {
      project_name: String(next.project_name || 'ONA Towers').slice(0, 120), sales_email: next.sales_email ? String(next.sales_email).slice(0, 254) : null,
      sales_phone: next.sales_phone ? String(next.sales_phone).slice(0, 40) : null, whatsapp_number: next.whatsapp_number ? String(next.whatsapp_number).slice(0, 40) : null,
      response_sla_hours: Math.min(168, Math.max(1, Number(next.response_sla_hours || 24))), timezone: String(next.timezone || 'Africa/Dar_es_Salaam').slice(0, 80),
      customer_site_url: String(next.customer_site_url || '/').slice(0, 500), notifications_enabled: next.notifications_enabled !== false,
    };
    adminSettingsUpdatedAt = new Date().toISOString(); res.json({ settings: adminWorkspaceSettings, updated_at: adminSettingsUpdatedAt });
  });

  // --- Static & Vite Frontend Handling ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
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

  httpServer.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use. The ONA Towers dev server is probably already running at http://127.0.0.1:${PORT}`);
      process.exit(0);
    }
    throw error;
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
