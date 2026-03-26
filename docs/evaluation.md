# Study Companion Evaluation

Regression tests, golden sets, and quality bars for retrieval and answers — first-class quality, not
ad hoc prompt tweaking alone.

## Principles

- **Small and growing**: start with tens of cases per category, expand with failures from production
  or staging logs.
- **Versioned fixtures**: cases live in-repo (JSON or SQL seeds) with corpus and embedding version
  metadata.
- **CI gate**: subset of smoke tests on every change to retrieval or prompts; full suite nightly or
  pre-release.

## Fixture Categories

| Category | What it checks | Examples |
| -------- | -------------- | -------- |
| Exact reference | Resolver returns correct passage IDs | `John 3:16`, multi-verse ranges |
| Semantic retrieval | Top-k contains expected verses for topic queries | “comfort in suffering” (gold list) |
| Title / entity expansion | Retrieval uses aliases and titles, not only one string | Christological titles |
| Translation comparison | Claims match aligned verses / notes | KJV vs WEB on selected passages |
| Citation faithfulness | Answer cites only retrieved or allowed sources | No phantom verses |
| Refusal / redirect | Sermon or lesson-draft requests get study-shaped response | No full homiletic outline |
| Disputed topics | Multiple attributed positions, no false consensus | Sample controversial prompts |

## Golden Query Sets

Each case includes:

- **Input** — User message (and optional session stub)
- **Expected passage IDs or ref keys** — For retrieval-heavy cases
- **Expected citations** — Minimum set of sources that must appear in structured output
- **Forbidden patterns** — Regex or substring list (e.g. “three-point sermon,” “closing invitation”)
- **Corpus version** — Seed or pipeline build id the case was validated against

## Refusal Tests

- User asks for a **sermon manuscript**, **fill-in lesson**, or **altar-call** language: response must
  **redirect** to study modes (passages, questions, attributed views) without producing the forbidden
  artifact.
- Assertions combine **structured output** (JSON tool shape) and **optional** LLM-as-judge only where
  necessary — prefer deterministic checks first.

## Translation and Fact-Check Cases

- Pairs of **translation claims** with **gold judgments** (e.g. “literal vs dynamic equivalence in
  this clause”) where sources are fixed.
- **Historical** claims: expect **uncertainty** or **source citation**, not fabricated precision.

## Target Pass Thresholds (Initial)

Thresholds are **starting points**; tune with baseline runs:

| Suite | Initial target | Notes |
| ----- | -------------- | ----- |
| Exact reference | ≥ 98% | High bar; failures are bugs |
| Retrieval top-5 recall (gold) | ≥ 80% | Improve as ontology matures |
| Citation faithfulness (no hallucinated refs) | ≥ 95% | |
| Refusal / redirect | ≥ 90% | Subjective edge cases reviewed manually |

Failing thresholds blocks release of companion or retrieval changes until fixed or cases updated
with explicit rationale.

## Regression Workflow

1. **Add a case** when fixing a bug or receiving a user report (minimal repro).
2. **Run** eval suite locally and in CI.
3. **On corpus or embedding bump**, re-run full suite; **refresh** expected IDs if segmentation
   changed; document in changelog.

## Related Docs

- Policy and categories: [companion.md](./companion.md)
- Ontology and gold lists for titles: [ontology.md](./ontology.md)
