import logging

from sqlalchemy import select

from app.database.base import Base
from app.database.models import Amenity, FloorPlan, LocationPoint, Residence, ResidenceMedia, SmartFeature
from app.database.session import SessionLocal, engine

logger = logging.getLogger(__name__)

RESIDENCES = [
    {
        "slug": "2-bedroom",
        "name": "02 Bedroom Residence",
        "type": "2 Bedroom",
        "bedrooms": 2,
        "size_m2": 203,
        "short_description": "Two-bedroom residence shown in the supplied project drawing.",
        "features": ["2 bedrooms", "Approx. 203 sqm", "2 units per typical residential floor"],
        "display_order": 1,
        "status": "active",
        "cover_image": "/ona-assets/residences/two-bedroom-plan-approx-203sqm.png",
    },
    {
        "slug": "3-bedroom",
        "name": "03 Bedroom Residence",
        "type": "3 Bedroom",
        "bedrooms": 3,
        "size_m2": 236,
        "short_description": "Three-bedroom residence shown in the supplied project drawing.",
        "features": ["3 bedrooms", "Approx. 236 sqm", "2 units per typical residential floor"],
        "display_order": 2,
        "status": "active",
        "cover_image": "/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg",
    },
    {
        "slug": "penthouse-3bed",
        "name": "03 Bedroom Signature Penthouse",
        "type": "Penthouse",
        "bedrooms": 3,
        "size_m2": 416,
        "short_description": "Three-bedroom residence on the penthouse level.",
        "features": ["3 bedrooms", "Approx. 416 sqm", "Penthouse level"],
        "display_order": 3,
        "status": "active",
        "cover_image": "/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg",
    },
    {
        "slug": "penthouse-4bed",
        "name": "04 Bedroom Signature Penthouse",
        "type": "Penthouse",
        "bedrooms": 4,
        "size_m2": 482,
        "short_description": "Four-bedroom residence on the penthouse level.",
        "features": ["4 bedrooms", "Approx. 482 sqm", "Penthouse level"],
        "display_order": 4,
        "status": "active",
        "cover_image": "/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png",
    },
]

FLOOR_PLANS = [
    {
        "residence_slug": "2-bedroom",
        "plan_name": "02 Bedroom Residence Plan",
        "file_url": "/ona-assets/residences/two-bedroom-plan-approx-203sqm.png",
        "preview_image_url": "/ona-assets/residences/two-bedroom-plan-approx-203sqm.png",
    },
    {
        "residence_slug": "3-bedroom",
        "plan_name": "03 Bedroom Residence Plan",
        "file_url": "/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg",
        "preview_image_url": "/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg",
    },
    {
        "residence_slug": "penthouse-3bed",
        "plan_name": "03 Bedroom Signature Penthouse Plan",
        "file_url": "/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg",
        "preview_image_url": "/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg",
    },
    {
        "residence_slug": "penthouse-4bed",
        "plan_name": "04 Bedroom Signature Penthouse Plan",
        "file_url": "/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png",
        "preview_image_url": "/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png",
    },
]

RESIDENCE_MEDIA = [
    {
        "residence_slug": "2-bedroom",
        "media_type": "image",
        "url": "/ona-assets/residences/two-bedroom-plan-approx-203sqm.png",
        "alt_text": "Two-bedroom residence project drawing",
        "display_order": 1,
    },
    {
        "residence_slug": "3-bedroom",
        "media_type": "image",
        "url": "/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg",
        "alt_text": "Three-bedroom residence project drawing",
        "display_order": 1,
    },
    {
        "residence_slug": "penthouse-3bed",
        "media_type": "image",
        "url": "/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg",
        "alt_text": "Three-bedroom signature penthouse project drawing",
        "display_order": 1,
    },
    {
        "residence_slug": "penthouse-4bed",
        "media_type": "image",
        "url": "/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png",
        "alt_text": "Four-bedroom signature penthouse project drawing",
        "display_order": 1,
    },
]

AMENITIES = [
    {"name": "Pool", "category": "Lifestyle", "description": "Pool on the terrace / lifestyle level.", "display_order": 1},
    {"name": "Restaurant & Outdoor Dining", "category": "Lifestyle", "description": "Restaurant and outdoor restaurant on the terrace / lifestyle level.", "display_order": 2},
    {"name": "Gym", "category": "Lifestyle", "description": "Gym on the terrace / lifestyle level.", "display_order": 3},
    {"name": "Coffee & Work Area", "category": "Commercial", "description": "Coffee / work area on the ground floor.", "display_order": 4},
    {"name": "Supermarket", "category": "Commercial", "description": "Supermarket on the ground floor.", "display_order": 5},
]

SMART_FEATURES = [
    {"name": "Integrated mixed-use living", "benefit_statement": "Residences, lifestyle facilities and commercial functions are brought together within one development.", "display_order": 1},
]

LOCATION_POINTS = [
    {"name": "Zanzibar", "category": "Location", "distance_or_travel_note": "ONA Towers development location", "display_order": 1},
]


def _seed_if_missing(db, model, rows, key: str = "name") -> None:
    for row in rows:
        value = row[key]
        if db.scalar(select(model).where(getattr(model, key) == value)) is None:
            db.add(model(**row))


def initialize_database() -> None:
    """Create the development schema and seed verified baseline content if needed."""
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        _seed_if_missing(db, Residence, RESIDENCES, key="slug")
        db.flush()

        for row in FLOOR_PLANS:
            residence = db.scalar(select(Residence).where(Residence.slug == row["residence_slug"]))
            if residence is None:
                continue
            existing = db.scalar(
                select(FloorPlan).where(
                    FloorPlan.residence_id == residence.id,
                    FloorPlan.plan_name == row["plan_name"],
                )
            )
            if existing is None:
                db.add(
                    FloorPlan(
                        residence_id=residence.id,
                        plan_name=row["plan_name"],
                        file_url=row["file_url"],
                        preview_image_url=row["preview_image_url"],
                    )
                )

        for row in RESIDENCE_MEDIA:
            residence = db.scalar(select(Residence).where(Residence.slug == row["residence_slug"]))
            if residence is None:
                continue
            existing = db.scalar(
                select(ResidenceMedia).where(
                    ResidenceMedia.residence_id == residence.id,
                    ResidenceMedia.url == row["url"],
                )
            )
            if existing is None:
                db.add(
                    ResidenceMedia(
                        residence_id=residence.id,
                        media_type=row["media_type"],
                        url=row["url"],
                        alt_text=row["alt_text"],
                        display_order=row["display_order"],
                    )
                )

        _seed_if_missing(db, Amenity, AMENITIES)
        _seed_if_missing(db, SmartFeature, SMART_FEATURES)
        _seed_if_missing(db, LocationPoint, LOCATION_POINTS)
        db.commit()
    logger.info("Development database is ready")
