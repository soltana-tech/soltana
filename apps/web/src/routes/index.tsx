import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

const FEATURES = [
  {
    title: 'Study Plans',
    description:
      'Follow structured reading schedules including Come, Follow Me 2026 OT, Bible in a Year, and more.',
    to: '/plans',
  },
  {
    title: 'Scripture Reader',
    description:
      'Configurable reading experience with annotations, notebooks, and cross-references.',
    to: '/read',
  },
  {
    title: 'Teach',
    description:
      'Tools for preparing sermons, lessons, and presentations with inline scripture references.',
    to: '/teach',
  },
  {
    title: 'Historical Timeline',
    description:
      'Interactive zoomable timeline with people, places, and events across faith traditions.',
    to: '/timeline',
  },
] as const;

function LandingPage() {
  return (
    <div className="page">
      <section className="landing-hero">
        <h1>Soltana</h1>
        <p>
          An open-source academic scripture study platform. Read, study, teach, and explore across
          traditions with genuine multi-faith scope and academic depth.
        </p>
      </section>

      <section className="card-grid">
        {FEATURES.map((feature) => (
          <Link key={feature.to} to={feature.to} className="card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
