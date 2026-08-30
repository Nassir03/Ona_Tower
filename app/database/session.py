from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import get_settings


settings = get_settings()

engine_options: dict = {
    "pool_pre_ping": True,
}

# SQLite is used only for isolated automated/integration tests. Allow FastAPI's
# TestClient worker thread to use the same in-memory database connection.
if settings.database_url.startswith("sqlite"):
    engine_options["connect_args"] = {"check_same_thread": False}
    if ":memory:" in settings.database_url:
        engine_options["poolclass"] = StaticPool

engine = create_engine(
    settings.database_url,
    **engine_options,
)

SessionLocal = sessionmaker(
    bind=engine,
    class_=Session,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


def get_db_session():
    """Provide a database session and ensure it is closed afterwards."""
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
