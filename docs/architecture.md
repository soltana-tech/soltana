# Architecture Overview

Stack, deployment, monorepo structure, and data flow for Soltana.

## Stack

| Layer | Tool |
| ----- | ---- |
| Hosting + SSR | Cloudflare Pages |
| Primary database | Cloudflare D1 (SQLite at edge) — corpus, users, annotations, structured refs |
| Vector retrieval | Cloudflare Vectorize — dense embeddings (see [search.md](./search.md)) |
| Cache / session | Cloudflare KV (or Durable Objects) — optional bounded study packets, rate limits |
| Object storage | R2 — optional large academic artifacts, pipeline outputs (future) |
| Auth | Better Auth (self-hosted) |
| Framework | TanStack Start (React + SSR) |
| ORM | Drizzle |
| Inference | Workers AI and/or external LLM APIs via a single gateway (planned) |
| Styles | soltana-ui design system + project SCSS overrides |

D1 remains the **source of truth** for relational scripture data and user content. Vector indexes and
cache are **derived or auxiliary** layers, not second copies of the canonical corpus for editing.

## Monorepo Structure

Three top-level projects:

- **apps/web** and **scrapers** — **pnpm workspace members** (shared tooling and lockfile)
- **pipeline** — **standalone** Python package (uv), **not** part of the pnpm workspace

## Build Artifacts to Runtime

The pipeline’s primary handoff to the deployed app is **SQL seeds** → `apps/web/drizzle/seeds/` →
D1. For hybrid search, **embedding and Vectorize indexing** are additional outputs:

- **Batch path** — Pipeline or a worker job reads normalized corpus + retrieval units, computes
  embeddings, **upserts** vectors into Vectorize with metadata (passage/unit ids, corpus version).
- **Incremental path** — Post-import workers may refresh indexes when only part of the corpus
  changes; same version metadata as SQL seeds.

So: **relational corpus** flows through SQL seeds; **vector indexes** are derived artifacts tied to
the same corpus version, not a second editable source of truth.

## Corpus Data Flow

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

One-directional: sources → scrapers → pipeline → D1. **The web app never writes to corpus tables.**

## Study Companion Data Flow (Planned)

```text
User query → intent / routing → retrieval orchestrator
                                      ↓
              D1 (FTS5, refs, entities) + Vectorize (semantic) + rerank
                                      ↓
                         bounded study packet + policy context
                                      ↓
              LLM gateway → synthesis → policy / citation checks → response
```

See [companion.md](./companion.md) for policy, evaluation, and Teach boundaries.

## Runtime vs Build-time

| Runtime (Cloudflare) | Build-time (local) |
| -------------------- | ------------------ |
| TanStack Start SSR | Python pipeline |
| D1 queries via Drizzle | DuckDB + Polars |
| Vectorize queries | Embedding generation in pipeline / workers |
| Better Auth | Scrapers (Playwright) |
| User data (progress, annotations) | Corpus ingestion |

## Status

- **Scaffold complete** — All packages created
- **apps/web** — Routes, layout, study plans (CFM functional), reader/teach/timeline stubs
- **scrapers** — CFM scraper migrated and functional
- **pipeline** — Skeleton with CLI and source stubs; all commands raise `NotImplementedError`
- **Companion stack** — Not wired: no LLM gateway, Vectorize bindings, or retrieval orchestrator in app yet
