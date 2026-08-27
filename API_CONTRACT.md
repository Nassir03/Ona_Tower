# ONA Towers Backend API Contract

Base URL in development: `http://localhost:8400`
API prefix: `/api`

## Health

### GET /health
Returns backend availability.

## Residences

### GET /api/residences
Returns the residence types needed for cards/showcases.

### GET /api/residences/{slug}
Returns residence detail data, gallery metadata and floor-plan metadata when supplied by the database adapter.

Supported initial slugs in the development adapter:
- `2-bedroom`
- `3-bedroom`
- `penthouse`

## Optional centrally managed content

### GET /api/amenities
### GET /api/smart-features
### GET /api/location-points

These return empty arrays in the development adapter until approved data is supplied by the database/content team.

## Enquiries

### POST /api/enquiries

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

`company_website` is a honeypot field and must remain blank in the real frontend.

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
  "reference_number": "ONA-20260827-ABC123",
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

## Database integration boundary

The backend depends only on `app.repositories.base.BackendRepository`.
The database team should implement that interface and replace the provider in `app/repositories/dependencies.py`.

The backend deliberately contains no table definitions, migrations, SQL, ORM models or database credentials.
