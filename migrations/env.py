from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import inspect
from sqlalchemy import pool
from sqlalchemy import text

from alembic import context

from app.core.config import get_settings
from app.database.base import Base
from app.database import models


# Alembic Config object
config = context.config

# Load DATABASE_URL from project settings
settings = get_settings()
config.set_main_option("sqlalchemy.url", settings.database_url.replace("%", "%%"),)

# Configure Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata used by Alembic for autogenerate
target_metadata = Base.metadata
INITIAL_REVISION = "05b4c32881e1"
HEAD_REVISION = "9b6a7f0f3e12"
INITIAL_TABLES = {
    "amenities",
    "enquiries",
    "floor_plans",
    "location_points",
    "residence_media",
    "residences",
    "smart_features",
}
ADMIN_TABLES = {"admin_settings", "admin_team_members"}
ADMIN_ENQUIRY_COLUMNS = {"assigned_to", "internal_notes", "updated_at"}


def stamp_existing_sqlite_schema(connection) -> None:
    """Mark legacy local SQLite schemas that were created before Alembic.

    Earlier local setup could create tables via SQLAlchemy bootstrap without
    writing an Alembic version. Running `alembic upgrade head` against that
    database should preserve data and continue from the matching revision.
    """
    if connection.dialect.name != "sqlite":
        return

    inspector = inspect(connection)
    tables = set(inspector.get_table_names())
    if not INITIAL_TABLES.issubset(tables):
        return

    connection.execute(
        text("CREATE TABLE IF NOT EXISTS alembic_version (version_num VARCHAR(32) NOT NULL)")
    )
    existing_version = connection.execute(text("SELECT version_num FROM alembic_version LIMIT 1")).scalar()
    if existing_version:
        return

    enquiry_columns = {column["name"] for column in inspector.get_columns("enquiries")}
    revision = (
        HEAD_REVISION
        if ADMIN_TABLES.issubset(tables) and ADMIN_ENQUIRY_COLUMNS.issubset(enquiry_columns)
        else INITIAL_REVISION
    )
    connection.execute(
        text("INSERT INTO alembic_version (version_num) VALUES (:revision)"),
        {"revision": revision},
    )
    connection.commit()


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in online mode."""

    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        stamp_existing_sqlite_schema(connection)
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
