# ONA Towers Deployment — One Vercel Project + Supabase

## Architecture

ONA Towers deploys as **one Vercel project** using Vercel Services:

- `frontend/` — Vite + React service
- `backend/` — FastAPI service
- `database/` — Alembic migrations, not deployed as an application service
- Supabase — PostgreSQL database

Public routing is controlled by the root `vercel.json`:

- `/api` and `/api/*` -> backend service
- `/health` -> backend service
- all other routes -> frontend service

The frontend therefore uses `VITE_API_BASE_URL=/api` in production.

## 1. Prepare Supabase

Create a Supabase project and copy two database connection strings from the **Connect** panel.

### Runtime connection

Use the **Transaction pooler** for the Vercel FastAPI runtime. It normally uses port `6543`.

Set it in Vercel as:

```env
DATABASE_URL=postgresql+psycopg://postgres.PROJECT_REF:PASSWORD@POOLER_HOST:6543/postgres?sslmode=require
```

### Migration connection

Use a **Direct connection** or **Session pooler** for Alembic migrations. It normally uses port `5432`.

Keep it on your trusted development/CI machine as:

```env
MIGRATION_DATABASE_URL=postgresql+psycopg://postgres.PROJECT_REF:PASSWORD@HOST:5432/postgres?sslmode=require
```

Do not put the migration URL in frontend code.

## 2. Run Supabase migrations before first production deployment

From the repository root, create `.env` from `.env.example`, then set the real Supabase URLs.

Windows:

```powershell
.\scripts\setup-windows.ps1
.\scripts\migrate-database.ps1
```

Equivalent commands:

```powershell
$env:PYTHONPATH = "$PWD\backend"
.\.venv\Scripts\python.exe -m alembic -c database\alembic.ini upgrade head
.\.venv\Scripts\python.exe scripts\db_seed.py
.\.venv\Scripts\python.exe scripts\db_check.py
```

Do **not** run Alembic automatically on every Vercel function invocation.

## 3. Import the Git repository into Vercel

Create **one Vercel project** from the repository root.

In **Project Settings -> Build and Deployment**:

```text
Root Directory: repository root
Framework: Services
```

Do not choose `frontend/` or `backend/` as the project Root Directory.

The root `vercel.json` declares both services and their routing.

## 4. Vercel environment variables

Add these to the Vercel project for Production and Preview as appropriate:

```env
APP_ENV=production
APP_DEBUG=false
API_PREFIX=/api
AUTO_INIT_DB=false
DATABASE_URL=YOUR_SUPABASE_TRANSACTION_POOLER_URL

ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
ADMIN_NAME=ONA Administrator
ADMIN_ROLE=Administrator
ADMIN_DEPARTMENT=Administration
ADMIN_SESSION_SECRET=YOUR_LONG_RANDOM_SECRET
ADMIN_SESSION_HOURS=12

VITE_API_BASE_URL=/api
```

Optional mail variables can also be added when SMTP notifications are enabled.

Because frontend and backend share the same Vercel origin, normal browser API calls do not require a production CORS origin. `CORS_ORIGINS` can stay empty unless another domain must call the API directly.

## 5. Deploy

Push to the connected Git branch, or run from the repository root:

```powershell
vercel
```

Production:

```powershell
vercel --prod
```

Vercel builds `frontend/` and `backend/` as separate services but deploys them atomically as **one project and one domain**.

## 6. Verify production

Check:

```text
https://YOUR-DOMAIN/
https://YOUR-DOMAIN/admin
https://YOUR-DOMAIN/health
https://YOUR-DOMAIN/health/database
```

API example:

```text
https://YOUR-DOMAIN/api/residences
```

Production API docs are intentionally disabled by the FastAPI configuration when `APP_ENV=production`.

## 7. Future database changes

For every schema change:

1. create/review an Alembic migration under `database/migrations/versions/`;
2. apply it to Supabase with `MIGRATION_DATABASE_URL`;
3. verify the database;
4. deploy the application code.

Never edit the Supabase production schema manually and then rely on `create_all()` to reconcile it.
