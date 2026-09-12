"""Vercel serverless entrypoint for the FastAPI backend.

Local development still imports and runs app.main directly. On Vercel, this
module gives the Python runtime a stable API function while keeping the same
FastAPI application object.
"""

from __future__ import annotations

import os
import tempfile
from pathlib import Path


if os.environ.get("VERCEL"):
    fallback_db = Path(tempfile.gettempdir()) / "ona_towers.db"
    os.environ.setdefault("APP_ENV", "production")
    os.environ.setdefault("APP_DEBUG", "false")
    os.environ.setdefault("AUTO_INIT_DB", "true")
    os.environ.setdefault("DATABASE_URL", f"sqlite+pysqlite:///{fallback_db.as_posix()}")


from app.main import app  # noqa: E402
