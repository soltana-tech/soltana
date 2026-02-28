import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { signIn } from '~/shared/lib/auth-client';

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const doSignIn = async () => {
    setError('');
    setLoading(true);

    const result = await signIn.email({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message ?? 'Sign in failed');
    } else {
      await navigate({ to: '/' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void doSignIn();
          }}
          className="auth-form"
        >
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="email"
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing in\u2026' : 'Sign In'}
          </button>
        </form>
        <p className="auth-alt">
          Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
