from pydantic import BaseModel


class Amenity(BaseModel):
    id: str
    name: str
    category: str
    description: str | None = None
    display_order: int = 0
    active: bool = True


class SmartFeature(BaseModel):
    id: str
    name: str
    benefit_statement: str
    display_order: int = 0


class LocationPoint(BaseModel):
    id: str
    name: str
    category: str
    distance_or_travel_note: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    map_url: str | None = None
    display_order: int = 0
