from collections import defaultdict, deque
from threading import Lock
from time import monotonic

from app.core.exceptions import RateLimitError


class SlidingWindowRateLimiter:
    def __init__(self):
        self._events: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str, *, limit: int, window_seconds: int) -> None:
        now = monotonic()
        cutoff = now - window_seconds
        with self._lock:
            queue = self._events[key]
            while queue and queue[0] < cutoff:
                queue.popleft()
            if len(queue) >= limit:
                raise RateLimitError()
            queue.append(now)


rate_limiter = SlidingWindowRateLimiter()
