# ONA Towers Backend API Contract

Development backend: `http://127.0.0.1:8400`  
API prefix: `/api`

## Health

### `GET /health`
Returns application liveness.

### `GET /health/database`
Verifies that the configured SQL database can execute a query.

## Residences

### `GET /api/residences`
Returns active residence typologies.

### `GET /api/residences/{slug}`
Returns a single residence and any associated media/floor-plan metadata.

Initial development slugs:

- `2-bedroom`
- `3-bedroom`
- `penthouse-3bed`
- `penthouse-4bed`

## Centrally managed content

- `GET /api/amenities`
- `GET /api/smart-features`
- `GET /api/location-points`

The local development database is automatically seeded with baseline verified content.

## Enquiries

### `POST /api/enquiries`

Request:

```json
{
  "name": "Amina Hassan",
  "phone": "+255 777 123 456",
  "email": "amina@example.com",
  "residence_interest": "2-bedroom",
  "enquiry_type": "request_floor_plans",
  "message": "Please send me the floor plans.",
  "consent": true,
  "source": "website",
  "company_website": ""
}
```

`company_website` is the anti-bot honeypot and must remain blank in the real frontend.

Allowed `enquiry_type` values:

- `enquire_about_residence`
- `request_floor_plans`
- `schedule_viewing`
- `talk_to_sales`
- `general`

Success:

```json
{
  "success": true,
  "reference_number": "ONA-20260830-ABC123",
  "message": "Thank you. Your enquiry has been received."
}
```

## Standard error shape

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request contains invalid data.",
    "request_id": "...",
    "details": []
  }
}
```

## Database integration

API routes depend on `BackendRepository`. The active provider creates a request-scoped `SQLAlchemyRepository`, which works with the database selected by `DATABASE_URL`: SQLite for the default local setup, or PostgreSQL for production/deployment.
