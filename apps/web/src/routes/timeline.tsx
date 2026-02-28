import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/timeline')({
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div className="timeline-stub">
      <h1>Historical Timeline</h1>
      <p>
        An interactive zoomable timeline with people, places, and events as first-class entities.
        Filterable by tradition and interpretive perspective.
      </p>
      <p>The timeline data model and D3.js implementation are planned for Phase 2.</p>
    </div>
  );
}
