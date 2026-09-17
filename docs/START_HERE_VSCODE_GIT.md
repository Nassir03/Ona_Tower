# Start Here in VS Code

Open the **repository root** in VS Code.

## 1. First-time setup

Windows PowerShell:

```powershell
.\scripts\setup-windows.ps1
```

Then prepare the database explicitly:

```powershell
.\scripts\migrate-database.ps1
```

Setup and migrations are separate on purpose. Installing dependencies should never unexpectedly alter the database.

## 2. Normal local development

Terminal 1:

```powershell
.\scripts\start-backend.ps1
```

Terminal 2:

```powershell
.\scripts\start-frontend.ps1
```

Open:

- Website: `http://127.0.0.1:3010`
- Admin: `http://127.0.0.1:3010/admin`
- Backend: `http://127.0.0.1:8400`
- Swagger: `http://127.0.0.1:8400/docs`

## 3. Run the same full-stack model used by Vercel

With Vercel CLI installed:

```powershell
.\scripts\start-vercel.ps1
```

This runs the Vite and FastAPI services together through the root `vercel.json`.

## 4. Before pushing

```powershell
.\scripts\verify.ps1
```

The repository is designed to be pushed from the root as one Git project and imported into Vercel once with Framework set to **Services**.
