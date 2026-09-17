import html
import re

_TAG_RE = re.compile(r"<[^>]+>")
_CONTROL_RE = re.compile(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]")


def sanitize_plain_text(value: str | None) -> str | None:
    if value is None:
        return None
    value = html.unescape(value)
    value = _TAG_RE.sub("", value)
    value = _CONTROL_RE.sub("", value)
    value = value.strip()
    return value or None
