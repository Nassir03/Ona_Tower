# ONA Towers Database

## Overview

The ONA Towers backend uses SQLAlchemy for database access. Local development defaults to SQLite for zero-setup startup; PostgreSQL is supported and recommended for production. Alembic provides managed schema migrations.

The database layer supports residence information, residence media, floor plans, amenities, smart-living features, location points, and customer enquiries.

## Technology

- SQLite (default local development)
- PostgreSQL (production option)
- SQLAlchemy 2.0
- Alembic
- psycopg 3 for PostgreSQL

## Database Configuration

The application reads the database connection from the `DATABASE_URL` environment variable.

Local default:

```env
DATABASE_URL=sqlite+pysqlite:///./ona_towers.db
AUTO_INIT_DB=true
```

PostgreSQL example:

```env
DATABASE_URL=postgresql+psycopg://ona_user:ona_password@localhost:5432/ona_towers
AUTO_INIT_DB=false
```

Real passwords should be stored in a local .env file and must not be committed to Git.

Database Tables
residences

Stores the main residence types offered by ONA Towers.

Important fields:

id
slug
name
type
bedrooms
size_m2
short_description
long_description
features
status
display_order
cover_image
residence_media

Stores residence images and videos.

Relationship:

residence_media.residence_id -> residences.id
floor_plans

Stores floor-plan files, preview images, and optional structured hotspot metadata.

Relationship:

floor_plans.residence_id -> residences.id
amenities

Stores project amenities that may be managed dynamically.

Important fields:

id
name
category
description
display_order
active
smart_features

Stores smart-living features and their resident benefits.

Important fields:

id
name
benefit_statement
display_order
location_points

Stores nearby places, categories, travel notes, coordinates, and map links.

Important fields:

id
name
category
distance_or_travel_note
latitude
longitude
map_url
display_order
enquiries

Stores customer enquiries submitted through the website.

Important fields:

id
reference_number
name
phone
email
residence_interest
enquiry_type
message
consent
source
status
created_at
Relationships

The main database relationships are:

residences
   |
   |---- residence_media
   |
   |---- floor_plans

Residence media and floor plans belong to a residence through the residence_id foreign key.

Constraints and Indexes

The schema includes data-quality controls such as:

Unique residence slugs
Unique enquiry reference numbers
Foreign-key constraints for residence media and floor plans
Cascade deletion for residence-related media and floor plans
Indexes on frequently queried fields
Required fields where appropriate
Enquiry timestamps
Enquiry duplicate-check support

Important indexed fields include:

residences.slug
residence_media.residence_id
floor_plans.residence_id
enquiries.reference_number
enquiries.phone
enquiries.email
enquiries.created_at
Migrations

Alembic is used to manage versioned database schema changes.

Create a new migration:

alembic revision --autogenerate -m "migration description"

Apply all migrations:

alembic upgrade head

Check the current migration:

alembic current

The initial ONA Towers database schema migration is currently applied at the Alembic head revision.

Seed Data

Core residence reference data can be inserted using:

python -m app.database.seed

The seed process checks existing residence slugs before inserting records, helping prevent duplicate seed data.

Current core residence types:

2 Bedroom Residence
3 Bedroom Residence
Penthouse
Repository Architecture

The backend uses the BackendRepository interface so the API is not tightly coupled to a specific storage implementation.

The initial development implementation was:

InMemoryRepository

The persistent database implementation is:

SQLAlchemy repository

The request flow is:

Frontend
   |
   v
FastAPI
   |
   v
SQLAlchemy repository
   |
   v
SQLAlchemy
   |
   v
PostgreSQL

Each API request receives a database-backed repository with its own SQLAlchemy session.

The session is closed after the request is completed.

Residence Data Retrieval

The PostgreSQL repository supports:

GET /api/residences

This returns active residence summaries ordered by their display order.

It also supports:

GET /api/residences/{slug}

This returns detailed residence information, including associated media and floor-plan data.

Enquiry Persistence

Website enquiries are stored in the enquiries table.

The enquiry workflow supports:

Data validation
Sanitization
Consent storage
Reference-number generation
Residence-interest tracking
Source tracking
Status tracking
Creation timestamps
Duplicate-enquiry detection

A valid enquiry is stored once and receives a unique reference number.

Duplicate Enquiry Protection

Recent duplicate enquiries are checked using:

Phone number or email
Residence interest
Configured duplicate time window

The current application configuration uses a duplicate enquiry window of 120 seconds.

Testing confirmed that when the same enquiry is submitted twice within this period, only the first valid submission is stored.

Testing

Run the backend test suite using:

python -m pytest -v

Current backend tests cover:

Health endpoint
Residence endpoints
Enquiry validation and submission behavior

Database integration was also manually verified for:

PostgreSQL connectivity
Alembic migration status
Residence seed data
Residence API retrieval
Enquiry persistence
Duplicate-enquiry prevention
Backup

A PostgreSQL database backup can be created using:

pg_dump -U ona_user -h localhost -d ona_towers -F c -f ona_towers_backup.dump

For systems where pg_dump is not available in the system PATH, the full PostgreSQL executable path can be used.

Example on Windows:

& "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -U ona_user -h localhost -d ona_towers -F c -f ona_towers_backup.dump
Restore

A PostgreSQL backup can be restored using:

pg_restore -U ona_user -h localhost -d ona_towers --clean ona_towers_backup.dump

Example on Windows:

& "C:\Program Files\PostgreSQL\18\bin\pg_restore.exe" -U ona_user -h localhost -d ona_towers --clean ona_towers_backup.dump

Backups should be stored securely and must not expose production credentials.

Access and Security Notes
Real database credentials must be stored in .env.
.env must not be committed to Git.
.env.example should contain only safe example values.
Production database passwords must be different from local development credentials.
Database access should be restricted to authorized services and team members.
Application access to PostgreSQL should use the dedicated application database user rather than the PostgreSQL superuser.
Local Development Setup

The local development database used during implementation is:

Database: ona_towers
Database user: ona_user
Host: localhost
Port: 5432

SQLite requires no database password. When PostgreSQL is selected, configure its credentials through DATABASE_URL before running the backend.

Final Database Handover

The database handover includes:

PostgreSQL relational database
SQLAlchemy models
Versioned Alembic migrations
Residence seed data
PostgreSQL repository adapter
Enquiry persistence
Duplicate-enquiry protection
Foreign-key relationships
Constraints and indexes
Database configuration support
Backup and restore instructions
Database documentation