# soltana-ui Integration

Planned migration from standalone SCSS to the soltana-ui design system.

## Design System

- **Repository** — [soltana-tech/soltana-ui](https://github.com/soltana-tech/soltana-ui)
- **Model** — Theme × relief × finish orthogonal axes

## Migration Plan

1. Register Dracula palette as a custom theme
2. Set relief to `neumorphic`
3. Replace standalone SCSS with soltana-ui component classes

## Current State

- **Standalone SCSS** — Acceptable through Phase 2
- **Dracula neumorphic** — Dark background, accent palette, raised/pressed buttons, glassmorphism
- **Font** — Custom serif (TriniteNo2), Georgia/Times fallback

## Status

- **Not started** — No soltana-ui dependency or integration
- **Phase** — Planned for Phase 4
- **Scope** — Full replacement of `src/shared/styles/` with soltana-ui
