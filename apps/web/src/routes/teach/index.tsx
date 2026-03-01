import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/teach/')({
  component: TeachPage,
});

function TeachPage() {
  return (
    <div className="page">
      <h1>Teach</h1>
      <p>
        Tools for preparing and delivering sermons, lessons, and presentations. A markdown editor
        with inline scripture references and ECharts visualizations.
      </p>
      <p>This section is under development.</p>
    </div>
  );
}
