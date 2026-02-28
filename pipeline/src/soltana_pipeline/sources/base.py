"""Abstract source protocol that all source modules implement."""

from pathlib import Path
from typing import Protocol, runtime_checkable

import polars as pl

from soltana_pipeline.models import SourceConfig


@runtime_checkable
class SourceProtocol(Protocol):
    """Contract for data source modules."""

    config: SourceConfig

    def ingest(self) -> Path:
        """Download and cache raw files. Return path to cached data."""
        ...

    def transform(self) -> pl.DataFrame:
        """Parse raw data into a normalized Polars DataFrame."""
        ...

    def validate(self, df: pl.DataFrame) -> None:
        """Assert row counts, referential integrity, and data quality."""
        ...
