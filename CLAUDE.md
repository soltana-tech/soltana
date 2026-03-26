# Soltana — Claude / agent context

Open-source academic scripture study platform. **pnpm** workspace: `apps/web`, `scrapers`; Python
`pipeline` is standalone (uv), not a pnpm member.

## Authoritative docs

- Roadmap and doc index: [`docs/index.md`](docs/index.md)
- Vision and corpus scope: [`docs/SCOPE.md`](docs/SCOPE.md)
- Stack and data flow: [`docs/architecture.md`](docs/architecture.md)
- D1 schema and planned companion tables: [`docs/data-model.md`](docs/data-model.md)
- Hybrid search and Vectorize: [`docs/search.md`](docs/search.md)
- Study companion, policy, Teach enforcement: [`docs/companion.md`](docs/companion.md)
- Teach workspace (user-authored): [`docs/teach.md`](docs/teach.md)
- Ontology / entities: [`docs/ontology.md`](docs/ontology.md)
- Eval suites: [`docs/evaluation.md`](docs/evaluation.md)
- Context / session memory: [`docs/context-memory.md`](docs/context-memory.md)
- Companion UI: [`docs/companion-ui.md`](docs/companion-ui.md)
- Pipeline and seeds: [`docs/pipeline.md`](docs/pipeline.md)

## Non-negotiables

1. **Corpus integrity** — Sources flow one way: scrapers → pipeline → SQL seeds → D1. The web app
   **never writes** to corpus tables.
2. **Study companion vs Teach** — The companion is a **citation-grounded academic assistant**
   (explore, compare, attribute sources). It is **not** a sermon or finished-lesson generator.
   **Teach** is **user-authored** composition; do not add features that use the companion to draft
   Teach-ready sermons or teaching manuscripts. **Do not** add companion tools or APIs that write to
   Teach, return sermon/lesson draft schemas for insertion, or “send to Teach” flows — see
   `docs/companion.md` (Companion–Teach enforcement).
3. **Retrieval architecture** — Prefer **hybrid retrieval** (exact refs, FTS5, structured
   relations, embeddings, reranking) and **bounded study packets** before synthesis. Do not design
   “load the whole corpus into context every request.”
4. **Tooling** — Lint/format/typecheck go through **pre-commit** (see `.claude/rules/tooling.mdc`).

## When implementing AI or search

- Align with [`docs/companion.md`](docs/companion.md) and [`docs/search.md`](docs/search.md).
- Embeddings and Vectorize should stay **versioned** with corpus releases (see [`docs/pipeline.md`](docs/pipeline.md)).
