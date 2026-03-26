# Architecture Overview

Stack, deployment, monorepo structure, and data flow for Soltana.

## Stack

| Layer | Tool |
| ----- | ---- |
| Hosting + SSR | Cloudflare Pages |
| Database | Cloudflare D1 (SQLite at edge) |
| Auth | Better Auth (self-hosted) |
| Framework | TanStack Start (React + SSR) |
| ORM | Drizzle |
| Styles | soltana-ui design system + project SCSS overrides |

## Monorepo Structure

pnpm workspace with two packages:

- **apps/web** — TanStack Start web app (React, SSR, Cloudflare Pages)
- **scrapers** — TypeScript Playwright scrapers (shared Playwright install)
- **pipeline** — Python ETL project (uv, standalone; not a pnpm member)

The pipeline interfaces with the web app only via SQL seed files written to `apps/web/drizzle/seeds/`.

## Data Flow

```text
Sources (eBible, OSHB, Project Gutenberg, etc.)  →  TypeScript scrapers (CFM, etc.)
                    ↓                                    ↓
                    └──────────────┬────────────────────┘
                                   ↓
                    Python pipeline (DuckDB + Polars)
                                   ↓
                    SQL seeds → apps/web/drizzle/seeds/
                                   ↓
                         Cloudflare D1 (runtime)
```

One-directional: sources → scrapers → pipeline → D1. The web app never writes to corpus tables.

## Runtime vs Build-time

| Runtime (Cloudflare) | Build-time (local) |
| -------------------- | ------------------ |
| TanStack Start SSR | Python pipeline |
| D1 queries via Drizzle | DuckDB + Polars |
| Better Auth | Scrapers (Playwright) |
| User data (progress, annotations) | Corpus ingestion |

## Status

- **Scaffold complete** — All packages created
- **apps/web** — Routes, layout, study plans (CFM functional), reader/teach/timeline stubs
- **scrapers** — CFM scraper migrated and functional
- **pipeline** — Skeleton with CLI and source stubs; all commands raise `NotImplementedError`
