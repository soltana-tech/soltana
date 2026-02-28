<div align="center">

# Soltana

![TanStack Start](https://img.shields.io/badge/TanStack_Start-v1.163-BD93F9?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-BD93F9?logo=typescript&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-v1.4-BD93F9?logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-v0.45-BD93F9?logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-v1.58-BD93F9?logo=playwright&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12%2B-BD93F9?logo=python&logoColor=white)

---

_Open-source academic scripture study platform. Knowledge shared freely._

---

</div>

> [!IMPORTANT]
> This project is currently in pre-release, with the initial release scheduled for January 1, 2027.

## Overview

Soltana is an open-source academic scripture study platform. The target audience spans casual
readers, serious students, seminarians, clergy, and academics. No account is required to read
or browse; authentication unlocks cross-device sync, custom study plans, annotations, and
notebooks.

The near-term scope covers Abrahamic traditions — Christian, Jewish, and Islamic
— with full canonical and extracanonical coverage. The architecture is designed to expand into
Ancient Near Eastern, Zoroastrian, Buddhist, and Hindu traditions in later phases without
requiring structural rework.

Goals:

- Provide a free, open alternative to tools like Blue Letter Bible with better UX and genuine
  multi-faith scope
- Support academic depth (original languages, morphology, cross-references, word study) alongside
  casual reading modes
- Keep corpus data open and auditable — only public domain and permissively licensed translations

See [docs/SCOPE.md](docs/SCOPE.md) for the full vision and corpus roadmap, and
[docs/index.md](docs/index.md) for the phased development roadmap.

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

## License

TBD (MIT or Apache 2.0)
