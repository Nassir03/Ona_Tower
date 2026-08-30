from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database.session import get_db_session

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health():
    """Lightweight application liveness check."""
    return {"status": "ok", "service": "ona-towers-api"}


@router.get("/health/database")
async def database_health(db: Session = Depends(get_db_session)):
    """Verify that the application can execute a query through SQLAlchemy."""
    try:
        db.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable",
        ) from exc

    return {
        "status": "ok",
        "service": "ona-towers-api",
        "database": "connected",
    }
