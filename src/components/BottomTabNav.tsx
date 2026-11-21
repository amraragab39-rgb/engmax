import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

const TABS: Tab[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    id: 'decks',
    label: 'Decks',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  },
  {
    id: 'learn',
    label: 'Learn',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.418-9l4.886 4.886M15 12l-3 3m0 0l-3-3m3 3V9" /></svg>,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
];

interface BottomTabNavProps {
  active: string;
  onChange: (id: string) => void;
}

export const BottomTabNav: React.FC<BottomTabNavProps> = ({ active, onChange }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-[72px] bg-engmax-surface border-t border-engmax-border flex items-center justify-center px-4 z-20 shadow-sm pb-[calc(var(--engmax-safe-area-inset-bottom)+4px)]"
      style={{ paddingBottom: `calc(var(--engmax-safe-area-inset-bottom, 0) + 4px)` }}
    >
      <div className="flex w-full max-w-md justify-around gap-1">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="w-10 h-10 rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors duration-200 touch-manipulation"
              aria-pressed={isActive}
            >
              {isActive ? tab.activeIcon || tab.icon : tab.icon}
              <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-engmax-brand' : 'text-engmax-text-muted'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
