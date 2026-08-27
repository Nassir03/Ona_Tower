from abc import ABC, abstractmethod
from datetime import datetime

from app.schemas.content import Amenity, LocationPoint, SmartFeature
from app.schemas.enquiry import EnquiryCreate, EnquiryRecord
from app.schemas.residence import ResidenceDetail, ResidenceSummary


class BackendRepository(ABC):
    """Backend-to-database contract.

    The database owner should implement this interface with the real database layer.
    The backend does not define tables, migrations, SQLAlchemy models, or database credentials.
    """

    @abstractmethod
    async def list_residences(self) -> list[ResidenceSummary]: ...

    @abstractmethod
    async def get_residence_by_slug(self, slug: str) -> ResidenceDetail | None: ...

    @abstractmethod
    async def list_amenities(self) -> list[Amenity]: ...

    @abstractmethod
    async def list_smart_features(self) -> list[SmartFeature]: ...

    @abstractmethod
    async def list_location_points(self) -> list[LocationPoint]: ...

    @abstractmethod
    async def create_enquiry(self, enquiry: EnquiryCreate, *, reference_number: str) -> EnquiryRecord: ...

    @abstractmethod
    async def has_recent_duplicate_enquiry(
        self,
        *,
        email: str | None,
        phone: str,
        residence_interest: str | None,
        since: datetime,
    ) -> bool: ...
