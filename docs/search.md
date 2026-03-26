# Search

Keyword and semantic search across scripture and user content.

## Phase 2: Keyword Search

- **D1 FTS5** — Full-text search on `passages`; implemented once eBible ingestion is complete
- **Search UI** — Integrated into the reader
- **Orama** — Fallback if FTS5 proves insufficient at scale

## Phase 5: Semantic Search

Semantic search requires a stable, fully-populated corpus before embeddings are useful. Adding
Vectorize infrastructure before the corpus is settled is premature.

- **Cloudflare Vectorize** — Pre-computed embeddings generated at pipeline build time
- **Semantic similarity** — Find conceptually related passages beyond keyword match
- **User content** — FTS5 on annotations (same phase)

## Status

- **FTS5** — Not yet implemented; no virtual tables or search UI
- **Vectorize** — Not yet implemented; Phase 5
