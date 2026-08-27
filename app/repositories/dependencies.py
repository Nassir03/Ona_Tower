from functools import lru_cache

from app.repositories.base import BackendRepository
from app.repositories.memory import InMemoryRepository


@lru_cache
def get_repository() -> BackendRepository:
    # Development-safe default.
    # Database team replaces this with their concrete repository adapter.
    return InMemoryRepository()
