from collections.abc import Generator

from app.database.session import SessionLocal
from app.repositories.base import BackendRepository
from app.repositories.postgres import PostgresRepository


def get_repository() -> Generator[BackendRepository, None, None]:
    """Provide a PostgreSQL repository with a request-scoped database session."""
    db = SessionLocal()

    try:
        yield PostgresRepository(db)
    finally:
        db.close()