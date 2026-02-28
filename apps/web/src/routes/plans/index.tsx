import { createFileRoute } from '@tanstack/react-router';

import { PlanList } from '~/study-plans/components/PlanList';

export const Route = createFileRoute('/plans/')({
  component: PlansPage,
});

function PlansPage() {
  return (
    <div className="plans-page">
      <div className="plans-header">
        <h1>Study Plans</h1>
        <p>
          Follow structured reading schedules to guide your scripture study throughout the year.
        </p>
      </div>
      <PlanList />
    </div>
  );
}
