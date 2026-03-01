import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/read/')({
  component: ReaderIndexPage,
});

function ReaderIndexPage() {
  return (
    <div className="page">
      <h1>Scripture Reader</h1>
      <p>
        The scripture reader will provide a configurable, annotatable reading experience with
        support for multiple translations, cross-references, and word study tools.
      </p>
      <p>This section is under development.</p>
    </div>
  );
}
