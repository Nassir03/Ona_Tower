# ONA Towers — Full Stack Website

A polished ONA Towers marketing website with a **Vite + React** frontend and **FastAPI + SQLAlchemy** backend.

## Final local ports

- Frontend: **http://127.0.0.1:3020**
- Backend: **http://127.0.0.1:8400**
- API docs: **http://127.0.0.1:8400/docs**

The frontend enquiry form is connected to `POST /api/enquiries` on the backend.

## Requirements

- Node.js 20+ (Node 22 recommended)
- npm
- Python 3.10–3.13
- pip / virtual environment support

PostgreSQL is **optional for local development**. The project defaults to SQLite so it can run immediately. Production can use PostgreSQL by setting `DATABASE_URL`.

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

The provided defaults already use frontend port `3020`, backend port `8400`, and a local SQLite database.

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

## Run the project

Use **two terminals** from the project root.

### Terminal 1 — backend on 8400

Activate the Python virtual environment, then run:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

On first development startup, the local SQLite schema and baseline content are created automatically.

Verify:

```text
http://127.0.0.1:8400/health
http://127.0.0.1:8400/health/database
http://127.0.0.1:8400/docs
```

### Terminal 2 — frontend on 3020

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3020
```

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

## PostgreSQL option

For production or PostgreSQL-based development, set this in `.env`:

```env
DATABASE_URL=postgresql+psycopg://ona_user:YOUR_PASSWORD@localhost:5432/ona_towers
AUTO_INIT_DB=false
```

Then create the database and apply migrations:

```bash
alembic upgrade head
python -m app.database.seed
```

For production, use a strong password and managed database credentials.

## Main backend endpoints

- `GET /`
- `GET /health`
- `GET /health/database`
- `GET /api/residences`
- `GET /api/residences/{slug}`
- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`
- `POST /api/enquiries`

## Project layout

```text
src/                 Active Vite/React frontend
public/              ONA image assets
app/                  FastAPI backend
app/database/         SQLAlchemy database layer and local bootstrap
app/repositories/     Data access layer
migrations/           Alembic migrations for production databases
tests/                Backend API tests
```

The obsolete duplicate Next.js frontend prototype was removed from the runnable project so there is one clear frontend implementation and one backend implementation.
