# Study Companion UI / UX

User-facing behavior for the companion (when implemented) — academic **transparency**, not only
policy text in docs.

## Citations

- **Inline or block** citations with **tap to open** passage in reader (translation + ref).
- **Primary source first**: scripture, then lexicon/commentary as labeled layers.
- **Distinguish** quotation vs paraphrase vs summary; mark AI summary when not a direct quote.

## Source Grouping

- Group by **source type** (Scripture, lexicon, commentary, user note) with collapsible sections.
- **Multiple translations**: show **side-by-side** or tabbed per passage, not a single blended blob.

## Disputed Interpretation

- **Multiple bullets** with labels: e.g. “Common in evangelical readings,” “Critical scholarship,”
  “Early church” — avoid a single undifferentiated paragraph.
- **No** false equivalence: if evidence weight differs, say so briefly.

## Refusal and Redirection

- When the user asks for **sermon or lesson** content: **short** explanation that the companion
  supports **study** (passages, questions, comparisons) and **one** concrete next step (e.g. “Show
  passages on hope in Romans 8”).
- **No** preachy tone in the refusal; keep neutral and helpful.

## Confidence and Fact-Check Labels

- **Scripture-internal**: “Stated in text” / “Implied” / “Interpretive” (distinct styling).
- **Translation**: “Wording differs across translations” / “Greek lemma supports range X–Y.”
- **Historical / academic**: “Disputed among scholars” / “Broad consensus” / “Source: [name]” with
  link to resource metadata when available.

## Teach Boundary (UI)

- **No** “Send to Teach as draft” or “Generate lesson” button on companion responses.
- **Copy** actions copy **citations or excerpts** only; Teach remains the user’s editor. See
  [teach.md](./teach.md) and companion–Teach enforcement in [companion.md](./companion.md).

## Status

- **Not implemented** — Spec only; no production companion UI yet.
