"""add admin workspace

Revision ID: 9b6a7f0f3e12
Revises: 05b4c32881e1
Create Date: 2026-09-15 20:30:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "9b6a7f0f3e12"
down_revision: Union[str, Sequence[str], None] = "05b4c32881e1"
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
    """Create the admin workspace without duplicating bootstrap-created schema."""
    tables = _table_names()

    if "enquiries" in tables:
        columns = _column_names("enquiries")
        if "assigned_to" not in columns:
            op.add_column("enquiries", sa.Column("assigned_to", sa.String(length=36), nullable=True))
        if "internal_notes" not in columns:
            op.add_column("enquiries", sa.Column("internal_notes", sa.Text(), nullable=True))
        if "updated_at" not in columns:
            op.add_column("enquiries", sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True))

        if op.f("ix_enquiries_assigned_to") not in _index_names("enquiries"):
            op.create_index(op.f("ix_enquiries_assigned_to"), "enquiries", ["assigned_to"], unique=False)

    tables = _table_names()
    if "admin_team_members" not in tables:
        op.create_table(
            "admin_team_members",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("name", sa.String(length=120), nullable=False),
            sa.Column("email", sa.String(length=254), nullable=False),
            sa.Column("phone", sa.String(length=30), nullable=True),
            sa.Column("role", sa.String(length=80), nullable=False),
            sa.Column("active", sa.Boolean(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )

    if op.f("ix_admin_team_members_email") not in _index_names("admin_team_members"):
        op.create_index(
            op.f("ix_admin_team_members_email"),
            "admin_team_members",
            ["email"],
            unique=True,
        )

    if "admin_settings" not in _table_names():
        op.create_table(
            "admin_settings",
            sa.Column("key", sa.String(length=120), nullable=False),
            sa.Column("value", sa.JSON(), nullable=True),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
            sa.PrimaryKeyConstraint("key"),
        )


def downgrade() -> None:
    tables = _table_names()
    if "admin_settings" in tables:
        op.drop_table("admin_settings")

    if "admin_team_members" in _table_names():
        index_name = op.f("ix_admin_team_members_email")
        if index_name in _index_names("admin_team_members"):
            op.drop_index(index_name, table_name="admin_team_members")
        op.drop_table("admin_team_members")

    if "enquiries" in _table_names():
        index_name = op.f("ix_enquiries_assigned_to")
        if index_name in _index_names("enquiries"):
            op.drop_index(index_name, table_name="enquiries")
        columns = _column_names("enquiries")
        for column_name in ("updated_at", "internal_notes", "assigned_to"):
            if column_name in columns:
                op.drop_column("enquiries", column_name)
                columns.remove(column_name)
