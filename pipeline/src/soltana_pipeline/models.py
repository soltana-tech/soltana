"""Pydantic models for the normalized passage schema."""

from pydantic import BaseModel


class SourceConfig(BaseModel):
    """Configuration for a data source."""

    id: str
    name: str
    url: str | None = None
    license: str | None = None
    corpus: str
    tradition: str
    language: str
    ref_system: str


class NormalizedPassage(BaseModel):
    """A single passage in the normalized schema."""

    corpus_id: int
    translation_id: int
    ref_system: str
    ref: dict
    text: str
    sort_order: int


class CrossReference(BaseModel):
    """A cross-reference between two passages."""

    source_ref: dict
    target_ref: dict
    type: str
