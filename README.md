# ONA Towers Backend Only

This project contains only the backend workstream for the ONA Towers website.

It intentionally does **not** implement the database workstream. There are no SQLAlchemy models, Alembic migrations, SQL schemas, database seed scripts or database credentials.

## Backend responsibilities implemented

- FastAPI application and REST API contracts
- residence list/detail endpoints
- optional amenities, smart-features and location endpoints
- enquiry submission endpoint
- server-side validation
- input sanitization
- honeypot anti-spam protection
- duplicate enquiry protection
- in-process IP rate limiting
- consistent error responses
- request IDs and JSON logging
- security response headers
- CORS configuration
- optional SMTP sales notification and customer acknowledgement
- environment configuration
- automated API tests
- Docker deployment file
- repository contract for the database team

## Why there is an in-memory repository

`app/repositories/memory.py` is a development/test adapter so the backend can run before the database team's real persistence layer is ready. It is not a database implementation and should not be used as production persistence.

The database team should implement `BackendRepository` in `app/repositories/base.py` and inject their adapter through `app/repositories/dependencies.py`.

## Run locally

Use Python 3.10, 3.11, 3.12, or 3.13. The pinned backend dependencies do not currently install cleanly on Python 3.14 in locked-down Windows environments because pip may try to compile native wheels.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Windows PowerShell:

```powershell
py -3.10 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
```

Open Swagger in development:

`http://localhost:8400/docs`

## Test

```bash
pytest -q
```

## Endpoints

- `GET /health`
- `GET /api/residences`
- `GET /api/residences/{slug}`
- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`
- `POST /api/enquiries`

See `API_CONTRACT.md` for request/response details.

## Database-team handoff

The backend expects these repository operations:

- `list_residences()`
- `get_residence_by_slug(slug)`
- `list_amenities()`
- `list_smart_features()`
- `list_location_points()`
- `create_enquiry(enquiry, reference_number)`
- `has_recent_duplicate_enquiry(...)`

The database team owns all table design, relationships, migrations, indexes, production persistence, reference data and backup/restore work.
