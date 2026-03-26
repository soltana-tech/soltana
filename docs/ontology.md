# Ontology and Entity Expansion

Specification for entities, titles, aliases, cross-reference edges, and topic governance — the
mechanisms behind queries like “verses about Jesus” without relying on a single surface string.

## Goals

- Improve recall and precision for **identity** and **thematic** queries beyond literal keyword match
- Keep data **tradition-scoped** where theology and naming diverge
- Allow **incremental** enrichment: start Bible-first, extend per tradition with explicit versioning

## Entity and Title Classes (Bible-first)

Planned categories (exact schema in Drizzle TBD):

- **Person** — Named individuals (e.g. Moses, Mary)
- **Divine titles / Christological titles** — e.g. Son of Man, Messiah, Lamb, Word — linked to a
  controlled **title concept** that may span many surface strings
- **Place** — Locations
- **Group / nation** — e.g. Israel, Pharisees
- **Object or ritual** — When relevant for retrieval (e.g. Passover)

**Jesus-specific retrieval** combines: literal string hits, **title concepts** (not only the token
“Jesus”), **cross-reference** edges, **semantic** retrieval, and **reranking**. No single field
replaces the others.

## Alias Normalization Rules

- Store **canonical display label** per entity plus **alias rows** (variant spellings, transliterations,
  abbreviations, common titles).
- Normalization is **per tradition and per corpus**: Hebrew vs Greek vs English naming may map to
  the same concept ID only when editorial policy says so; do not force one global merge across
  traditions without review.
- **Lemma-aware** linking where licensed lexicon data exists (Phase 4+ academic tooling per
  [index.md](./index.md)); until then, rely on explicit aliases + FTS + embeddings.

## Cross-Reference Edge Types

Model `cross_references.type` (and future graph tables) with an explicit **enum of edge semantics**,
for example:

- `parallel` — Gospel parallels, synoptic parallels
- `quotation` — OT in NT
- `allusion` — Weaker than quotation; lower confidence for auto-claims
- `prophecy_fulfillment` — When editorially marked
- `thematic` — Thematic links (may be human-curated or inferred with lower weight)

New types require a **migration + documentation** here; do not overload a single undifferentiated link.

## Topical Taxonomy Governance

- **Controlled vocabulary** for `topics` / `passage_topics`: curated slugs, definitions, and
  tradition applicability (some topics Christian-specific, some shared).
- **Changes are versioned**: adding or merging topics should not silently change past embeddings;
  bump topic or embedding version when re-indexing.
- **User-facing browse** may lag **retrieval** taxonomy; internal IDs need stability.

## Per-Tradition Ontology Strategy

- **Christian Bible**: First full pass for entities, titles, and cross-refs aligned to Protestant
  canon scope in corpus; extend for deuterocanon as those passages are ingested.
- **Jewish Tanakh / Talmud / Islamic Quran**: Separate entity namespaces and ref systems; reuse
  **patterns** (alias tables, edge types) but not necessarily the same concept IDs across religions.
- **Shared Abrahamic figures** (e.g. Moses): May share a **linked reference** across corpora with
  explicit metadata; do not assume one merged node without scholarly/product review.

## Status

- **Not implemented** — Placeholder; schema in [data-model.md](./data-model.md). Bible-first entity
  work tracks [index.md](./index.md) Phase 3.5.
