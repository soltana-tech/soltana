# Data Model

D1 schema, passage reference system, and corpus-agnostic design.

## D1 as Single Runtime Database

All persistent runtime data lives in Cloudflare D1. No secondary runtime data store. JSON-LD is
used only for SEO structured data in page `<head>`, not as storage.

## Corpus-Agnostic Reference System

Different traditions use different reference systems:

- Bible: Book / Chapter / Verse (`genesis 1:1`)
- Talmud: Tractate / Daf / Amud (`berakhot 2a`)
- Quran: Surah / Ayah (`2:255`)

The `passages` table uses `ref_system` and a `ref` JSON column for tradition-specific structure.
No universal scheme is forced.

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

## Status

- **Schema defined** — All tables in Drizzle schema
- **Tables empty** — Corpus tables populated by pipeline later
- **Lexicon** — Phase 2 (lexicon_entries, morphemes)
- **Timeline** — Custom schema in `docs/timeline.md` when implemented
