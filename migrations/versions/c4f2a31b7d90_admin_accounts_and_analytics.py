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


def upgrade() -> None:
    op.add_column("admin_team_members", sa.Column("department", sa.String(length=100), nullable=True))
    op.add_column("admin_team_members", sa.Column("password_hash", sa.Text(), nullable=True))
    op.add_column(
        "admin_team_members",
        sa.Column("is_super_admin", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column("admin_team_members", sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "admin_team_members",
        sa.Column("password_reset_requested_at", sa.DateTime(timezone=True), nullable=True),
    )

    op.create_table(
        "site_visits",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("session_id", sa.String(length=80), nullable=False),
        sa.Column("page_path", sa.String(length=220), nullable=False),
        sa.Column("visited_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_site_visits_session_id"), "site_visits", ["session_id"], unique=False)
    op.create_index(op.f("ix_site_visits_page_path"), "site_visits", ["page_path"], unique=False)
    op.create_index(op.f("ix_site_visits_visited_at"), "site_visits", ["visited_at"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_site_visits_visited_at"), table_name="site_visits")
    op.drop_index(op.f("ix_site_visits_page_path"), table_name="site_visits")
    op.drop_index(op.f("ix_site_visits_session_id"), table_name="site_visits")
    op.drop_table("site_visits")
    op.drop_column("admin_team_members", "password_reset_requested_at")
    op.drop_column("admin_team_members", "last_login_at")
    op.drop_column("admin_team_members", "is_super_admin")
    op.drop_column("admin_team_members", "password_hash")
    op.drop_column("admin_team_members", "department")
