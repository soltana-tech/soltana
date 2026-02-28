<div align="center">

# Soltana

![TanStack Start](https://img.shields.io/badge/TanStack_Start-SSR-FF4154?logo=react&logoColor=white)
![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1_/_Pages-F38020?logo=cloudflare&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black)
![Better Auth](https://img.shields.io/badge/Better_Auth-self--hosted-6366F1?logoColor=white)
![uv](https://img.shields.io/badge/uv-Python_ETL-DE5FE9?logo=astral&logoColor=white)

---

_Open-source academic scripture study platform._

---

</div>

## Overview

Soltana is an open-source academic scripture study platform serving casual readers, serious
students, seminarians, clergy, and academics. See [docs/SCOPE.md](docs/SCOPE.md) for the full
vision and [docs/index.md](docs/index.md) for the roadmap and documentation index.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Web framework | TanStack Start (SSR), React 19, TypeScript 5.9 |
| Database | Cloudflare D1 (SQLite at the edge), Drizzle ORM |
| Auth | Better Auth (self-hosted, email/password + OAuth) |
| Deployment | Cloudflare Pages, Cloudflare Workers |
| Styling | SCSS, Dracula neumorphic design system |
| Scrapers | Playwright, TypeScript |
| Pipeline | Python, uv, DuckDB, Polars |
| Monorepo | pnpm workspaces |

## Monorepo Structure

```text
soltana/
├── apps/web/       # TanStack Start app (SSR, Cloudflare Pages)
├── scrapers/       # Playwright scrapers (TypeScript)
├── pipeline/       # ETL pipeline (Python, uv)
└── docs/           # Documentation
```

## Development

```bash
# Install dependencies
pnpm install

# Start the web app
pnpm dev

# Run scrapers
pnpm --filter @soltana/scrapers cfm

# Pipeline CLI
cd pipeline && uv run soltana-pipeline --help
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run linters |
| `pnpm --filter @soltana/web type-check` | TypeScript type check |
| `pnpm --filter @soltana/web db:generate` | Generate Drizzle migrations |

## License

TBD (MIT or Apache 2.0)
