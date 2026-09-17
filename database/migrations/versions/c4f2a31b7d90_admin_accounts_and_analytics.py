"""admin accounts and website analytics

Revision ID: c4f2a31b7d90
Revises: 9b6a7f0f3e12
Create Date: 2026-09-16 11:30:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "c4f2a31b7d90"
down_revision: Union[str, Sequence[str], None] = "9b6a7f0f3e12"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _table_names() -> set[str]:
    return set(sa.inspect(op.get_bind()).get_table_names())


def _column_names(table_name: str) -> set[str]:
    inspector = sa.inspect(op.get_bind())
    if table_name not in inspector.get_table_names():
        return set()
    return {column["name"] for column in inspector.get_columns(table_name)}


def _index_names(table_name: str) -> set[str]:
    inspector = sa.inspect(op.get_bind())
    if table_name not in inspector.get_table_names():
        return set()
    return {index["name"] for index in inspector.get_indexes(table_name) if index.get("name")}


def upgrade() -> None:
    """Upgrade safely even when local bootstrap already added some schema.

    Older development versions used SQLAlchemy ``create_all`` plus additive
    SQLite compatibility helpers. That can leave the physical schema ahead of
    the Alembic version table. Every operation below therefore checks the
    database itself before changing it.
    """
    tables = _table_names()

    if "admin_team_members" in tables:
        columns = _column_names("admin_team_members")
        if "department" not in columns:
            op.add_column("admin_team_members", sa.Column("department", sa.String(length=100), nullable=True))
        if "password_hash" not in columns:
            op.add_column("admin_team_members", sa.Column("password_hash", sa.Text(), nullable=True))
        if "is_super_admin" not in columns:
            op.add_column(
                "admin_team_members",
                sa.Column("is_super_admin", sa.Boolean(), nullable=False, server_default=sa.false()),
            )
        if "last_login_at" not in columns:
            op.add_column(
                "admin_team_members",
                sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
            )
        if "password_reset_requested_at" not in columns:
            op.add_column(
                "admin_team_members",
                sa.Column("password_reset_requested_at", sa.DateTime(timezone=True), nullable=True),
            )

    tables = _table_names()
    if "site_visits" not in tables:
        op.create_table(
            "site_visits",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("session_id", sa.String(length=80), nullable=False),
            sa.Column("page_path", sa.String(length=220), nullable=False),
            sa.Column("visited_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )

    indexes = _index_names("site_visits")
    wanted_indexes = {
        op.f("ix_site_visits_session_id"): "session_id",
        op.f("ix_site_visits_page_path"): "page_path",
        op.f("ix_site_visits_visited_at"): "visited_at",
    }
    for index_name, column_name in wanted_indexes.items():
        if index_name not in indexes:
            op.create_index(index_name, "site_visits", [column_name], unique=False)


def downgrade() -> None:
    tables = _table_names()
    if "site_visits" in tables:
        indexes = _index_names("site_visits")
        for index_name in (
            op.f("ix_site_visits_visited_at"),
            op.f("ix_site_visits_page_path"),
            op.f("ix_site_visits_session_id"),
        ):
            if index_name in indexes:
                op.drop_index(index_name, table_name="site_visits")
        op.drop_table("site_visits")

    if "admin_team_members" in _table_names():
        columns = _column_names("admin_team_members")
        for column_name in (
            "password_reset_requested_at",
            "last_login_at",
            "is_super_admin",
            "password_hash",
            "department",
        ):
            if column_name in columns:
                op.drop_column("admin_team_members", column_name)
                columns.remove(column_name)
