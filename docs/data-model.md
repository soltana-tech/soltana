# Data Model

D1 schema, passage reference system, and corpus-agnostic design.

## Primary Structured Store (D1)

All **relational** runtime data for scripture, users, annotations, and structured references lives in
Cloudflare D1. JSON-LD is used only for SEO structured data in page `<head>`, not as application
storage.

## Auxiliary Runtime Layers

Hybrid study features also rely on:

- **Cloudflare Vectorize** — Dense embeddings and semantic retrieval; indexes are derived from D1
  corpus rows and pipeline-defined retrieval units (not a parallel editable corpus).
- **KV or similar** (optional) — Session-scoped caches, rate limiting, compact study-packet handles.

So: **D1 is the authoritative structured store**; vectors and cache are layered services, not
“second databases” for the same editable entities.

## Corpus-Agnostic Reference System

Different traditions use different reference systems:

- Bible: Book / Chapter / Verse (`genesis 1:1`)
- Talmud: Tractate / Daf / Amud (`berakhot 2a`)
- Quran: Surah / Ayah (`2:255`)

The `passages` table uses `ref_system` and a `ref` JSON column for tradition-specific structure.
No universal scheme is forced.

## Corpus Classes (Conceptual)

Content falls into four buckets (not necessarily one table each):

1. **Canonical text** — Scripture per tradition; structured refs, translations, cross-references
2. **Academic resources** — Commentaries, lexicons, articles; chunkable with citation metadata
3. **User-private** — Notes, highlights, saved questions; **per-user retrieval boundaries**; encrypt
   at rest when the product requires it
4. **System artifacts** — Topic taxonomies, entity ontologies, precomputed summaries, graph-like edges,
   evaluation fixtures — product assets that improve retrieval, not generic “documents”

## Schema Groups

Defined in `src/shared/server/db/schema.ts` via Drizzle ORM.

### Corpus (read-only at runtime, populated by pipeline)

- **corpora** — id, name, tradition, language, ref_system
- **translations** — id, corpus_id, name, abbreviation, license
- **passages** — id, corpus_id, translation_id, ref_system, ref (JSON), text, sort_order
- **cross_references** — source_id, target_id, type

### Study Plans

- **plan_definitions** — id, slug, name, description, type (builtin|custom), creator_user_id
- **plan_items** — id, plan_definition_id, sort_order, passage_ref (JSON), label
- **user_plans** — id, user_id, plan_definition_id, enrolled_at
- **reading_progress** — id, user_id, plan_item_id, completed_at

### Annotations

- **annotations** — id, user_id, passage_id, type (highlight|underline|note|link), content, color, created_at
- **annotation_tags** — annotation_id, tag
- **notebooks** — id, user_id, name, description
- **notebook_entries** — notebook_id, annotation_id

### User Preferences

- **user_preferences** — user_id, theme, reading_theme, font_size, layout, footnote_placement, red_letter, prefs_json

## Planned: Study Companion & Retrieval

Not yet in Drizzle; add as the companion matures (Bible-first):

- **Pericopes / passage groups** — groupings above single verses for retrieval and display
- **entities**, **entity_aliases** — people, places, titles; alias strings for “Son of Man,” etc.
  (see [ontology.md](./ontology.md))
- **topics**, **passage_topics** — controlled taxonomy and links (governance: [ontology.md](./ontology.md))
- **translation_alignments** — aligned verses across translations where available
- **retrieval_units** — verse, pericope, chapter summary, or synthetic chunk used for embedding
- **Embedding metadata** — model id, version, Vectorize index id per unit
- **study_sessions** — optional user session anchors for packet continuity
- **answer_citations** — provenance from companion answers to passages and sources
- **evaluation_cases** — fixtures for retrieval and answer-quality tests

## Status

- **Schema defined** — Core tables in Drizzle schema
- **Tables empty** — Corpus tables populated by pipeline later
- **Lexicon / morphology** — `lexicon_entries`, morphemes align with [index.md](./index.md) Phase 4
  (OSHB, Strong’s) and Phase 5 (full word study); not Phase 2 reader MVP
- **Companion tables** — Planned; see [companion.md](./companion.md)
- **Timeline** — Custom schema in `docs/timeline.md` when implemented
