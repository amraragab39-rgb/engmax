import React from 'react';
import { useApp } from '../AppContext';
import type { Deck } from '../types';
import { Button } from '../components/Button';

interface HomeScreenProps {
  onDeckSelect: (deckId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onDeckSelect }) => {
  const { state, getDeckProgress } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-engmax-bg">
      <HeaderArea />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-[calc(var(--engmax-tab-height)+4px)]" style={{ paddingBottom: `calc(var(--engmax-tab-height, 72px) + 4px)` }}>
        {/* Welcome */}
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-engmax-text">Hello, {state.user?.name || 'Learner'}</h2>
            <p className="text-engmax-text-secondary text-sm">Pick a deck and start learning new words.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Filter
          </Button>
        </div>

        {/* Progress stat strip */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard label="Decks" value={state.decks.length} />
          <StatCard label="Words learned" value={state.progress.filter((p) => p.stage >= 5).length} />
        </div>

        {/* Decks list */}
        <h3 className="text-xs font-semibold text-engmax-text-muted uppercase tracking-wider mb-3 px-1">Your decks</h3>
        <div className="space-y-3">
          {state.decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} progress={getDeckProgress(deck.id)} onSelect={() => onDeckSelect(deck.id)} />
          ))}
          {state.decks.length === 0 && (
            <div className="card-glass p-12 text-center">
              <p className="text-engmax-text-muted">No decks yet. Come back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HeaderArea = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[56px] bg-engmax-surface border-b border-engmax-border flex items-center justify-between px-4 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-engmax-brand rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
        <h1 className="font-bold text-lg tracking-tight">ENGMAX</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-border/30" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <button className="w-9 h-9 rounded-full bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-border/30" aria-label="Search">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
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

interface DeckCardProps {
  deck: Deck;
  progress: { learned: number; total: number };
  onSelect: () => void;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck, progress, onSelect }) => {
  const pct = progress.total > 0 ? Math.round((progress.learned / progress.total) * 100) : 0;

  return (
    <button
      onClick={onSelect}
      className="deck-card group"
      aria-label={`Open deck: ${deck.title}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${deck.color}`} style={{ backgroundColor: deck.color + '20', color: deck.color }}>
          {deck.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-engmax-text leading-tight">{deck.title}</h3>
          <p className="text-sm text-engmax-text-secondary">{deck.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] font-medium text-engmax-text-muted">{deck.cardCount} words</span>
            <span className="w-px h-3 bg-engmax-border mx-1" />
            <span className="text-[11px] font-medium text-engmax-text-muted">{progress.learned} learned</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-engmax-brand rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <svg className="w-5 h-5 text-engmax-text-muted group-hover:text-engmax-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </div>
    </button>
  );
};
