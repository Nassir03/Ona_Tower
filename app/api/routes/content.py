from fastapi import APIRouter, Depends

from app.repositories.base import BackendRepository
from app.repositories.dependencies import get_repository
from app.schemas.content import Amenity, LocationPoint, SmartFeature

router = APIRouter(tags=["Content"])


@router.get("/amenities", response_model=list[Amenity])
async def list_amenities(repository: BackendRepository = Depends(get_repository)):
    return await repository.list_amenities()


@router.get("/smart-features", response_model=list[SmartFeature])
async def list_smart_features(repository: BackendRepository = Depends(get_repository)):
    return await repository.list_smart_features()


@router.get("/location-points", response_model=list[LocationPoint])
async def list_location_points(repository: BackendRepository = Depends(get_repository)):
    return await repository.list_location_points()
