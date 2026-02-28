# Pipeline

Python ETL: DuckDB, Polars, source modules, CLI.

## Stack

- **Python** — uv-managed, >=3.12
- **Dependencies** — DuckDB, Polars, orjson, lxml, Pydantic, httpx, typer, rich
- **Location** — `pipeline/` (standalone, not pnpm workspace member)

## Source Module Protocol

Every source implements:

```python
class SourceProtocol(Protocol):
    config: SourceConfig
    def ingest(self) -> Path:                    # Download/cache raw files
    def transform(self) -> pl.DataFrame:         # Parse → normalized Polars DataFrame
    def validate(self, df: pl.DataFrame) -> None # Assert counts, integrity
```

## CLI Commands

| Command | Purpose |
| ------- | ------- |
| `soltana-pipeline ingest --source X` | Download/cache one source |
| `soltana-pipeline ingest --all` | Download/cache all sources |
| `soltana-pipeline transform --source X` | Parse + normalize one source |
| `soltana-pipeline transform --all` | Parse + normalize all |
| `soltana-pipeline output d1` | Generate SQL seeds |
| `soltana-pipeline validate` | Assert counts + referential integrity |
| `soltana-pipeline status` | Show last-run date + version per source |

## Output

SQL seed files → `apps/web/drizzle/seeds/` → loaded into Cloudflare D1. The web app never writes to corpus tables.

## Source Datasets

| Dataset | Format | License | Corpus | Phase |
| ------- | ------ | ------- | ------ | ----- |
| eBible.org | USFM/JSON | CC/PD | KJV, ASV, WEB, Darby | 1 |
| CFM lesson pages | Scraped JSON | — | Come Follow Me metadata | 1 |
| Open Scriptures Hebrew Bible (OSHB) | XML | CC BY 4.0 | Hebrew OT + morphology | 2 |
| Strong's Concordance | XML | CC BY 4.0 | Hebrew/Greek lexicon | 2 |
| OpenBible.info cross-refs | CSV | CC | Cross-references | 2 |
| Treasury of Scripture Knowledge | CSV/XML | PD | Extended cross-references | 2 |
| CCEL (Apostolic Fathers) | XML | Various | Early Christian writings | 2 |
| Project Gutenberg | Various | PD | Pseudepigrapha, ANE texts | 2–3 |
| Sefaria Export | JSON | CC BY-NC | Talmud, Mishnah, Tosefta | 3 |
| Tanzil | XML | Open | Quran | 3 |
| Leon Levy DSS Digital Library | Various | Research use | Dead Sea Scrolls | 3 |
| Avesta.org | Text | PD | Zoroastrian texts | 4 |
| SuttaCentral | JSON | CC0 | Pali Canon | 4 |

## Source Stubs

All sources have config stubs in `pipeline/src/soltana_pipeline/sources/`. None have working
`ingest`/`transform`/`validate` yet.

## Status

- **Skeleton complete** — `pyproject.toml`, `cli.py`, `models.py`, `base.py`, source stubs
- **All commands** — Raise `NotImplementedError`
- **Data dirs** — `data/raw/`, `data/cache/` gitignored
- **First real implementation** — Phase 2: eBible KJV ingestion
