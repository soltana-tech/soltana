# soltana-ui

Strategy for building and integrating the soltana-ui design system alongside Soltana.

## Design System

- **Repository** — [soltana-tech/soltana-ui](https://github.com/soltana-tech/soltana-ui)
- **Model** — Theme × relief × finish orthogonal axes (e.g. Dracula + neumorphic + gloss)
- **User-selectable** — Users choose their display mode; neumorphic is opt-in, not imposed

## Strategy: Dogfood, Don't Migrate

soltana-ui is built from Soltana's real component needs — not designed speculatively and
adopted later. Soltana is the primary consumer of soltana-ui and drives what gets built in it.

The workflow:

1. Build a component in Soltana's standalone SCSS as normal
2. Once the component is stable and its API is clear, extract it into soltana-ui
3. Replace the local SCSS with the soltana-ui equivalent in the same pass
4. Repeat — soltana-ui grows incrementally from proven usage

This avoids two failure modes:

- A design system built in isolation that doesn't fit the actual product
- A big-bang migration that accumulates debt and gets deferred indefinitely

soltana-ui should never block forward progress on Soltana. If a component isn't ready for
extraction, keep the local SCSS and extract it later.

## Design Tokens First

Before extracting components, establish the design token layer in soltana-ui:

- Color palette (Dracula as the default theme)
- Typography scale and font variables (TriniteNo2, Georgia/Times fallback)
- Spacing and sizing scale
- Relief variants (neumorphic, matte) as CSS class modifiers

Once tokens are in place, extracted components compose from them and theme-switching works
automatically.

## Current State

- **Standalone SCSS** — Active; all styles currently live in `src/shared/styles/`
- **Dracula neumorphic** — Dark background, accent palette, raised/pressed buttons, glassmorphism
- **soltana-ui** — Not yet integrated; extraction begins when first component stabilizes

## Status

- **Design tokens** — Not yet defined in soltana-ui; first extraction pass establishes these
- **Components extracted** — None yet
- **Integration** — No soltana-ui dependency in `apps/web` yet
