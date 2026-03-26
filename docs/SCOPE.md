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

### Study companion and Teach

An **AI study companion** (planned) should behave as an **academic assistant**: citation-grounded
passage retrieval, translation comparison, attributed interpretive options, and study prompts — not
as a substitute for live teaching or user composition. **Teach** remains a **user-authored**
workspace for notes, lessons, and exportable documents; the companion does not generate finished
sermons or lesson manuscripts for that workspace. See [companion.md](./companion.md) and
[teach.md](./teach.md).

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
leave for a dedicated tool. Quality per tradition in sequence is preferable to breadth with uneven depth.

### Christian

**Canonical:**

- Old Testament / Hebrew Bible (KJV, ASV, WEB, Darby, YLT — public domain)
- New Testament

**Extracanonical and deuterocanonical:**

- Catholic/Orthodox deuterocanon: Tobit, Judith, 1–2 Maccabees, Wisdom of Solomon, Sirach,
  Baruch, Prayer of Manasseh, 1–2 Esdras, 3–4 Maccabees, Psalm 151, additions to Esther and Daniel
- Pseudepigrapha: 1 Enoch, Book of Jubilees, Testaments of the Twelve Patriarchs, 4 Ezra,
  Apocalypse of Abraham, Letter of Aristeas (Project Gutenberg, public domain)
- Apostolic Fathers: Clement, Ignatius, Polycarp, Didache, Shepherd of Hermas (CCEL, public domain)
- Early Christian writings: Nag Hammadi library (Gospel of Thomas, etc.) — the standard English
  edition (Robinson, ed., HarperCollins) is copyrighted; older individual translations vary by text.
  The Coptic source texts are ancient and uncopyrightable. Licensing must be assessed per text
  before ingestion; external links in the reader are the interim approach.

**Dead Sea Scrolls:**

The 223 biblical scrolls are covered by [dssenglishbible.com](https://dssenglishbible.com) by
Craig Davis (`chdavis29@gmail.com`), a software engineer who transcribed each scroll from public
manuscript images and built a color-coded variant apparatus showing textual differences from the
Masoretic Text. The base English text is the WEB (public domain); the scholarly value is Davis's
transcription work and variant identification, which have no stated open license.

The WEB alone does not provide DSS coverage — it is a translation of the traditional MT, not the
scrolls. Without Davis's transcriptions (or a comparable source), there is no redistributable
scroll-by-scroll DSS dataset available. In the interim, the reader links externally to his site.
The path to ingestion is a direct permission request to Davis; he is a strong candidate given his
deliberate use of public domain materials throughout the project. See [pipeline.md](./pipeline.md).

**LDS Standard Works (licensing required):**

- Book of Mormon, Doctrine and Covenants, Pearl of Great Price (current edition © Intellectual Reserve, Inc.)
- The 1830 first edition of the Book of Mormon is public domain (Project Gutenberg) and serves
  as an interim source for BoM text. D&C and Pearl of Great Price have no public domain equivalents.
- Path: Contact IRI at [intellectualreserve.org](https://www.intellectualreserve.org) for
  educational/non-commercial open-source licensing.

### Jewish

**Tanakh:**

The Tanakh shares source text with the Christian OT but uses distinct canonical ordering and
Jewish translation tradition. The following public domain translations are used — no Sefaria dependency:

- **Leeser (1853)** — _The Twenty-Four Books of the Holy Scriptures_ by Isaac Leeser. First
  complete English translation of the Hebrew Bible by a Jewish scholar. Public domain, available
  via Project Gutenberg.
- **JPS 1917** — _The Holy Scriptures According to the Masoretic Text_ by the Jewish Publication
  Society. Public domain in the US, available via Project Gutenberg and Wikisource.
- **Benisch (1851–1861)** — _Jewish School and Family Bible_ by Abraham Benisch. Public domain.
  Available as supplementary coverage.

**Talmud and Mishnah:**

- **Rodkinson (1896–1903)** — English translation of the Babylonian Talmud by Michael L. Rodkinson.
  Partial (~10 of 63 tractates) but fully public domain. Available via Project Gutenberg.
- **Danby (1933)** — _The Mishnah_ by Herbert Danby. Likely public domain in the US if copyright
  was not renewed (verifiable via the Stanford Copyright Renewal Database); public domain in the
  UK since 2023 (author died 1953). Worth verifying before ingestion.
- For tractates not covered by PD translations, the reader links externally to Sefaria. Sefaria's
  Hebrew/Aramaic source text is public domain and may be ingested independently if a clean digital
  encoding is needed.

### Islamic

- Quran (Arabic) via Tanzil — digital encoding carries a non-commercial restriction; the Arabic
  text itself is public domain. Acceptable for a non-commercial platform; reassess if monetization
  is introduced.
- Multiple public domain English translations of the Quran exist (Rodwell 1861, Sale 1734, Palmer
  1880) and are available via Project Gutenberg.

### Ancient Near Eastern Parallels

Not scripture in a religious sense, but essential for comparative academic study alongside Genesis:

- Epic of Gilgamesh, Enuma Elish, Atrahasis, other Sumerian and Akkadian texts
- Public domain English translations via Project Gutenberg (George Smith, R.W. Rogers, etc.)

### Zoroastrian

The Avesta has genuine scholarly connections to early Abrahamic material (eschatology, angelology):

- Gathas, Yasna, Yashts, Vendidad via Avesta.org (public domain translations)

### Buddhist

- Dhammapada, Sutta Pitaka, Vinaya Pitaka, Abhidhamma Pitaka (Pali Canon via SuttaCentral — CC0)

### Hindu

Hindu scripture is vast. Add only once previous tiers are excellent. Entry point: Bhagavad Gita,
then Upanishads. Multiple public domain English translations exist (Edwin Arnold, etc.).

---

## Translation Licensing

### Open / Public Domain

All ingested translations must be public domain or carry a permissive license compatible with
open-source redistribution. Modern translations (NIV, ESV, NASB, NLT, NLV, NRSV) are strictly
licensed and are not used.

| Translation | Tradition | Notes |
| ----------- | --------- | ----- |
| KJV | Christian | Public domain |
| ASV | Christian | Public domain |
| WEB — World English Bible | Christian | Public domain, modern English |
| Darby | Christian | Public domain |
| YLT — Young's Literal Translation | Christian | Public domain |
| Leeser (1853) | Jewish | Public domain |
| JPS 1917 | Jewish | Public domain (US) |
| Benisch (1851–1861) | Jewish | Public domain |
| Rodkinson Talmud (1896–1903) | Jewish | Public domain |
| Rodwell Quran (1861) | Islamic | Public domain |
| Sale Quran (1734) | Islamic | Public domain |
| Avesta translations | Zoroastrian | Public domain |
| SuttaCentral root texts | Buddhist | CC0 |

### Licensing Required

Corpora that are in scope but cannot be distributed until rights are resolved. Do not ingest these
sources into SQL seeds until the obtention path is completed.

| Corpus | Restriction | Obtention Path |
| ------ | ----------- | -------------- |
| Book of Mormon (current LDS edition) | © Intellectual Reserve, Inc. | Use 1830 PD edition as interim; contact IRI for current edition |
| Doctrine & Covenants | © Intellectual Reserve, Inc. | Contact IRI; no PD equivalent |
| Pearl of Great Price | © Intellectual Reserve, Inc. | Contact IRI; no PD equivalent |
| DSS variant apparatus (dssenglishbible.com) | No stated license; author's editorial work | Contact author directly for open-source permission |
| Sefaria English translations | Individual translator copyrights vary | Identify CC-licensed Sefaria texts individually; use PD alternatives otherwise |

---

## Design

### Current: Dracula Neumorphic

- Dark background (`#0b0d17` through `#1f2350`)
- Dracula-inspired accent palette (cyan, green, orange, pink, purple)
- Neumorphic raised/pressed button states
- Glassmorphism (backdrop blur, transparency)
- Custom serif font (TriniteNo2), Georgia/Times New Roman fallback

**soltana-ui** — built incrementally by extracting stable components from Soltana's own SCSS. See
[soltana-ui.md](./soltana-ui.md) for the strategy.
