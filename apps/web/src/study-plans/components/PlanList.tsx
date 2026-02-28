import { PlanCard } from './PlanCard';

const PLANS = [
  {
    slug: 'cfm-ot-2026',
    name: 'Come, Follow Me 2026 OT',
    description:
      'Weekly readings following the official Come, Follow Me Old Testament schedule for 2026.',
    isAvailable: true,
  },
  {
    slug: 'bible-in-a-year',
    name: 'Bible in a Year',
    description:
      'Read the entire Bible in one year with daily readings distributed across both testaments.',
    isAvailable: false,
  },
  {
    slug: 'bible-in-90-days',
    name: 'Bible in 90 Days',
    description: 'An intensive 90-day plan covering the entire Bible at an accelerated pace.',
    isAvailable: false,
  },
  {
    slug: 'bom-in-90-days',
    name: 'Book of Mormon in 90 Days',
    description: 'Read the Book of Mormon in 90 days with structured daily reading assignments.',
    isAvailable: false,
  },
  {
    slug: 'custom',
    name: 'Custom Plan',
    description:
      'Choose specific scripture ranges and a time period, and the system distributes reading across days.',
    isAvailable: false,
  },
] as const;

export function PlanList() {
  return (
    <div className="plan-grid">
      {PLANS.map((plan) => (
        <PlanCard key={plan.slug} {...plan} />
      ))}
    </div>
  );
}
