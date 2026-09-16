from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


def new_id() -> str:
    return str(uuid4())


class Residence(Base):
    __tablename__ = "residences"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    type: Mapped[str] = mapped_column(String(100), nullable=False)
    bedrooms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    size_m2: Mapped[float | None] = mapped_column(Float, nullable=True)
    short_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    long_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    features: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="active", nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    cover_image: Mapped[str | None] = mapped_column(Text, nullable=True)

    media: Mapped[list["ResidenceMedia"]] = relationship(
        back_populates="residence",
        cascade="all, delete-orphan",
    )

    floor_plans: Mapped[list["FloorPlan"]] = relationship(
        back_populates="residence",
        cascade="all, delete-orphan",
    )


class ResidenceMedia(Base):
    __tablename__ = "residence_media"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    residence_id: Mapped[str] = mapped_column(
        ForeignKey("residences.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    media_type: Mapped[str] = mapped_column(String(20), nullable=False)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    alt_text: Mapped[str] = mapped_column(String(255), nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    residence: Mapped["Residence"] = relationship(back_populates="media")


class FloorPlan(Base):
    __tablename__ = "floor_plans"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    residence_id: Mapped[str] = mapped_column(
        ForeignKey("residences.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    plan_name: Mapped[str] = mapped_column(String(150), nullable=False)
    file_url: Mapped[str] = mapped_column(Text, nullable=False)
    preview_image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    hotspot_metadata: Mapped[dict | list | None] = mapped_column(JSON, nullable=True)

    residence: Mapped["Residence"] = relationship(back_populates="floor_plans")


class Amenity(Base):
    __tablename__ = "amenities"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class SmartFeature(Base):
    __tablename__ = "smart_features"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    benefit_statement: Mapped[str] = mapped_column(Text, nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class LocationPoint(Base):
    __tablename__ = "location_points"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    distance_or_travel_note: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    map_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Enquiry(Base):
    __tablename__ = "enquiries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    reference_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(254), nullable=True, index=True)
    residence_interest: Mapped[str | None] = mapped_column(String(120), nullable=True)
    enquiry_type: Mapped[str] = mapped_column(String(50), nullable=False)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    consent: Mapped[bool] = mapped_column(Boolean, nullable=False)
    source: Mapped[str] = mapped_column(String(100), default="website", nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="new", nullable=False)
    assigned_to: Mapped[str | None] = mapped_column(String(36), nullable=True, index=True)
    internal_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True,
    )


Index(
    "ix_enquiries_duplicate_lookup",
    Enquiry.phone,
    Enquiry.residence_interest,
    Enquiry.created_at,
)

class AdminTeamMember(Base):
    __tablename__ = "admin_team_members"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False, unique=True, index=True)
    phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    role: Mapped[str] = mapped_column(String(80), nullable=False, default="Sales manager")
    department: Mapped[str | None] = mapped_column(String(100), nullable=True)
    password_hash: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_super_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    password_reset_requested_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )


class SiteVisit(Base):
    __tablename__ = "site_visits"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    session_id: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    page_path: Mapped[str] = mapped_column(String(220), nullable=False, index=True)
    visited_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )


class AdminSetting(Base):
    __tablename__ = "admin_settings"

    key: Mapped[str] = mapped_column(String(120), primary_key=True)
    value: Mapped[dict | list | str | int | float | bool | None] = mapped_column(JSON, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
