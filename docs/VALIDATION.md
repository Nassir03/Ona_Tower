# Validation Results

Validation performed after the repository restructure:

- Backend test suite: **17 passed**.
- Fresh SQLite migration: upgraded from base through `c4f2a31b7d90 (head)`.
- Database seed: completed successfully.
- Database readiness check: PASS with 4 seeded residence rows.
- Duplicate-column regression: migrated to `9b6a7f0f3e12`, manually added `admin_team_members.department`, then upgraded to head. Result: migration completed and `department` existed exactly once.
- Production-mode FastAPI smoke test against a migrated/seeded database: `/health` returned 200 and `/api/residences` returned 200 with 4 records.
- Frontend active Vite source: 49 source files retained from the uploaded project.
- Frontend public asset file list retained from the uploaded project.
- TypeScript/TSX syntax: 48 executable `.ts`/`.tsx` files transpiled with zero syntax errors.
- `frontend/package-lock.json` dependency declarations match `frontend/package.json`.
- Root and service JSON configuration files parse successfully.

## Environment limitation

A complete `npm ci && npm run build` could not be executed in this runner because the npm registry package download was unavailable/timed out (`npm ci --offline` confirmed at least one required tarball was not cached). This is an execution-environment limitation rather than a source error. Run `./scripts/verify.ps1` on a normal networked development machine before the production push; it performs the full frontend typecheck/build plus backend tests.
