import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { signUp } from '~/shared/lib/auth-client';

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const doSignUp = async () => {
    setError('');
    setLoading(true);

    const result = await signUp.email({ name, email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message ?? 'Sign up failed');
    } else {
      await navigate({ to: '/' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void doSignUp();
          }}
          className="auth-form"
        >
          <label className="auth-field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              autoComplete="name"
            />
          </label>
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
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account\u2026' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-alt">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
