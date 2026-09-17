from pydantic import BaseModel, Field, field_validator


class SiteVisitCreate(BaseModel):
    session_id: str = Field(min_length=8, max_length=80)
    page_path: str = Field(min_length=1, max_length=220)

    @field_validator("session_id", "page_path", mode="before")
    @classmethod
    def clean(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value


class SiteVisitResponse(BaseModel):
    success: bool = True
