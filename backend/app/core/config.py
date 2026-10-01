from functools import lru_cache
from pathlib import Path
from typing import Literal
import json
import os

from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BACKEND_DIR.parent


def normalize_database_url(url: str | None) -> str:
    """Normalize database URLs for local, Supabase, and Vercel runtimes.

    Supabase recommends SSL for Postgres connections. Production should not
    become unavailable just because ``sslmode=require`` was omitted from the
    dashboard value, so we add it automatically for Supabase URLs.
    """
    value = (url or "").strip()
    if not value:
        return ""

    if value.startswith("sqlite+pysqlite:///./"):
        relative_path = value[len("sqlite+pysqlite:///./"):]
        return f"sqlite+pysqlite:///{(PROJECT_ROOT / relative_path).resolve().as_posix()}"

    if value.startswith("sqlite:///./"):
        relative_path = value[len("sqlite:///./"):]
        return f"sqlite+pysqlite:///{(PROJECT_ROOT / relative_path).resolve().as_posix()}"

    if value.startswith("postgres://"):
        value = "postgresql+psycopg://" + value[len("postgres://"):]
    elif value.startswith("postgresql://"):
        value = "postgresql+psycopg://" + value[len("postgresql://"):]
    elif value.startswith("postgresql+psycopg2://"):
        value = "postgresql+psycopg://" + value[len("postgresql+psycopg2://"):]

    lowered = value.lower()
    if value.startswith("postgresql+psycopg://") and "supabase" in lowered and "sslmode=" not in lowered:
        separator = "&" if "?" in value else "?"
        value = f"{value}{separator}sslmode=require"

    return value


class Settings(BaseSettings):
    app_name: str = "ONA Towers API"
    app_env: Literal["development", "staging", "production", "test"] = "development"
    app_debug: bool = True
    api_prefix: str = "/api"
    host: str = "0.0.0.0"
    port: int = 8400
    cors_origins: str = "http://localhost:3010,http://127.0.0.1:3010"
    cors_origin_regex: str | None = None
    log_level: str = "INFO"

    database_url: str = "sqlite+pysqlite:///./database/ona_towers.db"
    auto_init_db: bool = False

    enquiry_rate_limit_count: int = 5
    enquiry_rate_limit_window_seconds: int = 3600
    duplicate_enquiry_window_seconds: int = 120
    max_message_length: int = 2000

    smtp_enabled: bool = False
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None
    smtp_from_name: str = "ONA Towers"
    smtp_use_tls: bool = True
    sales_notification_email: str | None = None
    cityview_url: str = "https://www.onatowers.com/cityview"

    admin_email: str = "admin@onatowers.dev"
    admin_password: str = "ona-admin-local"
    admin_name: str = "ONA Administrator"
    admin_role: str = "Administrator"
    admin_department: str = "Administration"
    admin_session_secret: str = "ona-local-development-secret"
    admin_session_hours: int = 12

    model_config = SettingsConfigDict(
        env_file=(str(PROJECT_ROOT / ".env"), str(BACKEND_DIR / ".env")),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> list[str]:
        value = self.cors_origins.strip()
        origins: list[str] = []
        