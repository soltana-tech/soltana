import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { signOut, useSession } from '~/shared/lib/auth-client';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Soltana
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        aria-label="Toggle navigation"
      >
        {menuOpen ? '\u2715' : '\u2630'}
      </button>

      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li>
          <Link
            to="/plans"
            className="navbar-link"
            activeProps={{ className: 'navbar-link active' }}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Study Plans
          </Link>
        </li>
        <li>
          <Link
            to="/read"
            className="navbar-link"
            activeProps={{ className: 'navbar-link active' }}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Reader
          </Link>
        </li>
        <li>
          <Link
            to="/teach"
            className="navbar-link"
            activeProps={{ className: 'navbar-link active' }}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Teach
          </Link>
        </li>
        <li>
          <Link
            to="/timeline"
            className="navbar-link"
            activeProps={{ className: 'navbar-link active' }}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Timeline
          </Link>
        </li>
      </ul>

      <div className="navbar-auth">
        {session?.user ? (
          <button
            className="navbar-link"
            onClick={() => {
              void signOut();
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" className="navbar-link">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
