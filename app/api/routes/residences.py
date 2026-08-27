from fastapi import APIRouter, Depends

from app.core.exceptions import NotFoundError
from app.repositories.base import BackendRepository
from app.repositories.dependencies import get_repository
from app.schemas.residence import ResidenceDetail, ResidenceSummary

router = APIRouter(prefix="/residences", tags=["Residences"])


@router.get("", response_model=list[ResidenceSummary])
async def list_residences(repository: BackendRepository = Depends(get_repository)):
    return await repository.list_residences()


@router.get("/{slug}", response_model=ResidenceDetail)
async def get_residence(slug: str, repository: BackendRepository = Depends(get_repository)):
    residence = await repository.get_residence_by_slug(slug)
    if residence is None:
        raise NotFoundError("Residence not found")
    return residence
