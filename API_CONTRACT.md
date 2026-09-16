# ONA Towers API Contract — Administration v2

Development backend: `http://127.0.0.1:8400`  
API prefix: `/api`

## Public customer endpoints

- `GET /api/residences`
- `GET /api/residences/{slug}`
- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`
- `POST /api/enquiries`
- `POST /api/analytics/visit` — anonymous customer page visit (`session_id`, `page_path`)

## Administration authentication

`POST /api/admin/login`

```json
{ "email": "admin@onatowers.dev", "password": "ona-admin-local" }
```

Returns a bearer token and the authenticated staff profile. All protected admin endpoints require `Authorization: Bearer <token>`.

`POST /api/admin/forgot-password` accepts `{ "email": "..." }` and records a reset request without revealing account existence.

`GET /api/admin/me` returns the signed-in staff profile.

`PATCH /api/admin/profile` updates the signed-in staff member's name, email and phone and returns a refreshed session token.

`POST /api/admin/security/password` changes the signed-in staff member's password using `current_password`, `new_password`, `confirm_password`.

## Overview

`GET /api/admin/overview` returns enquiry KPIs, active staff, overdue enquiries, recent enquiries, workspace settings, 14 daily traffic points, 12 monthly traffic points, 30-day visits/sessions and top customer pages.

## Enquiries

- `GET /api/admin/enquiries?search=&status=&page=&page_size=`
- `GET /api/admin/enquiries/{id}`
- `PATCH /api/admin/enquiries/{id}` — status, assigned staff ID, private notes

## Team / staff accounts

- `GET /api/admin/team`
- `POST /api/admin/team` — administrator only; requires name, email, password, responsibility/role; supports phone, department, administrator access and active state
- `PATCH /api/admin/team/{id}` — administrator only
- `POST /api/admin/team/{id}/reset-password` — administrator only
- `DELETE /api/admin/team/{id}` — administrator only; removes access without deleting historical assignments

## Workspace settings

- `GET /api/admin/settings`
- `PATCH /api/admin/settings` — administrator only
