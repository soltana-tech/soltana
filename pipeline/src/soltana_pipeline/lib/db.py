"""DuckDB connection helper."""

import duckdb

from soltana_pipeline.config import CACHE_DIR


def get_connection(db_name: str = "pipeline.duckdb") -> duckdb.DuckDBPyConnection:
    """Get a DuckDB connection for the pipeline working database."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    return duckdb.connect(str(CACHE_DIR / db_name))
