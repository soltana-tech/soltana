import { createFileRoute } from '@tanstack/react-router';

import { CfmTimeline } from '~/study-plans/components/CfmTimeline';

export const Route = createFileRoute('/plans/$planId')({
  component: PlanDetailPage,
});

function PlanDetailPage() {
  const { planId } = Route.useParams();

  if (planId === 'cfm-ot-2026') {
    return <CfmTimeline />;
  }

  return (
    <div className="plans-page">
      <h1>Study Plan</h1>
      <p>This plan is coming soon.</p>
    </div>
  );
}
