from datetime import datetime

from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload

from app.database.models import (
    Amenity as AmenityModel,
    Enquiry as EnquiryModel,
    LocationPoint as LocationPointModel,
    Residence as ResidenceModel,
    SmartFeature as SmartFeatureModel,
)
from app.repositories.base import BackendRepository
from app.schemas.content import Amenity, LocationPoint, SmartFeature
from app.schemas.enquiry import EnquiryCreate, EnquiryRecord
from app.schemas.residence import (
    FloorPlan,
    ResidenceDetail,
    ResidenceMedia,
    ResidenceSummary,
)


class PostgresRepository(BackendRepository):
    """PostgreSQL-backed implementation of the backend repository contract."""

    def __init__(self, db: Session):
        self.db = db

    async def list_residences(self) -> list[ResidenceSummary]:
        stmt = (
            select(ResidenceModel)
            .where(ResidenceModel.status == "active")
            .order_by(ResidenceModel.display_order)
        )

        rows = self.db.scalars(stmt).all()

        return [
            ResidenceSummary(
                id=row.id,
                slug=row.slug,
                name=row.name,
                type=row.type,
                bedrooms=row.bedrooms,
                size_m2=row.size_m2,
                short_description=row.short_description,
                status=row.status,
                display_order=row.display_order,
                cover_image=row.cover_image,
            )
            for row in rows
        ]

    async def get_residence_by_slug(
        self,
        slug: str,
    ) -> ResidenceDetail | None:
        stmt = (
            select(ResidenceModel)
            .options(
                selectinload(ResidenceModel.media),
                selectinload(ResidenceModel.floor_plans),
            )
            .where(ResidenceModel.slug == slug)
        )

        row = self.db.scalar(stmt)

        if row is None:
            return None

        return ResidenceDetail(
            id=row.id,
            slug=row.slug,
            name=row.name,
            type=row.type,
            bedrooms=row.bedrooms,
            size_m2=row.size_m2,
            short_description=row.short_description,
            long_description=row.long_description,
            features=row.features or [],
            status=row.status,
            display_order=row.display_order,
            cover_image=row.cover_image,
            media=[
                ResidenceMedia(
                    id=item.id,
                    media_type=item.media_type,
                    url=item.url,
                    alt_text=item.alt_text,
                    display_order=item.display_order,
                )
                for item in sorted(
                    row.media,
                    key=lambda item: item.display_order,
                )
            ],
            floor_plans=[
                FloorPlan(
                    id=item.id,
                    plan_name=item.plan_name,
                    file_url=item.file_url,
                    preview_image_url=item.preview_image_url,
                    hotspot_metadata=item.hotspot_metadata,
                )
                for item in row.floor_plans
            ],
        )

    async def list_amenities(self) -> list[Amenity]:
        stmt = (
            select(AmenityModel)
            .where(AmenityModel.active.is_(True))
            .order_by(AmenityModel.display_order)
        )

        rows = self.db.scalars(stmt).all()

        return [
            Amenity(
                id=row.id,
                name=row.name,
                category=row.category,
                description=row.description,
                display_order=row.display_order,
                active=row.active,
            )
            for row in rows
        ]

    async def list_smart_features(self) -> list[SmartFeature]:
        stmt = select(SmartFeatureModel).order_by(
            SmartFeatureModel.display_order
        )

        rows = self.db.scalars(stmt).all()

        return [
            SmartFeature(
                id=row.id,
                name=row.name,
                benefit_statement=row.benefit_statement,
                display_order=row.display_order,
            )
            for row in rows
        ]

    async def list_location_points(self) -> list[LocationPoint]:
        stmt = select(LocationPointModel).order_by(
            LocationPointModel.display_order
        )

        rows = self.db.scalars(stmt).all()

        return [
            LocationPoint(
                id=row.id,
                name=row.name,
                category=row.category,
                distance_or_travel_note=row.distance_or_travel_note,
                latitude=row.latitude,
                longitude=row.longitude,
                map_url=row.map_url,
                display_order=row.display_order,
            )
            for row in rows
        ]

    async def create_enquiry(
        self,
        enquiry: EnquiryCreate,
        *,
        reference_number: str,
    ) -> EnquiryRecord:
        record = EnquiryModel(
            reference_number=reference_number,
            name=enquiry.name,
            phone=enquiry.phone,
            email=str(enquiry.email) if enquiry.email else None,
            residence_interest=enquiry.residence_interest,
            enquiry_type=enquiry.enquiry_type.value,
            message=enquiry.message,
            consent=enquiry.consent,
            source=enquiry.source,
            status="new",
        )

        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)

        return EnquiryRecord(
            id=record.id,
            reference_number=record.reference_number,
            name=record.name,
            phone=record.phone,
            email=record.email,
            residence_interest=record.residence_interest,
            enquiry_type=record.enquiry_type,
            message=record.message,
            consent=record.consent,
            source=record.source,
            status=record.status,
            created_at=record.created_at,
        )

    async def has_recent_duplicate_enquiry(
        self,
        *,
        email: str | None,
        phone: str,
        residence_interest: str | None,
        since: datetime,
    ) -> bool:
        contact_conditions = [
            EnquiryModel.phone == phone,
        ]

        if email:
            contact_conditions.append(
                EnquiryModel.email.ilike(email)
            )

        stmt = (
            select(EnquiryModel.id)
            .where(
                or_(*contact_conditions),
                EnquiryModel.residence_interest == residence_interest,
                EnquiryModel.created_at >= since,
            )
            .limit(1)
        )

        return self.db.scalar(stmt) is not None