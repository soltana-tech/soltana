"""Pipeline CLI for orchestrating source ingestion, transformation, and output."""

import typer
from rich.console import Console

app = typer.Typer(name="soltana-pipeline", help="Soltana ETL pipeline CLI")
console = Console()


@app.command()
def ingest(
    source: str = typer.Option(None, help="Source to ingest (e.g., cfm, oshb, ebible)"),
    all_sources: bool = typer.Option(False, "--all", help="Ingest all sources"),
) -> None:
    """Download and cache raw source files."""
    raise NotImplementedError(f"Ingest not yet implemented for source={source}, all={all_sources}")


@app.command()
def transform(
    source: str = typer.Option(None, help="Source to transform"),
    all_sources: bool = typer.Option(False, "--all", help="Transform all sources"),
) -> None:
    """Parse and normalize raw data into structured format."""
    raise NotImplementedError(
        f"Transform not yet implemented for source={source}, all={all_sources}"
    )


@app.command()
def output(target: str = typer.Argument("d1", help="Output target (d1)")) -> None:
    """Generate output files (SQL seeds for D1)."""
    raise NotImplementedError(f"Output not yet implemented for target={target}")


@app.command()
def validate() -> None:
    """Assert row counts and referential integrity across all sources."""
    raise NotImplementedError("Validate not yet implemented")


@app.command()
def status() -> None:
    """Show last-run date and version per source."""
    raise NotImplementedError("Status not yet implemented")


if __name__ == "__main__":
    app()
