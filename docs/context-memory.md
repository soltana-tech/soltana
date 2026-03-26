# Context and Memory

Rules for **session packets**, **history compaction**, and **what lives in KV vs D1** — so the
companion stays within token limits without hiding retrieved evidence.

## Components Competing for the Window

Typical allocation **order of magnitude** (tune per model and product; not fixed percentages):

| Component | Typical budget | Notes |
| --------- | ---------------- | ----- |
| System prompt + policy | Fixed small slice | Stable; avoid churn |
| Current user message | Small | |
| Retrieved passages + excerpts | **Largest** slice after system | Core evidence |
| Tool results (compact) | Medium | Strip boilerplate; keep ids + short text |
| Prior conversation | Medium → shrinking | Summarize when long |
| Scratch / reasoning | Minimal | Prefer external chain-of-thought storage if used |

Hard cap: **never** exceed provider max; target **~60–70%** of window for evidence + synthesis when
possible.

## Session Study Packet (KV or Durable Object)

- **Contents**: Passage IDs, short text excerpts, retrieval unit ids, translation ids, last rerank
  scores, optional user focus (e.g. “Romans study”).
- **TTL**: **24 hours** default **idle** expiry; **7 days** max if user opts in to “continue session”
  (product decision). Renew TTL on activity.
- **Size**: Bounded byte cap (e.g. **128–256 KiB** compressed pointers + excerpts); overflow stores
  **reference back to D1** by id instead of full text.

## What Stays in D1 vs KV

| Data | D1 | KV / session |
| ---- | -- | ------------ |
| User annotations, notebooks | Yes | No (except cached ids for packet) |
| Corpus passages | Yes | Excerpts only inside packet |
| Companion **answer history** (if persisted) | Optional long-term rows | **Not** required for KV |
| Ephemeral study packet for current thread | No | Yes |

Long-term **conversation log** (if shipped): D1 with **summarized** older turns; full verbatim only
for recent window.

## When Prior Turns Are Summarized

- Trigger when **token count** for history > threshold (e.g. **25–30%** of usable window) or **> N
  turns** (e.g. 10).
- **Summary** keeps: user goals (e.g. “comparing Romans 8 translations”), open questions, resolved
  passage refs — **drops** verbatim assistant prose unless short.
- **Never summarize away** active citations: keep structured refs in a sidecar JSON the model
  must re-read.

## What Gets Compacted

- **Tool traces**: Replace raw JSON with `{ tool, ok, result_ids, one_line_summary }` before
  re-injection into the next model call.
- **Duplicate passages**: One copy per passage id in packet.
- **Reranker scores**: Drop from prompt after selection; keep ids only.

## Re-Ingestion After Compaction

- If the model needs a passage again after compaction, **re-fetch from D1** by id (tool call), do
  not rely on stale prompt text.

## Related Docs

- [companion.md](./companion.md) — Context budgeting overview
- [architecture.md](./architecture.md) — Runtime layers
