# Backend

FastAPI + SQLAlchemy backend for ONA Towers.

## Local run from repository root

```powershell
.\scripts\start-backend.ps1
```

Direct equivalent:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port 8400
```

## Vercel

`backend/main.py` exports the FastAPI `app`. The root `vercel.json` registers `backend/` as a FastAPI service, so it deploys together with the frontend in one Vercel project.

## Tests

```powershell
.\.venv\Scripts\python.exe -m pytest -c backend\pyproject.toml backend\tests -q
```
