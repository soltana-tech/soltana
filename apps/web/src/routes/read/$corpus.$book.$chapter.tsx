import { createFileRoute } from '@tanstack/react-router';

import { PassageView } from '~/reader/components/PassageView';

export const Route = createFileRoute('/read/$corpus/$book/$chapter')({
  component: PassagePage,
});

function PassagePage() {
  const { corpus, book, chapter } = Route.useParams();
  return <PassageView corpus={corpus} book={book} chapter={chapter} />;
}
