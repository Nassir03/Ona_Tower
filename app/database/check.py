"""Command-line database readiness check.

Run with:
    python -m app.database.check
"""

from sqlalchemy import func, inspect, select, text

from app.database.models import Residence
from app.database.session import SessionLocal

REQUIRED_TABLES = {
    "residences",
    "residence_media",
    "floor_plans",
    "amenities",
    "smart_features",
    "location_points",
    "enquiries",
}


def main() -> int:
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
            bind = db.get_bind()
            existing_tables = set(inspect(bind).get_table_names())
            missing_tables = sorted(REQUIRED_TABLES - existing_tables)

            if missing_tables:
                print("Database connection: OK")
                print("Schema check: FAILED")
                print("Missing tables: " + ", ".join(missing_tables))
                print("Start the backend once (AUTO_INIT_DB=true) or run: alembic upgrade head")
                return 1

            residence_count = db.scalar(select(func.count()).select_from(Residence)) or 0

        print("Database connection: OK")
        print("Schema check: OK")
        print(f"Residence rows: {residence_count}")
        if residence_count == 0:
            print("Seed data: MISSING")
            print("Run: python -m app.database.seed")
            return 1

        print("Seed data: OK")
        print("Backend/database readiness: PASS")
        return 0

    except Exception as exc:
        print("Database connection: FAILED")
        print(f"Reason: {exc}")
        print("Check DATABASE_URL and confirm the configured database is available.")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
