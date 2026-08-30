# ONA Towers Backend

FastAPI backend for ONA Towers with PostgreSQL persistence through SQLAlchemy and schema migrations through Alembic.

## What is connected

The production request path is:

`Frontend -> FastAPI -> PostgresRepository -> SQLAlchemy -> PostgreSQL`

The active repository dependency is `PostgresRepository` in `app/repositories/dependencies.py`. The in-memory repository is used only by automated tests through dependency overrides.

## Requirements

- Python 3.10-3.13
- PostgreSQL
- pip / virtual environment support

## First-time local setup

### 1. Create and activate a virtual environment

Linux / Ubuntu:

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

Do not reuse a `.venv` copied from another operating system. Recreate it locally.

### 2. Create the PostgreSQL database

The default development configuration expects:

- database: `ona_towers`
- user: `ona_user`
- host: `localhost`
- port: `5432`

Example PostgreSQL commands:

```sql
CREATE USER ona_user WITH PASSWORD 'ona_password';
CREATE DATABASE ona_towers OWNER ona_user;
```

Use a different password for non-local environments.

### 3. Create `.env`

```bash
cp .env.example .env
```

Confirm that `DATABASE_URL` in `.env` matches the database you created:

```env
DATABASE_URL=postgresql+psycopg://ona_user:ona_password@localhost:5432/ona_towers
```

### 4. Apply migrations

```bash
alembic upgrade head
```

### 5. Seed the initial residence records

```bash
python -m app.database.seed
```

### 6. Verify the database completely

```bash
python -m app.database.check
```

A ready local database prints:

```text
Database connection: OK
Schema check: OK
Residence rows: 3
Seed data: OK
Backend/database readiness: PASS
```

### 7. Run the backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Then open:

- API docs: `http://127.0.0.1:8400/docs`
- app health: `http://127.0.0.1:8400/health`
- database health: `http://127.0.0.1:8400/health/database`
- residences: `http://127.0.0.1:8400/api/residences`

## Automated tests

```bash
python -m pytest -v
```

The tests use an isolated in-memory test database configuration and an in-memory repository override, so they do not modify local PostgreSQL data.

## Main endpoints

- `GET /health`
- `GET /health/database`
- `GET /api/residences`
- `GET /api/residences/{slug}`
- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`
- `POST /api/enquiries`

See `API_CONTRACT.md` for request and response details.

## Database files

- `app/database/models.py` - SQLAlchemy table models
- `app/database/session.py` - SQLAlchemy engine/session configuration
- `app/database/seed.py` - initial residence seed data
- `app/database/check.py` - DB/schema/seed readiness verification
- `app/repositories/postgres.py` - PostgreSQL-backed repository implementation
- `migrations/` - Alembic migration history
- `DATABASE.md` - database design and operations notes

## Docker

The image contains both the application and Alembic migrations. Supply `DATABASE_URL` at runtime.

Build:

```bash
docker build -t ona-towers-api .
```

Apply migrations using the image:

```bash
docker run --rm --network host --env-file .env ona-towers-api alembic upgrade head
```

Seed data:

```bash
docker run --rm --network host --env-file .env ona-towers-api python -m app.database.seed
```

Run API:

```bash
docker run --rm --network host --env-file .env ona-towers-api
```

For production, use a managed PostgreSQL instance or an application network rather than relying on host networking.
