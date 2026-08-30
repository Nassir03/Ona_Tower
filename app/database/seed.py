from app.database.bootstrap import initialize_database


def seed_database() -> None:
    initialize_database()
    print("ONA Towers database seed completed successfully.")


if __name__ == "__main__":
    seed_database()
