# Study Companion

Academic scripture companion: retrieval, synthesis, policy, and separation from Teach.

## Role

The study companion is a **citation-grounded research assistant** — not a substitute for teachers,
pastors, or user-authored lessons. It explains passages, retrieves related verses, compares
translations, surfaces interpretive options with attribution, and suggests study questions.

It does **not** produce sermon manuscripts, polished homiletic outlines, altar-call rhetoric, or
finished lesson plans. Those belong in **Teach**, written by the user.

## Architecture Placement

Runtime pieces (see [architecture.md](./architecture.md)):

- **LLM gateway** — Inference via Workers AI and/or external APIs; one integration surface.
- **Retrieval orchestrator** — Chooses lexical vs semantic vs graph-backed paths; assembles a bounded
  study packet.
- **Embedding pipeline** — Build-time and incremental updates into Cloudflare Vectorize (see
  [search.md](./search.md)).
- **Policy layer** — Task classification, allowed/disallowed output classes, citation requirements;
  not implemented by system prompt alone.
- **Session / context manager** — Bounded working memory: retrieved passages + excerpts, compact
  history, optional cache (KV) for follow-up in the same study session.
- **Citation / provenance records** — Links answers to passage IDs, translation IDs, and source
  document IDs where applicable.

Optional later: lightweight moderation or second-pass policy check; small classifier for intent
routing.

## Retrieval Before Synthesis (RAG-First, Scoped Context Second)

Search and companion behavior are related but **not identical**. Hybrid retrieval (exact reference,
FTS5, embeddings, cross-references, entity/title expansion, reranking) feeds a **scoped study
packet**; **long context is for reasoning over that packet**, not for loading entire corpora each
request. Same pattern as “retrieve → assemble bounded context → synthesize,” not full-corpus
in-context loading every turn.

## Orchestration

Prefer a **small, deterministic tool router** (classify intent → fixed tool set → retrieve →
synthesize → policy pass) over an open-ended autonomous agent. The companion’s job is to pick
retrieval and analysis paths, not to roam freely.

Planned **tool surface** (illustrative; schemas should stay narrow and inspectable). **Exclude** any
tool that writes to Teach or returns lesson or sermon draft payloads:

- Scripture reference resolver; semantic / hybrid verse retriever
- Topic and entity / title expansion (graph-backed where data exists)
- Translation comparison; lexicon / morphology (when corpus supports it)
- Commentary or academic chunk retriever; user notes retriever (scoped per user)
- Citation or provenance helper; output policy / task classifier

Fully automated “citation verification” of free-form claims is limited; treat provenance as
**structured source IDs + tests + spot checks**, not infallible mechanical verification.

## Fact-Check Classes

Different question types need different sources and confidence labeling:

- **Scripture-internal** — Citation correctness, whether a claim appears in the text, faithful
  paraphrase vs overreading
- **Translation** — Whether a nuance is translation-specific; alignment across translations
- **Historical / academic** — Authorship, dating, manuscript issues, geography; always secondary
  sources and explicit uncertainty where scholarship disagrees

## Policy (Product + System)

Allowed emphasis: observation, context, parallel passages, translation notes, attributed
interpretations, uncertainty where scholarship disagrees.

Disallowed or tightly constrained: sermon drafting, delivery-optimized outlines, impersonating
divine authority, presenting disputed views as settled fact without attribution.

For **disputed** topics, prefer attributed framing (“many evangelical commentaries…,” “critical
scholarship often…,” “patristic readings tend to…”) instead of a single synthetic authoritative
voice.

## Default Answer Shape

Substantive answers should expose grounding, for example:

- Direct response to the question
- Cited passages and sources
- Brief note on **why** retrieved material matched (when non-obvious)
- Translation or interpretation caveats
- Contested points and uncertainty
- Study prompts or next passages to read

## Context Budgeting

System prompt, tools, retrieved resources, conversation history, and tool outputs **share one
context window**. Disciplined habits: compact tool traces before re-injection, summarized long
prior turns, only relevant passages and excerpts in the live window, larger artifacts stored
outside the prompt (session cache, D1, R2) when needed.

**Concrete rules** (TTL, KV vs D1, summarization triggers): [context-memory.md](./context-memory.md).

## Fine-Tuning

**Not** the primary lever for knowledge, citations, or private user content. **Optional later** for
intent routing, tone consistency, or small adapters — after retrieval, tools, prompts, and
evaluations are in place.

## Evaluation (Summary)

Suites, thresholds, regression: [evaluation.md](./evaluation.md). Entity and title expansion spec:
[ontology.md](./ontology.md). Session packets and compaction: [context-memory.md](./context-memory.md).

## Teach Module Boundary

**Teach** remains a **user-authored** workspace (markdown, structure, export). Users may paste or
import citations and notes from the reader; the companion does not author Teach content or tools
that emit finished lessons or sermons. See [teach.md](./teach.md).

### Companion–Teach Enforcement (Implementation)

Policy is enforced in **architecture and APIs**, not only in prompts:

- **No companion tools** that write to Teach documents, create Teach drafts, or append blocks to
  lesson content.
- **No API** that returns **lesson-outline** or **sermon-manuscript** structured objects intended for
  direct insertion into Teach (e.g. JSON schema for “three-point sermon” or “fill-in lesson”).
- **No** “insert into Teach” or “generate lesson draft” **actions** in companion tool chains or
  responses.
- **Copy** flows may expose **citations and excerpts** for the user to paste manually into Teach.

UI expectations: [companion-ui.md](./companion-ui.md).

## Status

- **Not implemented** — Scaffold and docs only; no inference or companion UI in production yet.
