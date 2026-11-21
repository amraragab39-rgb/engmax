import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { DEFAULT_USER } from '../data';
import { Button } from '../components/Button';

type Mode = 'login' | 'signup';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const { login, state } = useApp();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (mode === 'signup' && (!name || name.trim().length < 2)) {
      setError('Please enter your name.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // Simulate network auth
    setTimeout(() => {
      const user: typeof DEFAULT_USER = {
        ...DEFAULT_USER,
        id: 'user-' + Date.now(),
        name: name.trim() || email.split('@')[0],
        email,
        nativeLanguage: 'en',
        learningLanguage: state.decks[0]?.backLang || 'es',
      };
      login(user);
      onAuthenticated();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-engmax-bg px-4">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-16 h-16 bg-engmax-brand rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-engmax-brand/30">
            E
          </div>
          <h1 className="font-bold text-3xl text-engmax-text tracking-tight">ENGMAX</h1>
          <p className="text-engmax-text-secondary text-sm">
            {mode === 'login' ? 'Welcome back to your vocabulary deck' : 'Create your learning account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!mode === false && null}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-engmax-text-muted uppercase tracking-wider">
                Full name
              </label>
              <input
                type="text"
                className="input-engmax"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-engmax-text-muted uppercase tracking-wider">
              Email address
            </label>
            <input
              type="email"
              className="input-engmax"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-engmax-text-muted uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              className="input-engmax"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-engmax-error/10 border border-engmax-error/30 px-4 py-3 text-sm text-engmax-error">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            disabled={loading}
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </Button>

          <p className="text-center text-xs text-engmax-text-muted">
            {mode === 'login'
              ? `Don't have an account? `
              : 'Already have an account? '
            }
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-engmax-brand font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>

        <div className="mt-8 flex items-center gap-4 text-xs text-engmax-text-muted">
          <span className="w-full border-t border-engmax-border" />
          <span>Continue with</span>
          <span className="w-full border-t border-engmax-border" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {}}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 2.9c-5.06 0-9.38 3.36-10.07 8.13-.45 2.98.78 5.88 3.05 7.95 2.23 2.04 5.23 2.95 8.49 2.27 3.26-.67 5.69-3.52 6.11-6.94.18-1.43-.39-2.81-1.44-3.86-1.58-1.6-3.88-1.8-5.94-1.07-.76.27-1.44.68-1.95 1.29-.44.53-.74 1.19-.88 1.89-.14.73-.12 1.48-.01 2.19.37 2.34 2.29 4.33 4.94 4.27 1.21-.03 2.36-.61 3.17-1.56.9-1.06 1.37-2.36 1.34-3.64-.02-.63-.11-1.25-.29-1.83-.28-.88-.76-1.62-1.43-2.17-1.44-1.2-3.62-1.29-4.95-.12-.66.58-1.28 1.26-1.79 1.99-.27.39-.48.83-.62 1.28-.25.81-.38 1.64-.38 2.47 0 1.59.58 3.1 1.63 4.21.85.9 1.9 1.41 3.01 1.41 1.55 0 3.04-.74 3.88-1.89 1.3-1.78 1.06-4.18-.65-5.89-1.43-1.42-3.5-2.13-5.75-1.92-1.24.11-2.34.62-3.07 1.47-.78.92-1.18 2.03-.98 3.2.21 1.17.98 2.14 1.98 2.42 1.02.28 2.08-.05 2.86-.83.82-.82 1.08-1.95.79-2.99-.18-.65-.5-1.26-.9-1.82-.77-1.05-1.79-1.64-2.85-1.6-.48.02-.95.17-1.33.46s-.77.74-1.03 1.28c-.26.54-.43 1.12-.5 1.71-.09.78-.08 1.57.02 2.34.37 2.91 2.42 5.31 5.29 5.29 1.12 0 2.21-.39 3.06-1.07.72-.58 1.27-1.36 1.56-2.24.21-.64.32-1.3.32-1.98 0-.71-.12-1.4-.31-2.03-.28-.93-.77-1.76-1.43-2.35-1.16-1.04-2.81-1.34-3.96-.36-.57.48-1.12 1.05-1.54 1.66-.21.3-.38.64-.5.99-.22.65-.33 1.33-.33 2.02 0 1.75.64 3.39 1.78 4.59.95.99 2.1 1.53 3.36 1.52 1.4-.02 2.72-.75 3.52-1.84 1.27-1.73.98-4.13-.75-5.86-1.44-1.44-3.51-2.18-5.95-1.98-1.26.1-2.39.59-3.14 1.45-.8.92-1.22 2.03-1.03 3.22.19 1.19.96 2.16 1.96 2.44 1 .29 2.07-.04 2.85-.84.82-.82 1.08-1.95.79-2.99-.17-.65-.49-1.26-.89-1.82-.77-1.05-1.79-1.64-2.85-1.6-.48.02-.95.17-1.33.46s-.77.74-1.03 1.28c-.26.54-.43 1.12-.5 1.71-.09.78-.08 1.57.02 2.34.37 2.91 2.42 5.31 5.29 5.29 1.12 0 2.21-.39 3.06-1.07.72-.58 1.27-1.36 1.56-2.24.21-.64.32-1.3.32-1.98 0-.71-.12-1.4-.31-2.03-.28-.93-.77-1.76-1.43-2.35-1.16-1.04-2.81-1.34-3.96-.36-.57.48-1.12 1.05-1.54 1.66-.21.3-.38.64-.5.99-.22.65-.33 1.33-.33 2.02 0 1.75.64 3.39 1.78 4.59.95.99 2.1 1.53 3.36 1.52 1.4-.02 2.72-.75 3.52-1.84 1.27-1.73.98-4.13-.75-5.86" />
              </svg>
              Google
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {}}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.538 10.954 10.379 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.008 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.462 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
