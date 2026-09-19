from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import NullPool, StaticPool

from app.core.config import Settings, get_settings


def build_engine_options(settings: Settings) -> dict:
    """Return SQLAlchemy engine options for the configured runtime."""
    options: dict = {
        "pool_pre_ping": True,
    }

    # SQLite is used for local development/tests. TestClient may use another
    # thread, so allow the same in-memory connection to be shared.
    if settings.database_url.startswith("sqlite"):
        options["connect_args"] = {"check_same_thread": False}
        if ":memory:" in settings.database_url:
            options["poolclass"] = StaticPool

    # Vercel is serverless. For Supabase's transaction pooler, prepared
    # statements must be disabled. NullPool prevents each warm serverless
    # instance from holding its own long-lived SQLAlchemy connection pool.
    elif settings.sqlalchemy_database_url.startswith("postgresql"):
        options["connect_args"] = {"prepare_threshold": None}
        if settings.app_env == "production" or ":6543/" in settings.sqlalchemy_database_url:
            options["poolclass"] = NullPool

    return options


settings = get_settings()
engine = create_engine(
    settings.sqlalchemy_database_url,
    **build_engine_options(settings),
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
