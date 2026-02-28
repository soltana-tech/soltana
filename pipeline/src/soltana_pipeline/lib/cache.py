"""Download caching utilities."""

from pathlib import Path

from soltana_pipeline.config import RAW_DIR


def get_cache_path(source_id: str, filename: str) -> Path:
    """Get the cache path for a downloaded file."""
    cache_dir = RAW_DIR / source_id
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir / filename
