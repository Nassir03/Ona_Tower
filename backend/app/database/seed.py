from app.database.bootstrap import initialize_database


def seed_database() -> None:
    """Seed baseline data after Alembic has created/upgraded the schema."""
    initialize_database(create_schema=False)
    print("ONA Towers database seed completed successfully.")


if __name__ == "__main__":
    seed_database()
