from functools import lru_cache
from typing import Literal
import json

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "ONA Towers API"
    app_env: Literal["development", "staging", "production", "test"] = "development"
    app_debug: bool = True
    api_prefix: str = "/api"
    host: str = "0.0.0.0"
    port: int = 8400
    # Kept as a string so .env accepts both comma-separated and JSON-array values.
    cors_origins: str = (
        "http://localhost:3010,http://127.0.0.1:3010,"
        "http://localhost:3000,http://127.0.0.1:3000"
    )
    log_level: str = "INFO"

    database_url: str = "sqlite+pysqlite:///./ona_towers.db"
    auto_init_db: bool = True

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

    # The first database-backed administrator is bootstrapped from these values.
    admin_email: str = "admin@onatowers.dev"
    admin_password: str = "ona-admin-local"
    admin_name: str = "Oniria Assistant"
    admin_role: str = "Administrator"
    admin_department: str = "Administration"
    admin_session_secret: str = "ona-local-development-secret"
    admin_session_hours: int = 12

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> list[str]:
        value = self.cors_origins.strip()
        origins: list[str] = []
        if value.startswith("["):
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    origins = [str(item).strip() for item in parsed if str(item).strip()]
            except json.JSONDecodeError:
                origins = []
        elif value:
            origins = [item.strip() for item in value.split(",") if item.strip()]

        # Keep local development resilient when an older .env still lists a
        # previous frontend port. Vite currently runs on 3010.
        if self.app_env == "development":
            local_origins = [
                "http://localhost:3010",
                "http://127.0.0.1:3010",
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ]
            for origin in local_origins:
                if origin not in origins:
                    origins.append(origin)

        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()
