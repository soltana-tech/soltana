# Scripture Reader

Layout config, annotations, notebooks, footnotes, and reading experience.

## Reading Configuration (planned)

Per-user, stored in D1 `user_preferences`:

- **Layout** — Single or double column
- **Footnote/commentary placement** — Bottom of page, middle column, or sidebar
- **Font size**
- **Red-letter** — Dialogue of Jesus in red
- **Display mode** — Dialogue, poetry, scripture quotations
- **Reading theme** — Can differ from site theme (e.g., sepia on dark site)

## Annotations (planned)

- Highlighting (multiple colors)
- Underlining
- Notes (free-text)
- Links to other scriptures (internal cross-references, user-created)
- External links (personal footnotes)

Schema: `annotations`, `annotation_tags` tables. Auth required.

## Notebooks and Tagging (planned)

- Verses/annotations tagged with user-defined tags
- Annotations grouped into notebooks (e.g., "Atonement Journal")
- Filter by notebook, tag, book, or date range

Schema: `notebooks`, `notebook_entries`, `annotation_tags`.

## Footnotes and Commentaries (planned)

Users configure which footnotes/commentaries to display and where. Initially: LDS cross-references,
JST footnotes. Future: Strong's, morphology, third-party commentaries.

## Status

- **Entirely stubbed** — `PassageView` placeholder at `read/$corpus.$book.$chapter`
- **PassageView** — Renders corpus/book/chapter params; "Scripture text will appear here once
  corpus data is loaded into D1"
- **Corpus in D1** — Phase 2 (eBible ingestion via pipeline)
- **Annotation CRUD** — Phase 2
