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


def upgrade() -> None:
    op.add_column("enquiries", sa.Column("assigned_to", sa.String(length=36), nullable=True))
    op.add_column("enquiries", sa.Column("internal_notes", sa.Text(), nullable=True))
    op.add_column("enquiries", sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True))
    op.create_index(op.f("ix_enquiries_assigned_to"), "enquiries", ["assigned_to"], unique=False)

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
    op.create_index(
        op.f("ix_admin_team_members_email"),
        "admin_team_members",
        ["email"],
        unique=True,
    )

    op.create_table(
        "admin_settings",
        sa.Column("key", sa.String(length=120), nullable=False),
        sa.Column("value", sa.JSON(), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("key"),
    )


def downgrade() -> None:
    op.drop_table("admin_settings")
    op.drop_index(op.f("ix_admin_team_members_email"), table_name="admin_team_members")
    op.drop_table("admin_team_members")
    op.drop_index(op.f("ix_enquiries_assigned_to"), table_name="enquiries")
    op.drop_column("enquiries", "updated_at")
    op.drop_column("enquiries", "internal_notes")
    op.drop_column("enquiries", "assigned_to")
