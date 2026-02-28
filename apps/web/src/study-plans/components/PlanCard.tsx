import { Link } from '@tanstack/react-router';

interface PlanCardProps {
  slug: string;
  name: string;
  description: string;
  isAvailable: boolean;
}

export function PlanCard({ slug, name, description, isAvailable }: PlanCardProps) {
  return (
    <Link to="/plans/$planId" params={{ planId: slug }} className="plan-card">
      <span className={`plan-card-badge${isAvailable ? '' : ' placeholder'}`}>
        {isAvailable ? 'Available' : 'Coming Soon'}
      </span>
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  );
}
