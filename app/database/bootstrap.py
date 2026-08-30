import logging

from sqlalchemy import select

from app.database.base import Base
from app.database.models import Amenity, LocationPoint, Residence, SmartFeature
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
        _seed_if_missing(db, Amenity, AMENITIES)
        _seed_if_missing(db, SmartFeature, SMART_FEATURES)
        _seed_if_missing(db, LocationPoint, LOCATION_POINTS)
        db.commit()
    logger.info("Development database is ready")
