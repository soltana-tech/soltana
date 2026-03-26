# soltana-ui

Strategy for building and integrating the soltana-ui design system alongside Soltana.

## Design System

- **Repository** — [soltana-tech/soltana-ui](https://github.com/soltana-tech/soltana-ui)
- **Model** — Theme × relief × finish orthogonal axes (e.g. Dracula + neumorphic + frosted)
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

## Local Development Linkage

During development, soltana consumes soltana-ui from the local filesystem so that changes
in either repo are reflected immediately without publishing.

### How it works

```json
// apps/web/package.json
"soltana-ui": "link:/home/scott/Repos/soltana-ui/packages/soltana-ui"
```

pnpm's `link:` protocol creates a symlink from `node_modules/soltana-ui` to the soltana-ui
source directory. Two imports flow through this symlink:

| Import | Resolves to | Purpose |
| ------ | ----------- | ------- |
| `import { initSoltana } from 'soltana-ui'` | `dist/soltana-ui.js` | JS runtime (theme init) |
| `import soltanaCss from 'soltana-ui/scss?url'` | `src/styles/index.scss` | SCSS source for Vite to compile |

The `soltana-ui/scss` export points to **raw SCSS source** (`src/styles/index.scss`), not
pre-built CSS. Vite compiles it using soltana's own `sass` devDependency, which means:

- Editing any `.scss` file in soltana-ui triggers Vite HMR in soltana instantly
- No `pnpm build` in soltana-ui needed for style changes during development
- JS changes (`initSoltana`, enhancers) still require `pnpm build` in soltana-ui since
  soltana imports from `dist/`

### Cascade order

Stylesheets load in this order (set in `__root.tsx` head links):

1. `soltana-ui/scss` — base design system tokens, relief/finish mechanics, components
2. `main.scss` — Dracula overrides (`_dracula-overrides.scss`), then soltana-specific styles

This ensures soltana's overrides always win.

### Typography: where sizing should live

Component styles in `soltana-ui` often set typography directly on their own selectors (for example
`.table th`, `.action-item-label`). Those selectors can have higher specificity than utility
classes like `.text-sm` or they may be declared later in the cascade, which means adding `.text-*`
classes to individual elements does not reliably override component sizing.

Guidelines:

- **Use `.text-*` utilities** when the element is not already sized by a component selector.
- **Change the component** (in `soltana-ui`) when a component’s default sizing is wrong globally.
- **Change the feature stylesheet** (in Soltana) when a single feature needs component-specific
  sizing (e.g. CFM table header size).

### Dracula theme overrides

`src/shared/styles/_dracula-overrides.scss` maps Soltana's Dracula color palette onto
soltana-ui's CSS custom property contract (e.g. `--accent-primary: #8be9fd`). This file
loads first within `main.scss` via `@use 'dracula-overrides'`.

### What changes for production

When soltana-ui is published to npm, two things change:

| | Development | Production |
| - | ----------- | ---------- |
| **Dependency** | `"soltana-ui": "link:..."` | `"soltana-ui": "^x.y.z"` |
| **CSS import** | `soltana-ui/scss?url` (SCSS source) | `soltana-ui/css?url` (pre-built CSS) |

Concretely:

1. **`apps/web/package.json`** — replace `link:` with a semver range
2. **`src/routes/__root.tsx`** — change the import from `soltana-ui/scss?url` to
   `soltana-ui/css?url`
3. **`sass` devDependency** — no longer needed for soltana-ui compilation (still needed for
   soltana's own SCSS)

No other files change. The JS import (`import { initSoltana } from 'soltana-ui'`) and
`_dracula-overrides.scss` work identically in both modes.

## Design Tokens

soltana-ui's token layer is established and active. Soltana overrides the default dark theme
via `_dracula-overrides.scss`, covering:

- Surface colors (navy background ramp)
- Text hierarchy (Dracula foreground)
- Accent palette (cyan, purple, pink)
- Semantic colors (success, warning, error, info)
- Neumorphic shadow/highlight channels
- Glass/mesh gradient colors
- Font stack (Georgia/serif over soltana-ui's default Raleway)

## Components Extracted

| soltana-ui component | soltana usage | File |
| -------------------- | ------------- | ---- |
| `.table`, `.table-panel`, `.table-scroll` | CFM study plan table | `_tables.scss` |
| `.row-bg`, `.row-overlay` | Row background art + hover gradient | `_tables.scss` |
| `.action-list`, `.action-item` | Daily reading buttons | `_action-list.scss` |
| `.fab`, `.fab-extended`, `.fab-controlled` | Scroll-to-week + sort FABs | `_buttons.scss` |

Components not yet extracted (still local SCSS): `.page`, `.card`, `.badge`, `.icon-btn`,
navbar, landing page.

## Status

- **Design tokens** — Active; Dracula overrides applied via `_dracula-overrides.scss`
- **Components extracted** — Tables, action lists, FABs
- **Integration** — `link:` dependency in `apps/web`; SCSS source consumed for live HMR
- **Visual parity** — Confirmed via Playwright before/after screenshots
