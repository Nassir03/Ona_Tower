# Database

ONA Towers uses Alembic for schema changes and SQLAlchemy for application access.

## Layout

```text
database/
├── alembic.ini
└── migrations/
    ├── env.py
    └── versions/
```

## Local SQLite

From the repository root:

```powershell
python -m alembic -c database/alembic.ini upgrade head
python scripts/db_seed.py
python scripts/db_check.py
```

When using the root virtual environment, the project scripts set the backend import path automatically. The recommended Windows command is:

```powershell
.\scripts\migrate-database.ps1
```

## Supabase

Use two connection strings for production operations:

- `DATABASE_URL`: Supabase Transaction pooler, normally port `6543`, used by the Vercel FastAPI service.
- `MIGRATION_DATABASE_URL`: Supabase Direct connection or Session pooler, normally port `5432`, used only for Alembic migrations from a trusted machine/CI job.

Never commit either connection string or the database password.

## Migration safety

The admin migrations inspect the existing physical schema before adding columns/tables. In particular, `c4f2a31b7d90` does not add `admin_team_members.department` when that column already exists, preventing the former SQLite `duplicate column name: department` failure.
