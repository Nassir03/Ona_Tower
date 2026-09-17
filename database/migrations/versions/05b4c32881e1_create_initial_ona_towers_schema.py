"""create initial ona towers schema

Revision ID: 05b4c32881e1
Revises:
Create Date: 2026-08-29 06:16:22.072430

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "05b4c32881e1"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "amenities",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_amenities_category"),
        "amenities",
        ["category"],
        unique=False,
    )

    op.create_table(
        "enquiries",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("reference_number", sa.String(length=50), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("phone", sa.String(length=30), nullable=False),
        sa.Column("email", sa.String(length=254), nullable=True),
        sa.Column("residence_interest", sa.String(length=120), nullable=True),
        sa.Column("enquiry_type", sa.String(length=50), nullable=False),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("consent", sa.Boolean(), nullable=False),
        sa.Column("source", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_enquiries_created_at"),
        "enquiries",
        ["created_at"],
        unique=False,
    )
    op.create_index(
        "ix_enquiries_duplicate_lookup",
        "enquiries",
        ["phone", "residence_interest", "created_at"],
        unique=False,
    )
    op.create_index(
        op.f("ix_enquiries_email"),
        "enquiries",
        ["email"],
        unique=False,
    )
    op.create_index(
        op.f("ix_enquiries_phone"),
        "enquiries",
        ["phone"],
        unique=False,
    )
    op.create_index(
        op.f("ix_enquiries_reference_number"),
        "enquiries",
        ["reference_number"],
        unique=True,
    )

    op.create_table(
        "location_points",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column(
            "distance_or_travel_note",
            sa.String(length=255),
            nullable=True,
        ),
        sa.Column("latitude", sa.Float(), nullable=True),
        sa.Column("longitude", sa.Float(), nullable=True),
        sa.Column("map_url", sa.Text(), nullable=True),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_location_points_category"),
        "location_points",
        ["category"],
        unique=False,
    )

    op.create_table(
        "residences",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("type", sa.String(length=100), nullable=False),
        sa.Column("bedrooms", sa.Integer(), nullable=True),
        sa.Column("size_m2", sa.Float(), nullable=True),
        sa.Column("short_description", sa.Text(), nullable=True),
        sa.Column("long_description", sa.Text(), nullable=True),
        sa.Column("features", sa.JSON(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.Column("cover_image", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_residences_slug"),
        "residences",
        ["slug"],
        unique=True,
    )

    op.create_table(
        "smart_features",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("benefit_statement", sa.Text(), nullable=False),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "floor_plans",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("residence_id", sa.String(length=36), nullable=False),
        sa.Column("plan_name", sa.String(length=150), nullable=False),
        sa.Column("file_url", sa.Text(), nullable=False),
        sa.Column("preview_image_url", sa.Text(), nullable=True),
        sa.Column("hotspot_metadata", sa.JSON(), nullable=True),
        sa.ForeignKeyConstraint(
            ["residence_id"],
            ["residences.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_floor_plans_residence_id"),
        "floor_plans",
        ["residence_id"],
        unique=False,
    )

    op.create_table(
        "residence_media",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("residence_id", sa.String(length=36), nullable=False),
        sa.Column("media_type", sa.String(length=20), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("alt_text", sa.String(length=255), nullable=False),
        sa.Column("display_order", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["residence_id"],
            ["residences.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_residence_media_residence_id"),
        "residence_media",
        ["residence_id"],
        unique=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_index(
        op.f("ix_residence_media_residence_id"),
        table_name="residence_media",
    )
    op.drop_table("residence_media")

    op.drop_index(
        op.f("ix_floor_plans_residence_id"),
        table_name="floor_plans",
    )
    op.drop_table("floor_plans")

    op.drop_table("smart_features")

    op.drop_index(
        op.f("ix_residences_slug"),
        table_name="residences",
    )
    op.drop_table("residences")

    op.drop_index(
        op.f("ix_location_points_category"),
        table_name="location_points",
    )
    op.drop_table("location_points")

    op.drop_index(
        op.f("ix_enquiries_reference_number"),
        table_name="enquiries",
    )
    op.drop_index(
        op.f("ix_enquiries_phone"),
        table_name="enquiries",
    )
    op.drop_index(
        op.f("ix_enquiries_email"),
        table_name="enquiries",
    )
    op.drop_index(
        "ix_enquiries_duplicate_lookup",
        table_name="enquiries",
    )
    op.drop_index(
        op.f("ix_enquiries_created_at"),
        table_name="enquiries",
    )
    op.drop_table("enquiries")

    op.drop_index(
        op.f("ix_amenities_category"),
        table_name="amenities",
    )
    op.drop_table("amenities")