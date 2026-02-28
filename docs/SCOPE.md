# Soltana: Vision and Scope

## Identity

- **Project name**: Soltana
- **GitHub org**: [soltana-tech](https://github.com/soltana-tech)
- **Repository**: [soltana-tech/soltana](https://github.com/soltana-tech/soltana)
- **Design system**: [soltana-tech/soltana-ui](https://github.com/soltana-tech/soltana-ui)

---

## Vision

Soltana is an open-source academic scripture study platform and teaching tool. The near-term focus
is Abrahamic traditions (Christian, Jewish, Islamic) with full canonical and extracanonical scope.
The architecture is designed from day one to support a multi-tradition expansion
(Ancient Near Eastern → Zoroastrian → Buddhist → Hindu) without rework.

The platform serves casual readers, serious students, seminarians, clergy, and academics. Sign-in
is never required to read or browse. Authentication unlocks persistence features (cross-device sync,
custom plans, annotations, notebooks).

The goal is to be the modern, free, open-source alternative to tools like Blue Letter Bible — with
better UX, genuine multi-faith scope, and academic depth — while occupying a space that Logos
(expensive, desktop-first) and YouVersion (consumer-focused, no academic tools) do not.

---

## Open Source

Soltana is and will remain open source under a permissive license (MIT or Apache 2.0, TBD).

Foundation affiliation is not currently planned but warrants investigation as the project matures. Candidates:

- **Software Freedom Conservancy (SFC)**: Most plausible fit if formal governance becomes necessary.
- **OpenScriptures**: Existing GitHub organization doing open scripture data work; contributing
  corpus data back while keeping the platform under soltana-tech is worth exploring.
- **NumFOCUS**: If the academic/data angle becomes primary.

No foundation affiliation should be pursued until the project has meaningful adoption.

---

## Corpus Scope

### Sequencing Principle

Each tradition tier should only be added when the previous tier is genuinely excellent — not as
placeholder content. A user arriving for Talmud study and finding placeholder-quality coverage will
leave for Sefaria. Quality per tradition in sequence is preferable to breadth with uneven depth.

### Phase 1–2: Abrahamic (Christian + LDS)

**Canonical:**

- Old Testament / Hebrew Bible (KJV, ASV, WEB, Darby — open/public domain)
- New Testament
- Book of Mormon, Doctrine and Covenants, Pearl of Great Price (LDS standard works)

**Extracanonical and deuterocanonical:**

- Catholic/Orthodox deuterocanon: Tobit, Judith, 1–2 Maccabees, Wisdom of Solomon, Sirach,
  Baruch, Prayer of Manasseh, 1–2 Esdras, 3–4 Maccabees, Psalm 151, additions to Esther and Daniel
- Pseudepigrapha: 1 Enoch, Book of Jubilees, Testaments of the Twelve Patriarchs, 4 Ezra,
  Apocalypse of Abraham, Letter of Aristeas
- Dead Sea Scrolls: selected texts from the Leon Levy DSS Digital Library
- Apostolic Fathers: Clement, Ignatius, Polycarp, Didache, Shepherd of Hermas (CCEL)
- Early Christian writings: Nag Hammadi library (Gospel of Thomas, etc.)

### Phase 2–3: Jewish + Islamic

- Tanakh (same source as OT, distinct canonical boundaries)
- Talmud Bavli, Mishnah, Tosefta via Sefaria
- Quran (multiple open translations) via Tanzil

### Phase 3: Ancient Near Eastern Parallels

Not scripture in a religious sense, but essential for comparative academic study alongside Genesis:

- Epic of Gilgamesh, Enuma Elish, Atrahasis, other Sumerian and Akkadian texts

### Phase 3–4: Zoroastrian

The Avesta has genuine scholarly connections to early Abrahamic material (eschatology, angelology):

- Gathas, Yasna, Yashts, Vendidad

### Phase 4: Buddhist

- Dhammapada, Sutta Pitaka, Vinaya Pitaka, Abhidhamma Pitaka (Pali Canon via SuttaCentral)

### Phase 5: Hindu

Hindu scripture is vast. Add only once previous tiers are excellent. Entry point: Bhagavad Gita, then Upanishads.

### Translation Licensing

Most modern translations (NIV, ESV, NASB, NLT) are strictly licensed. Only open/public domain translations are used:

| Translation | Notes |
| ----------- | ----- |
| KJV | Public domain; LDS official English translation |
| ASV | Public domain |
| WEB — World English Bible | Public domain, modern English |
| Darby | Public domain |
| YLT — Young's Literal Translation | Public domain |

---

## Design

### Current: Dracula Neumorphic

- Dark background (`#0b0d17` through `#1f2350`)
- Dracula-inspired accent palette (cyan, green, orange, pink, purple)
- Neumorphic raised/pressed button states
- Glassmorphism (backdrop blur, transparency)
- Custom serif font (TriniteNo2), Georgia/Times New Roman fallback

**Future: soltana-ui** — see [soltana-ui.md](./soltana-ui.md) for the migration plan.
