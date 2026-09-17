"""Vercel FastAPI entrypoint.

The application lives in app/main.py. Vercel can detect FastAPI directly, and
this entrypoint also provides the conventional api/index.py deployment path.
"""
from app.main import app

__all__ = ["app"]
