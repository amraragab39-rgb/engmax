import React from 'react';
import { useApp } from '../AppContext';
import { Button } from '../components/Button';

export const ProfileScreen: React.FC = () => {
  const { state, logout, setTheme } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-engmax-bg">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-[56px] bg-engmax-surface border-b border-engmax-border flex items-center justify-between px-4 z-20 shadow-sm">
        <h1 className="font-bold text-lg text-engmax-text">Profile</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-4 py-4 pb-[calc(var(--engmax-tab-height)+4px)]" style={{ paddingBottom: `calc(var(--engmax-tab-height, 72px) + 4px)` }}>
        {/* Profile card */}
        <div className="card-glass p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-engmax-brand flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-engmax-brand/30">
              {state.user?.name?.charAt(0) || 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-xl text-engmax-text">{state.user?.name || 'Learner'}</h2>
              <p className="text-engmax-text-secondary">{state.user?.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-medium bg-engmax-brand/10 text-engmax-brand px-2.5 py-0.5 rounded-full">
                  {state.user?.nativeLanguage.toUpperCase()} → {state.user?.learningLanguage.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <StatCard label="Decks explored" value={state.decks.length} />
            <StatCard label="Words mastered" value={state.progress.filter((p) => p.stage >= 5).length} />
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-1">
          <div className="text-xs font-semibold text-engmax-text-muted uppercase tracking-wider mb-3 px-2">Settings</div>
          <div className="card-glass p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-engmax-text">Dark mode</p>
                <p className="text-[12px] text-engmax-text-muted">Switch between light and dark theme</p>
              </div>
              <button
                onClick={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}
                className="relative w-12 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
                aria-pressed={state.theme === 'dark'}
                role="switch"
                aria-checked={state.theme === 'dark'}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md absolute ${state.theme === 'dark' ? 'right-1' : 'left-1'} top-0.5 transition-transform duration-300`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-2">
          <Button variant="outline" fullWidth onClick={() => {}}>
            Help & support
          </Button>
          <Button variant="outline" fullWidth onClick={() => {}}>
            App settings
          </Button>
          <Button variant="danger" fullWidth onClick={logout}>Sign out</Button>
        </div>

        <p className="mt-8 text-[11px] text-engmax-text-muted text-center">
          ENGMAX · Flashcard vocabulary builder
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="card-glass p-4">
    <p className="text-[10px] font-semibold text-engmax-text-muted uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold text-engmax-text mt-1">{value}</p>
  </div>
);
