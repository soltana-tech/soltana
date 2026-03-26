# Search

Hybrid retrieval across scripture, academic sources, and user content — not a single vector-only
layer.

## Target Architecture

**Hybrid retrieval** combines:

1. **Exact / lexical** — Canonical reference resolution, D1 FTS5, phrase search, lemma-aware lookup
   where data exists
2. **Structured graph (relational)** — Cross-references, passage ↔ entity links, title/alias
   expansion, topical links (see [data-model.md](./data-model.md) and [ontology.md](./ontology.md)).
   Implement as **relational tables first**; a dedicated graph database is optional and usually
   unnecessary at MVP scale.
3. **Dense semantic** — Cloudflare Vectorize embeddings at multiple granularities (verse,
   pericope/chapter, optional theme summaries)
4. **Reranking** — Cross-encoder or lightweight reranker over candidate passages before synthesis

Separate indexing pipelines where behaviors differ:

- **Scripture text** — Multi-granularity units; Bible-first quality before other traditions
- **Academic / commentary** — Chunked documents with citation metadata
- **User notes** — Per-user retrieval boundaries; FTS5 and/or embeddings on private content

Semantic search is **not** “embed everything and hope.” Short verses are often semantically sparse;
chapter- or theme-level summaries and entity expansion reduce miss rates.

## Phase 2: Keyword + Reference Foundation

- **D1 FTS5** — Full-text search on `passages`; implemented once eBible ingestion is complete
- **Search UI** — Integrated into the reader
- **Orama** — Fallback if FTS5 proves insufficient at scale

## Phase 3: Bible Hybrid Semantic (First Tier)

After the Christian Bible corpus is **stable enough** to version embeddings (KJV + early
translations, cross-references ingested), add **Bible-only** hybrid semantic retrieval — not
deferred to late-phase “optional” search.

- **Cloudflare Vectorize** — Pre-computed embeddings from pipeline; retrieval units at verse,
  passage-group, and summary levels as schema allows
- **Reranking** — Introduce when candidate lists are large enough to matter
- **Multi-tradition parity** — Semantic quality for Jewish, Islamic, and other corpora follows
  **once** each tier has stable text and segmentation; do not assume one embedding model transfers
  across traditions without validation

## Phase 5+: User Content & Expanded Corpus

- **Annotations** — FTS5 (and optional embeddings) on user notes with strict user scoping
- **Commentary / academic corpora** — Retrieval with license metadata and citations

## What Hybrid Search Is Not

- **Not full-corpus CAG** — The entire Bible plus translations, commentaries, and history is not
  loaded into the model context every request
- **Not vector-only** — Topic and title queries (e.g. “verses about Jesus”) need entity/alias and
  cross-reference expansion, not only cosine similarity

## Status

- **FTS5** — Not yet implemented; no virtual tables or search UI
- **Vectorize / hybrid** — Not yet implemented; Bible-first rollout tied to Phase 3 companion track
  — see [index.md](./index.md)
