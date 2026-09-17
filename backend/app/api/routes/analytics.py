from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.models import SiteVisit
from app.database.session import get_db_session
from app.schemas.analytics import SiteVisitCreate, SiteVisitResponse

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.post("/visit", response_model=SiteVisitResponse, status_code=201)
async def record_site_visit(
    payload: SiteVisitCreate,
    db: Session = Depends(get_db_session),
):
    # Admin routes are never part of customer-site analytics.
    if payload.page_path.startswith("/admin"):
        return SiteVisitResponse()

    db.add(SiteVisit(session_id=payload.session_id, page_path=payload.page_path))
    db.commit()
    return SiteVisitResponse()
