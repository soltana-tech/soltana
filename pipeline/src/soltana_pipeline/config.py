"""Global configuration and paths for the pipeline."""

from pathlib import Path

PIPELINE_ROOT = Path(__file__).resolve().parent.parent.parent
PROJECT_ROOT = PIPELINE_ROOT.parent
DATA_DIR = PIPELINE_ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
CACHE_DIR = DATA_DIR / "cache"
SQL_DIR = PIPELINE_ROOT / "sql"
SEEDS_DIR = PROJECT_ROOT / "apps" / "web" / "drizzle" / "seeds"
SCRAPERS_OUTPUT_DIR = PROJECT_ROOT / "scrapers" / "output"
