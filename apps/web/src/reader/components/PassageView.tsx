interface PassageViewProps {
  corpus: string;
  book: string;
  chapter: string;
}

export function PassageView({ corpus, book, chapter }: PassageViewProps) {
  return (
    <div className="reader-stub">
      <h1>
        {book} {chapter}
      </h1>
      <p>
        Corpus: <strong>{corpus}</strong>
      </p>
      <p>Scripture text will appear here once corpus data is loaded into D1.</p>
    </div>
  );
}
