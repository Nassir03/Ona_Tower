from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import get_settings


settings = get_settings()

engine_options: dict = {
    "pool_pre_ping": True,
}

# SQLite is used for local development/tests. TestClient may use another thread,
# so allow the same in-memory connection to be shared during the test suite.
if settings.database_url.startswith("sqlite"):
    engine_options["connect_args"] = {"check_same_thread": False}
    if ":memory:" in settings.database_url:
        engine_options["poolclass"] = StaticPool

# Vercel is serverless. Supabase recommends its transaction pooler for this
# deployment model. Disable psycopg prepared statements (unsupported by the
# transaction pooler) and cap the application-side pool to one warm-instance connection.
elif settings.sqlalchemy_database_url.startswith("postgresql"):
    engine_options["connect_args"] = {"prepare_threshold": None}
    if settings.app_env == "production" or ":6543/" in settings.sqlalchemy_database_url:
        # Supabase recommends a single application-side connection per warm
        # serverless instance when using its transaction pooler.
        engine_options.update({
            "pool_size": 1,
            "max_overflow": 0,
            "pool_timeout": 30,
            "pool_recycle": 300,
        })

engine = create_engine(
    settings.sqlalchemy_database_url,
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
