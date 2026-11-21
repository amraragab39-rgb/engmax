import React from 'react';
import { useApp } from '../AppContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack, actions }) => {
  const { state, setTheme, logout } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] bg-engmax-surface border-b border-engmax-border flex items-center justify-between px-4 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-border/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : null}
        <span className="font-bold text-lg tracking-tight">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <button
          onClick={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}
          className="w-9 h-9 rounded-full bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-border/30"
          aria-label="Toggle dark mode"
        >
          {state.theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 3c4.98 0 9.018 4.039 9.018 9.018s0 9.018-9.018 9.018c-1.734 0-3.356-.481-4.762-1.292" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
        {state.isAuthenticated ? (
          <button
            onClick={logout}
            className="w-9 h-9 rounded-full bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-error/10 hover:text-engmax-error"
            aria-label="Sign out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
};
