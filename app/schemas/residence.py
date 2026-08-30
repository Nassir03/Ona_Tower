from pydantic import BaseModel, Field


class ResidenceMedia(BaseModel):
    id: str
    media_type: str = Field(pattern="^(image|video)$")
    url: str
    alt_text: str
    display_order: int = 0


class FloorPlan(BaseModel):
    id: str
    plan_name: str
    file_url: str
    preview_image_url: str | None = None
    hotspot_metadata: dict | list | None = None


class ResidenceSummary(BaseModel):
    id: str
    slug: str
    name: str
    type: str
    bedrooms: int | None = None
    size_m2: float | None = None
    short_description: str | None = None
    status: str = "active"
    display_order: int = 0
    cover_image: str | None = None


class ResidenceDetail(ResidenceSummary):
    long_description: str | None = None
    features: list[str] = Field(default_factory=list)
    media: list[ResidenceMedia] = Field(default_factory=list)
    floor_plans: list[FloorPlan] = Field(default_factory=list)
