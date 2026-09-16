# ONA Towers Database — Administration v2

The backend uses SQLAlchemy with SQLite for local development and PostgreSQL support for production. Alembic manages schema changes.

## Core administration tables

### `enquiries`
Customer submissions. Admin-only workflow fields include `status`, `assigned_to`, `internal_notes`, and `updated_at`.

### `admin_team_members`
Database-backed staff accounts and enquiry assignees.

Important fields: `id`, `name`, `email`, `phone`, `role`, `department`, `password_hash`, `is_super_admin`, `active`, `last_login_at`, `password_reset_requested_at`, `created_at`, `updated_at`.

Passwords are stored as PBKDF2-SHA256 hashes. Plain-text staff passwords are never stored in the table or returned by API responses.

### `site_visits`
Anonymous customer-page analytics used by Admin Overview.

Fields: `id`, `session_id`, `page_path`, `visited_at`. Admin routes are not stored. No visitor name, email, phone or IP address is collected by this feature.

### `admin_settings`
Non-secret workspace preferences such as project name, sales contacts, response target, timezone, customer-site URL and notification preference.

## Migration

Current head:

```text
c4f2a31b7d90
```

Apply with:

```bash
python -m alembic upgrade head
```

Local development also performs additive SQLite compatibility updates during backend startup when `AUTO_INIT_DB=true`.
