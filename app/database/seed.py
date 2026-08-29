from sqlalchemy import select

from app.database.models import Residence
from app.database.session import SessionLocal


RESIDENCES = [
    {
        "slug": "2-bedroom",
        "name": "2 Bedroom Residence",
        "type": "2 Bedroom",
        "bedrooms": 2,
        "display_order": 1,
        "status": "active",
    },
    {
        "slug": "3-bedroom",
        "name": "3 Bedroom Residence",
        "type": "3 Bedroom",
        "bedrooms": 3,
        "display_order": 2,
        "status": "active",
    },
    {
        "slug": "penthouse",
        "name": "Penthouse",
        "type": "Penthouse",
        "bedrooms": None,
        "display_order": 3,
        "status": "active",
    },
]


def seed_residences():
    db = SessionLocal()

    try:
        for item in RESIDENCES:
            existing = db.scalar(
                select(Residence).where(Residence.slug == item["slug"])
            )

            if existing is None:
                db.add(Residence(**item))

        db.commit()
        print("Residence seed completed successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_residences()