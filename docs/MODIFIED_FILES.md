# Modified / Added Files

This revision changes the project from two independent Vercel projects into one full-stack Vercel Services project.

## Added

- `vercel.json` — declares the frontend and backend as services in one Vercel project and routes `/api/*` to FastAPI.
- `package.json` — root development/build/test/database orchestration commands.
- `.env.example` — shared local/Vercel/Supabase environment template.
- `.dockerignore` — root Docker exclusions.
- `Dockerfile` — root backend container definition.
- `docker-compose.yml` — optional local frontend/backend container workflow.
- `backend/main.py` — FastAPI entrypoint used by Vercel Services.
- `backend/.python-version` — pins Python 3.13 for backend deployment.
- `database/README.md` — database and Supabase migration guidance.
- `scripts/setup-windows.ps1` — dependency setup only; intentionally does not run migrations.
- `scripts/migrate-database.ps1` — explicit Alembic + seed + database verification flow.
- `scripts/start-backend.ps1` — starts FastAPI only.
- `scripts/start-frontend.ps1` — starts Vite only.
- `scripts/start-vercel.ps1` — runs both Vercel services locally with `vercel dev -L`.
- `scripts/verify.ps1` — backend tests/migration state/frontend checks.
- `scripts/db_seed.py` — root-safe database seed wrapper.
- `scripts/db_check.py` — root-safe database readiness wrapper.

## Moved

- `backend/migrations/` -> `database/migrations/`
- `backend/alembic.ini` -> `database/alembic.ini`

## Modified

- `backend/app/core/config.py` — loads the shared root `.env` and normalizes ordinary PostgreSQL URLs to the installed Psycopg 3 driver.
- `backend/app/database/session.py` — Supabase/serverless connection settings and single-connection application pool behavior.
- `database/migrations/env.py` — imports backend metadata from the new structure and supports `MIGRATION_DATABASE_URL`.
- `database/alembic.ini` — points Python imports at `backend/`.
- `frontend/vite.config.ts` — loads root environment values and uses a configurable local backend proxy target.
- `backend/pyproject.toml` — Python 3.13 deployment range.
- `backend/.env.example` — local backend fallback values.
- `backend/.env.production.example` — one-project Supabase/Vercel production values.
- `frontend/.env.example` — same-origin `/api` configuration plus local proxy target.
- `frontend/.env.production.example` — same-origin production API path.
- `.gitignore` — updated for the new root environment and folder layout.
- `README.md` — new repository structure and run order.
- `DEPLOYMENT.md` — one Vercel project + Supabase deployment procedure.
- `backend/README.md` — backend-specific commands and deployment behavior.
- `frontend/README.md` — frontend-specific commands and same-origin API behavior.
- `DATABASE.md` — points to the active top-level database documentation.

## Removed

- `backend/index.py` — replaced by the Vercel Services entrypoint `backend/main.py`.
- `backend/Dockerfile` and `backend/.dockerignore` — consolidated into root Docker files.
- `database/migrations/db.sql` — removed because it contained obsolete local database credentials and is not part of the Supabase migration workflow.
- `CHANGED_FILES.md` — replaced by this current file.

## Migration retained and verified

- `database/migrations/versions/c4f2a31b7d90_admin_accounts_and_analytics.py` remains idempotent: it checks for `department` and the other admin fields before adding them.
