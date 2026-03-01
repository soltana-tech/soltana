import { createFileRoute } from '@tanstack/react-router';

import { LdsCfm } from '~/study-plans/components/LdsCfm';

export const Route = createFileRoute('/plans/$planId')({
  component: PlanDetailPage,
});

function PlanDetailPage() {
  const { planId } = Route.useParams();

  if (planId === 'cfm-ot-2026') {
    return <LdsCfm />;
  }

  return (
    <div className="page">
      <h1>Study Plan</h1>
      <p>This plan is coming soon.</p>
    </div>
  );
}
