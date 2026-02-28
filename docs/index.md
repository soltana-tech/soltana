# Soltana Docs

## Reference

| Doc | Covers |
| --- | ------ |
| [SCOPE.md](./SCOPE.md) | Vision, identity, open source, corpus scope, design philosophy |
| [architecture.md](./architecture.md) | Stack, monorepo structure, data flow, runtime vs build-time |
| [data-model.md](./data-model.md) | D1 schema, Drizzle tables, corpus-agnostic reference system |
| [auth.md](./auth.md) | Better Auth setup, session management, protected routes |
| [study-plans.md](./study-plans.md) | CFM timeline, plan cards, progress tracking |
| [reader.md](./reader.md) | Scripture reader, annotations, notebooks, word study |
| [teach.md](./teach.md) | Markdown editor, ECharts, lesson/sermon builder |
| [timeline.md](./timeline.md) | D3.js historical timeline, perspective layers, data model |
| [search.md](./search.md) | FTS5 keyword search, Cloudflare Vectorize semantic search |
| [pipeline.md](./pipeline.md) | Python ETL, source modules, CLI, source datasets table |
| [scrapers.md](./scrapers.md) | TypeScript Playwright scrapers, CFM scraper |
| [soltana-ui.md](./soltana-ui.md) | Planned SCSS → design system migration |

---

## Phase 1: Scaffold — Complete

- [x] pnpm workspace monorepo (`apps/web`, `scrapers`, `pipeline`)
- [x] TanStack Start + Cloudflare Pages + D1 via Drizzle
- [x] Better Auth (email/password, Google/GitHub OAuth) — `src/shared/server/auth/`
- [x] D1 schema — all tables defined, corpus tables empty — `src/shared/server/db/schema.ts`
- [x] App shell, responsive navbar, landing page
- [x] Study plans — CFM 2026 OT functional, others placeholder — `src/study-plans/`
- [x] Reader, Teach, Timeline — stubbed routes only
- [x] CFM scraper migrated — `scrapers/src/cfm/`
- [x] Pipeline skeleton — CLI, Pydantic models, source stubs — `pipeline/`

---

## Phase 2: Core Features — Next Up

### Scripture Text

- [ ] eBible KJV ingestion via pipeline — see [pipeline.md](./pipeline.md)
- [ ] `passages` table populated in D1 — see [data-model.md](./data-model.md)
- [ ] `PassageView` renders real text — `src/reader/components/PassageView.tsx`

### Reader

- [ ] Annotation CRUD (highlight, underline, note, link) — see [reader.md](./reader.md)
- [ ] Notebooks and tagging — see [reader.md](./reader.md)
- [ ] Reading preferences UI (layout, font, red-letter) — `src/reader/`
- [ ] LDS cross-references and JST footnotes

### Study Plans

- [ ] D1 progress sync for authenticated users — see [study-plans.md](./study-plans.md)
- [ ] localStorage → D1 migration prompt on first sign-in
- [ ] Additional built-in plans (Bible in a Year, Bible in 90 Days, BoM in 90 Days)

### Auth

- [ ] Enforce auth-gated routes (custom plans, annotations) — see [auth.md](./auth.md)

### Search

- [ ] FTS5 virtual table on `passages` — see [search.md](./search.md)
- [ ] Search UI in reader

### Historical Timeline

- [ ] Data model finalized — see [timeline.md](./timeline.md)
- [ ] Initial event dataset (OT people, places, events)
- [ ] D3.js implementation — `src/timeline/`

### Corpus (extended)

- [ ] Strong's concordance + OSHB morphological data — see [pipeline.md](./pipeline.md)
- [ ] Word study UI (basic: Strong's definition per word)
- [ ] OpenBible + TSK cross-references
- [ ] Apostolic Fathers, deuterocanonical texts, Pseudepigrapha (1 Enoch, Jubilees)

---

## Phase 3: Multi-faith + Semantic Search

- [ ] Sefaria ingestion (Talmud, Mishnah) — see [pipeline.md](./pipeline.md)
- [ ] Quran via Tanzil
- [ ] Dead Sea Scrolls selected texts
- [ ] Ancient Near Eastern parallels (Gilgamesh, Enuma Elish)
- [ ] Semantic search — Cloudflare Vectorize — see [search.md](./search.md)
- [ ] Timeline: cross-tradition comparative view, perspective layers — see [timeline.md](./timeline.md)

---

## Phase 4: Academic Depth

- [ ] Full word study (BDAG-comparable with open sources)
- [ ] Original language display (Hebrew OT, Greek NT)
- [ ] SBLGNT integration
- [ ] Zoroastrian texts (Avesta)
- [ ] Buddhist Pali Canon (SuttaCentral)
- [ ] Lesson builder — Teach section — see [teach.md](./teach.md)
- [ ] soltana-ui design system migration — see [soltana-ui.md](./soltana-ui.md)

---

## Phase 5: Expansion

- [ ] Hindu texts (Bhagavad Gita, Upanishads)
- [ ] Performance optimization (Orama if FTS5 insufficient) — see [search.md](./search.md)
- [ ] Institutional features (citation export, collaborative annotation)
