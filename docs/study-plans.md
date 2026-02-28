# Study Plans

Built-in plans, custom plans, progress tracking, and CFM timeline.

## Built-in Plans

- **Come, Follow Me 2026 Old Testament** — Fully functional; migrated from original timeline app
- **Bible in a Year** — Placeholder
- **Bible in 90 Days** — Placeholder
- **Book of Mormon in 90 Days** — Placeholder
- **Additional CFM plans** — Placeholder (future ingestion from churchofjesuschrist.org)

## Custom Plans (Phase 2)

Auth required. Users choose scripture ranges or passages, set a time period; system distributes
reading across days. Not yet implemented.

## Progress Tracking

- **Unauthenticated** — localStorage (`soltana-read-days`); `useReadingProgress` hook
- **Authenticated** — D1 via server functions (planned)
- **First sign-in** — One-time prompt to migrate localStorage progress to D1

## CfmTimeline Component

- **Location** — `src/study-plans/components/CfmTimeline.tsx`
- **View toggle** — Lesson Order vs Chronological (persisted in localStorage `soltana-view-mode`)
- **Day buttons** — Per-day reading chunks; click to toggle read/unread
- **Data** — `weeks.json`, `chronologicalOrder.json` in `src/study-plans/data/`

## Routes

- `/plans` — Plan list (PlanList, PlanCard)
- `/plans/$planId` — Plan detail; CFM 2026 renders CfmTimeline, others show placeholder

## Status

- **CFM 2026** — Fully functional
- **Other plans** — Placeholder cards only
- **D1 progress** — Schema exists; server integration not yet wired
- **localStorage migration** — Planned for first sign-in flow
