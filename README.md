# ONA Towers — Full Stack Website

ONA Towers is a full-stack marketing website with a **Vite + React** frontend and a **FastAPI + SQLAlchemy** backend.

The project now has one clear frontend implementation in `src/` and one backend implementation in `app/`. The older duplicate Next.js frontend has been removed from the runnable source tree.

## Local ports

- Frontend: **http://127.0.0.1:3000**
- Backend: **http://127.0.0.1:8400**
- API docs: **http://127.0.0.1:8400/docs**

## Frontend pages

The Home page is intentionally concise. Detailed content is separated into dedicated routes:

- `/` — Home / project overview
- `/residences` — residence typologies, penthouses and interiors
- `/development` — ONA idea, masterplan, connected-living feature and architecture
- `/lifestyle` — lifestyle amenities
- `/commercial` — commercial / service building
- `/location` — Zanzibar location information
- `/enquire` — enquiry form
- `/admin` — authenticated admin overview
- `/admin/enquiries` — customer enquiry management
- `/admin/team` — team and assignment management
- `/admin/settings` — admin workspace settings

The navigation and footer use real URL routes instead of scrolling through one oversized Home page.

## Frontend ↔ backend connections

The active frontend is connected to these backend endpoints:

- `GET /api/residences`
- `GET /api/residences/{slug}`
- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`
- `POST /api/enquiries`
- `POST /api/admin/login`
- `GET /api/admin/overview`
- `GET /api/admin/enquiries`
- `PATCH /api/admin/enquiries/{id}`
- `GET/POST/PATCH/DELETE /api/admin/team`
- `GET/PATCH /api/admin/settings`

Verified local project content remains as a graceful display fallback for the read-only marketing sections if the API is temporarily unavailable. Enquiry submission still requires the backend.

## Requirements

- Node.js 20+ (Node 22 recommended)
- npm
- Python 3.10–3.13
- pip / virtual environment support

PostgreSQL is optional for local development. The project defaults to SQLite so it can run immediately. Production can use PostgreSQL through `DATABASE_URL`.

## First-time setup

From the project root:

### 1. Create the environment file

Linux / macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 2. Install backend dependencies

Linux / macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Windows PowerShell:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Install frontend dependencies

```bash
npm install
```

## Run locally

Use two terminals from the project root.

### Terminal 1 — backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Verify:

- `http://127.0.0.1:8400/health`
- `http://127.0.0.1:8400/health/database`
- `http://127.0.0.1:8400/docs`

### Terminal 2 — frontend

```bash
npm run dev
```

Open `http://127.0.0.1:3000`.

## Tests and checks

Backend tests:

```bash
pytest -q
```

Database readiness:

```bash
python -m app.database.check
```

Frontend production build:

```bash
npm run build
```

## Static hosting route fallback

Because the frontend uses URL routes, static hosting must send unknown frontend paths to `index.html`.

This repository includes:

- `public/_redirects` for hosts that support the redirects file format (including Cloudflare Pages / Netlify-style hosting)
- `vercel.json` for Vercel rewrites

## Deploy to Vercel

The repository is configured for a single Vercel project that serves:

- the Vite frontend from `dist/`
- the FastAPI backend through `api/index.py`
- same-origin API calls at `/api/*`

Recommended Vercel project settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Do not set `VITE_API_BASE_URL` in Vercel unless the API is deployed on a separate domain. The frontend defaults to `/api`, which is what `vercel.json` routes to FastAPI.

For a zero-setup preview deployment, no database environment variable is required. The Vercel API entrypoint uses seeded SQLite at `/tmp/ona_towers.db`, which works for marketing content and test enquiries but is ephemeral between serverless cold starts.

For persistent production enquiries, set:

```env
APP_ENV=production
APP_DEBUG=false
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:PORT/DATABASE
AUTO_INIT_DB=false
```

Then run migrations and seed data against that database before going live:

```bash
alembic upgrade head
python -m app.database.seed
```

## PostgreSQL option

Set this in `.env` for PostgreSQL:

```env
DATABASE_URL=postgresql+psycopg://ona_user:YOUR_PASSWORD@localhost:5432/ona_towers
AUTO_INIT_DB=false
```

Then run:

```bash
alembic upgrade head
python -m app.database.seed
```

## Project layout

```text
src/                 Active Vite + React frontend
src/pages/           Frontend route-level pages
src/components/      Reusable frontend sections/components
src/api/             Frontend API client modules
public/              ONA image assets and SPA redirect file
app/                  FastAPI backend
app/database/         SQLAlchemy models, local bootstrap and DB utilities
app/repositories/     Data access layer
migrations/           Alembic migrations
scripts/              Local run helpers
tests/                Backend API tests
```


## Admin workspace

The administration workspace is isolated from the public customer layout and is available at `/admin`. It includes Overview, Enquiries, Team and Settings.

Local bootstrap credentials:

```text
Email: admin@onatowers.dev
Password: ona-admin-local
```

Production must override the bootstrap administrator and session secret:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_NAME=Administrator
ADMIN_ROLE=Administrator
ADMIN_DEPARTMENT=Administration
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
ADMIN_SESSION_HOURS=12
```

Staff accounts are stored in `admin_team_members`. Passwords are PBKDF2-SHA256 hashes; plain-text passwords are never returned by the API. Administrators can create staff accounts, set responsibilities/departments, reset passwords and remove access. Each staff member can edit their own name, email, phone and password from Settings.

The login page uses staff email + password and includes a password-reset request. Reset requests are surfaced on the Team page so an administrator can issue a temporary password.

### Customer → admin connection

The public enquiry form continues to submit to `POST /api/enquiries`. Admin Enquiries reads and updates those same records. Public page navigation also sends an anonymous `POST /api/analytics/visit` record containing only a generated browser session ID, page path and timestamp. Admin Overview uses these records for daily/monthly traffic plots and top-page totals. Admin routes are excluded from customer analytics.

### Local run

After copying `.env.example` to `.env`, install dependencies and prepare the database:

```powershell
python -m pip install -r requirements.txt
npm install
python -m alembic upgrade head
python -m app.database.check
```

Run the FastAPI backend in terminal 1:

```powershell
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Run the Vite/Express frontend in terminal 2:

```powershell
npm run dev
```

Open `http://127.0.0.1:3000/admin`. The supplied `.env.example` points the local frontend API at `http://127.0.0.1:8400/api`. For same-origin production/Vercel deployment, do not set `VITE_API_BASE_URL`.

### Database upgrade

The current Alembic head is `c4f2a31b7d90`. Apply it with:

```bash
python -m alembic upgrade head
```

The development SQLite bootstrap also adds the new staff-account columns when opening an older local database.
