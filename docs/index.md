# Soltana Docs

## Reference

| Doc | Covers |
| --- | ------ |
| [SCOPE.md](./SCOPE.md) | Vision, identity, open source, corpus scope, design philosophy |
| [architecture.md](./architecture.md) | Stack, monorepo structure, corpus + companion data flow, runtime vs build-time |
| [data-model.md](./data-model.md) | D1 schema, Drizzle tables, corpus-agnostic reference system, planned companion tables |
| [companion.md](./companion.md) | Study companion role, policy, Teach enforcement, separation from Teach |
| [ontology.md](./ontology.md) | Entities, titles, aliases, cross-ref edges, topic governance |
| [evaluation.md](./evaluation.md) | Golden sets, refusal tests, thresholds, regression workflow |
| [context-memory.md](./context-memory.md) | Session packets, KV vs D1, compaction, token budgets |
| [companion-ui.md](./companion-ui.md) | Citations, refusal UX, confidence labels, Teach boundary in UI |
| [auth.md](./auth.md) | Better Auth setup, session management, protected routes |
| [study-plans.md](./study-plans.md) | CFM timeline, plan cards, progress tracking |
| [reader.md](./reader.md) | Scripture reader, annotations, notebooks, word study |
| [teach.md](./teach.md) | User-authored Teach workspace; markdown, ECharts, export |
| [timeline.md](./timeline.md) | D3.js historical timeline, perspective layers, data model |
| [search.md](./search.md) | Hybrid retrieval: FTS5, Vectorize, reranking, pipelines |
| [pipeline.md](./pipeline.md) | Python ETL, source modules, CLI, source datasets table |
| [scrapers.md](./scrapers.md) | TypeScript Playwright scrapers, CFM scraper |
| [soltana-ui.md](./soltana-ui.md) | Incremental design system extraction; dogfooding strategy |

---

## Phase 1: Scaffold — Complete

- [x] pnpm workspace (`apps/web`, `scrapers`); Python `pipeline` standalone — see [architecture.md](./architecture.md)
- [x] TanStack Start + Cloudflare Pages + D1 via Drizzle
- [x] Better Auth (email/password, Google/GitHub OAuth) — `src/shared/server/auth/`
- [x] D1 schema — all tables defined, corpus tables empty — `src/shared/server/db/schema.ts`
- [x] App shell, responsive navbar, landing page
- [x] Study plans — CFM 2026 OT functional, others placeholder — `src/study-plans/`
- [x] Reader, Teach, Timeline — stubbed routes only
- [x] CFM scraper migrated — `scrapers/src/cfm/`
- [x] Pipeline skeleton — CLI, Pydantic models, source stubs — `pipeline/`

---

## Phase 2: Reader MVP

The singular goal of this phase is canonical scripture text in the reader. Nothing else ships until
this works well.

### Scripture Text

- [ ] eBible KJV ingestion via pipeline — see [pipeline.md](./pipeline.md)
- [ ] `passages` table populated in D1 — see [data-model.md](./data-model.md)
- [ ] `PassageView` renders real text — `src/reader/components/PassageView.tsx`
- [ ] Book/chapter navigation

### Reading Experience

- [ ] Reading preferences UI (font size, layout, red-letter) — `src/reader/`
- [ ] FTS5 virtual table on `passages` — see [search.md](./search.md)
- [ ] Search UI in reader

---

## Phase 3: Persistence + Translations

### Reader

- [ ] Annotation CRUD (highlight, underline, note, link) — see [reader.md](./reader.md)
- [ ] Notebooks and tagging — see [reader.md](./reader.md)

### Auth + Sync

- [ ] D1 progress sync for authenticated users — see [study-plans.md](./study-plans.md)
- [ ] localStorage → D1 migration prompt on first sign-in
- [ ] Enforce auth-gated routes (custom plans, annotations) — see [auth.md](./auth.md)

### Corpus

- [ ] Additional Bible translations — ASV, WEB (already in eBible source)
- [ ] OpenBible + TSK cross-references — see [pipeline.md](./pipeline.md)
- [ ] Translation comparison UI for ingested translations
- [ ] Additional built-in plans (Bible in a Year, Bible in 90 Days)

---

## Phase 3.5: Bible Hybrid Retrieval + Companion Foundations

Policy, evaluation, and hybrid retrieval ship **before** treating AI as a generic add-on. Scope is
**Bible-first**; other traditions gain semantic parity as their corpora stabilize (see [SCOPE.md](./SCOPE.md)).

- [ ] Schema groundwork: pericopes / passage groups, entities and aliases (Bible) — [data-model.md](./data-model.md)
- [ ] Cloudflare Vectorize + hybrid retrieval pipeline (FTS5 + embeddings + rerank) — [search.md](./search.md)
- [ ] LLM gateway + retrieval orchestrator scaffold — [architecture.md](./architecture.md)
- [ ] Policy layer + answer provenance (citation records) — [companion.md](./companion.md)
- [ ] Evaluation harness (golden citations, retrieval, refusal of sermon-style output) — [companion.md](./companion.md)
- [ ] Study companion MVP: citation-grounded assistance over retrieved Bible text only

---

## Phase 4: Jewish + Islamic Corpus + Academic Tooling

Companion **semantic** features remain Bible-indexed until tradition-specific embedding and entity
work exists; exact reading and keyword search still apply cross-corpus.

### Jewish Corpus

- [ ] Jewish Tanakh — Leeser (1853) and JPS 1917 ingestion via pipeline — see [pipeline.md](./pipeline.md)
- [ ] Talmud — Rodkinson PD translation; Danby Mishnah pending copyright verification — see [pipeline.md](./pipeline.md)

### Islamic Corpus

- [ ] Quran — Tanzil (Arabic) + Rodwell/Sale PD English translations — see [pipeline.md](./pipeline.md)

### Academic Tooling

- [ ] OSHB morphological data ingestion — see [pipeline.md](./pipeline.md)
- [ ] Strong's concordance ingestion — see [pipeline.md](./pipeline.md)
- [ ] Word study UI (Strong's definition per word)

### LDS Standard Works _(licensing required)_

- [ ] Current edition BoM, D&C, Pearl of Great Price — pending IRI licensing
- [ ] LDS cross-references and JST footnotes — pending IRI licensing
- [ ] BoM in 90 Days plan — pending IRI licensing; 1830 PD edition usable as interim

---

## Phase 5: Academic Depth + Timeline + Expanded Corpus

### Academic Depth

- [ ] Full word study (BDAG-comparable with open sources)
- [ ] Original language display (Hebrew OT, Greek NT)
- [ ] SBLGNT integration

### Corpus (extended)

- [ ] Apostolic Fathers, deuterocanonical texts, Pseudepigrapha — see [pipeline.md](./pipeline.md)
- [ ] Ancient Near Eastern parallels (Gilgamesh, Enuma Elish) — see [pipeline.md](./pipeline.md)
- [ ] Zoroastrian texts (Avesta) — see [pipeline.md](./pipeline.md)
- [ ] Buddhist Pali Canon (SuttaCentral) — see [pipeline.md](./pipeline.md)

### Historical Timeline

- [ ] Data model finalized — see [timeline.md](./timeline.md)
- [ ] Initial event dataset (OT people, places, events)
- [ ] D3.js implementation — `src/timeline/`
- [ ] Cross-tradition comparative view, perspective layers

### Teach

- [ ] User-authored Teach workspace — markdown, ECharts, export — see [teach.md](./teach.md)

### Companion + Search (ongoing)

- [ ] Deeper commentary and academic source retrieval — extends Phase 3.5 patterns — [search.md](./search.md), [companion.md](./companion.md)

---

## Phase 6: Expansion

- [ ] Hindu texts (Bhagavad Gita, Upanishads)
- [ ] Dead Sea Scrolls — pending Craig Davis permission (dssenglishbible.com)
- [ ] Nag Hammadi — per-text licensing assessment required
- [ ] Performance optimization (Orama if FTS5 insufficient) — see [search.md](./search.md)
- [ ] Institutional features (citation export, collaborative annotation)
