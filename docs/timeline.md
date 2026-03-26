# Historical Timeline

Interactive zoomable timeline with people, places, and events across faith traditions.

## Implementation: D3.js (not ECharts)

Custom D3.js visualization for full control over zoom, layout, and rendering. ECharts is used in
the Teach section for lesson charts; the timeline is a standalone application.

## Core Capabilities (planned)

- **Zoomable time axis** — Geological/cosmological scale down to individual years
- **People, places, events** — First-class typed entities
- **Entity detail** — Click to open sidebar (desktop) or modal (mobile) with full detail, linked
  sources, links to scripture readings
- **Search** — Find "Abraham" and see all related timeline entries across traditions
- **Filterable** — By faith tradition and interpretive perspective
- **Compare mode** — Multiple timelines side by side (e.g., biblical conservative vs historical-critical consensus)

## Perspective Layers

The same event (e.g., Exodus) may have multiple dated entries under different perspectives:

- Traditional / biblical conservative
- Historical-critical scholarly consensus
- LDS prophetic chronology

These are first-class data attributes. Ambiguity and scholarly disagreement are modeled in the schema, not flattened.

## Data Model (planned)

- **timeline_events** — id, entity_type (person|place|event), name, description, ...
- **event_datings** — id, event_id, perspective, date_start, date_end, certainty, source

## Status

- **Stubbed** — Route at `/timeline` with placeholder text
- **Data model design** — Precedes implementation; schema not yet in D1
- **Phase** — Phase 5: data model, initial OT event dataset, D3.js implementation,
  cross-tradition comparative view, and perspective layers; depends on corpus being stable in D1
