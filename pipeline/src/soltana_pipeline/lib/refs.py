"""Reference system normalization utilities."""


def normalize_bible_ref(book: str, chapter: int, verse: int | None = None) -> dict:
    """Normalize a biblical reference to the standard ref JSON format."""
    ref: dict = {"book": book, "chapter": chapter}
    if verse is not None:
        ref["verse"] = verse
    return ref
