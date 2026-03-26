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

### Embeddings (planned)

When hybrid semantic search is implemented (see [search.md](./search.md)), the pipeline (or a
dedicated worker step) should generate **versioned embeddings** for defined retrieval units (verse,
pericope, summaries, etc.) and publish them to **Cloudflare Vectorize** with metadata pointing back
to D1 passage or unit IDs. Embeddings must stay in sync with corpus versions; treat embedding
model and index version as part of the release story for scripture data. See [architecture.md](./architecture.md)
**Build artifacts to runtime** for how SQL seeds and Vectorize outputs relate.

## Source Datasets

### Freely Redistributable

Public domain or permissively licensed sources that can be ingested and redistributed without restriction.

| Dataset | Format | License | Corpus | Phase |
| ------- | ------ | ------- | ------ | ----- |
| eBible.org | USFM/JSON | CC/PD | KJV, ASV, WEB, Darby, YLT | 1 |
| CFM lesson pages | Scraped JSON | — | Come, Follow Me metadata | 1 |
| Project Gutenberg — Leeser (1853) | Text | PD | Hebrew Bible (Jewish translation) | 2–3 |
| Project Gutenberg — JPS 1917 | Text | PD | Hebrew Bible (Jewish translation) | 2–3 |
| Project Gutenberg — Rodkinson (1896–1903) | Text | PD | Babylonian Talmud (partial English) | 3 |
| Project Gutenberg — Rodwell Quran (1861) | Text | PD | Quran (English translation) | 3 |
| Project Gutenberg — Sale Quran (1734) | Text | PD | Quran (English translation) | 3 |
| Project Gutenberg — ANE texts | Various | PD | Gilgamesh, Enuma Elish, Atrahasis | 3 |
| Project Gutenberg — Pseudepigrapha | Various | PD | 1 Enoch, Jubilees, etc. | 2 |
| Project Gutenberg — 1830 Book of Mormon | Text | PD | Book of Mormon (1830 first edition) | 2 |
| Open Scriptures Hebrew Bible (OSHB) | XML | CC BY 4.0 | Hebrew OT + morphology | 2 |
| Strong's Concordance | XML | CC BY 4.0 | Hebrew/Greek lexicon | 2 |
| Brown-Driver-Briggs Hebrew Lexicon | XML | PD | Hebrew lexicon | 2 |
| Thayer's Greek Lexicon | XML | PD | Greek NT lexicon | 2 |
| OpenBible.info cross-refs | CSV | CC BY | Cross-references | 2 |
| Treasury of Scripture Knowledge | CSV/XML | PD | Extended cross-references | 2 |
| CCEL (Apostolic Fathers) | XML | PD/open | Early Christian writings | 2 |
| Tanzil | XML | Non-commercial open | Quran (Arabic) | 3 |
| Avesta.org | Text | PD | Zoroastrian texts | 4 |
| SuttaCentral | JSON | CC0 | Pali Canon (root texts) | 4 |

**Notes:**

- Tanzil's digital encoding carries a non-commercial restriction. The Arabic Quran text itself is
  public domain. Acceptable for a non-commercial open-source platform; re-evaluate if monetization
  is ever introduced, or source the Arabic text from an alternative open encoding.
- Rodkinson's Talmud is partial (~10 of 63 tractates) and not a modern critical translation. It
  establishes redistributable baseline coverage. Supplement with Danby's _Mishnah_ (1933) if US
  copyright non-renewal can be confirmed via the Stanford Copyright Renewal Database.
- Leeser and JPS 1917 cover the full Hebrew Bible (Tanakh) with distinct Jewish canonical ordering
  and are well-regarded translations. Benisch (1851–1861) is also public domain and may be added
  for additional coverage.

### Licensing Required

Sources that cannot be distributed in SQL seeds without explicit permission. These corpora are in
scope but implementation is blocked on rights resolution.

| Dataset | Corpus | Restriction | Obtention Path |
| ------- | ------ | ----------- | -------------- |
| LDS Standard Works (current) | BoM, D&C, PoGP | © IRI | [intellectualreserve.org](https://www.intellectualreserve.org); 1830 BoM PD interim |
| DSS ([dssenglishbible.com](https://dssenglishbible.com)) | 223 biblical scrolls + apparatus | WEB (PD) + Davis variants (no license) | `chdavis29 (at) gmail.com`; link out until permission |
| Sefaria English | Talmud, Mishnah (English) | Per-translator copyright | Prefer Rodkinson/Danby; CC-BY texts only if vetted |

**LDS detail:** D&C and PoGP have no PD equivalents. Educational/non-commercial open-source
licensing has precedent; contact IRI.

**DSS detail:** The WEB alone does not cover the DSS. The scholarly value is Craig Davis's scroll
transcriptions and variant identification; permission or a separate transcription source is
required for ingestion.

## Source Stubs

All sources have config stubs in `pipeline/src/soltana_pipeline/sources/`. None have working
`ingest`/`transform`/`validate` yet.

## Status

- **Skeleton complete** — `pyproject.toml`, `cli.py`, `models.py`, `base.py`, source stubs
- **All commands** — Raise `NotImplementedError`
- **Data dirs** — `data/raw/`, `data/cache/` gitignored
- **First real implementation** — Phase 2: eBible KJV ingestion
