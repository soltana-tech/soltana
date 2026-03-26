# Teach

User-authored composition workspace: markdown, visuals, and export — **not** AI-generated sermons
or lessons.

## Relationship to the Study Companion

**Teach** is for **manual** writing: outlines, notes, teaching materials, and personal structure.
The **study companion** (see [companion.md](./companion.md)) assists with research, passages, and
analysis; it does **not** produce finished sermons, homiletic outlines, or lesson manuscripts for
Teach.

Users may copy citations and passages from the reader, insert notes, and export documents they
authored themselves. Product policy and tooling should avoid companion flows that draft Teach-ready
teaching content.

### Enforcement (Companion → Teach)

Implementation must **not** expose:

- Companion **tools or server actions** that write to Teach storage or create Teach documents
- **Endpoints** that return lesson or sermon **draft objects** (e.g. structured homiletic outlines)
  for one-click Teach insertion
- **“Send to Teach”** or **“Generate lesson”** from the companion UI (see [companion-ui.md](./companion-ui.md))

The companion may return **citations and excerpts** that the user **manually** copies into Teach.

See [companion.md](./companion.md) — “Companion–Teach enforcement (implementation).”

## Markdown Editor (planned)

Beginner-friendly with formatting toolbar (bold, italic, headings, lists, links, images). Power
users write raw markdown. Content stored in D1; exportable.

## Apache ECharts Integration (planned)

Embedded charts for visual aids:

- **Timelines** — Simplified in-lesson chronological charts (not the full Historical Timeline app)
- **Genealogy charts** — Family trees of biblical figures
- **Geographic references**
- **Custom data visualizations**

## Composition Workspace (planned)

Structured sections, inline scripture references (auto-linked to reader), exportable output. Framed
as a **writer’s workspace**, not an “AI lesson builder.”

## Status

- **Entirely stubbed** — `TeachDashboard` placeholder at `/teach`
- **Nav link** — Should be removed from the navbar until Phase 5; the route can remain for
  development access but should not be surfaced to users
- **Dependencies** — ECharts not yet added to `package.json`
- **Phase** — Phase 5
