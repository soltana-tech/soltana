# Search

Keyword and semantic search across scripture and user content.

## Phase 2: Keyword Search

- **D1 FTS5** — Full-text search on passages
- **Orama** — Fallback if FTS5 is insufficient
- **User content** — FTS5 on annotations (Phase 3)

## Phase 3: Semantic Search

- **Cloudflare Vectorize** — Pre-computed embeddings at build time
- **Semantic similarity** — Find conceptually related passages beyond keyword match

## Status

- **Not yet implemented** — No search UI or backend
- **Schema** — No FTS5 virtual tables or Vectorize indexes yet
- **Phase** — Keyword in Phase 2, semantic in Phase 3
