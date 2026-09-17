# Frontend

Vite + React frontend for the ONA Towers public website and `/admin` workspace.

## Local run

From the repository root:

```powershell
.\scripts\start-frontend.ps1
```

or:

```powershell
cd frontend
npm ci
npm run dev
```

The Vite dev server proxies `/api` to `http://127.0.0.1:8400` by default.

## Vercel

The frontend is not a separate Vercel project. The root `vercel.json` registers `frontend/` as the Vite service in the same project as FastAPI.

Production API calls use:

```env
VITE_API_BASE_URL=/api
```

`frontend/vercel.json` provides the SPA fallback so direct URLs such as `/admin`, `/residences`, and `/development` return `index.html`.
