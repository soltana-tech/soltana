# Scrapers

TypeScript Playwright scrapers for browser-requiring sources.

## Package

- **Location** — `scrapers/` (pnpm workspace member)
- **Dependencies** — @playwright/test, tsx, typescript
- **Script** — `pnpm cfm` runs `tsx src/cfm/scrape.ts`

## CFM Scraper

- **Migrated from** — Original `scripts/scrapeCfmLessons.ts`
- **Output** — `scrapers/output/cfm/` (gitignored)
- **Pipeline** — `pipeline` sources/cfm reads from this directory
- **Status** — Functional

## Output Format

Raw JSON written to `scrapers/output/`. Structure consumed by Python pipeline's cfm source.
No direct D1 writes; scrapers are build-time only.

## Future Scrapers

New scrapers for sources that require browser automation (e.g., sites that need JavaScript
rendering). Most corpus sources (eBible, OSHB, Sefaria, Tanzil) are HTTP-downloadable and
ingested directly by the pipeline.

## Status

- **CFM scraper** — Functional, migrated
- **Other scrapers** — None yet
- **Shared Playwright** — Same install as apps/web e2e tests
