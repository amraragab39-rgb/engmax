import React, { useCallback } from 'react';
import { useApp } from '../AppContext';
import { getCardsForDeck } from '../data';
import type { Deck } from '../types';
import { Button } from '../components/Button';

interface DecksScreenProps {
  deck: Deck;
  onBack: () => void;
  onLearn: (deckId: string) => void;
}

export const DecksScreen: React.FC<DecksScreenProps> = ({ deck, onBack, onLearn }) => {
  const { state, getDeckProgress } = useApp();
  const cards = getCardsForDeck(deck.id, state.cards);
  const progress = getDeckProgress(deck.id);

  const masteredIds = new Set(
    state.progress.filter((p) => p.deckId === deck.id && p.stage >= 5).map((p) => p.cardId)
  );

  const handleLearn = useCallback(() => {
    onLearn(deck.id);
  }, [deck.id, onLearn]);

  return (
    <div className="flex min-h-screen flex-col bg-engmax-bg">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-[56px] bg-engmax-surface border-b border-engmax-border flex items-center justify-between px-4 z-20 shadow-sm">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-engmax-bg-secondary flex items-center justify-center text-engmax-text-secondary hover:bg-engmax-border/30"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg text-engmax-text">{deck.title}</h1>
          <p className="text-[11px] text-engmax-text-muted">{deck.frontLang.toUpperCase()} → {deck.backLang.toUpperCase()}</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-[calc(var(--engmax-tab-height)+4px)]" style={{ paddingBottom: `calc(var(--engmax-tab-height, 72px) + 4px)` }}>
        {/* Deck hero */}
        <div className="card-glass p-5 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md ${deck.color}`} style={{ backgroundColor: deck.color + '20', color: deck.color }}>
              {deck.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-xl text-engmax-text leading-tight">{deck.title}</h2>
              <p className="text-sm text-engmax-text-secondary">{deck.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <StatChip label="Cards" value={cards.length} />
            <StatChip label="Learned" value={progress.learned} />
            <StatChip label="Remaining" value={Math.max(cards.length - progress.learned, 0)} />
          </div>
        </div>

        {/* Start learning CTA */}
        <div className="mb-5">
          <Button variant="primary" fullWidth size="lg" onClick={handleLearn} disabled={cards.length === 0}>
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
              Start learning
            </span>
          </Button>
          {cards.length === 0 && (
            <p className="text-[12px] text-engmax-text-muted mt-2 text-center">No cards in this deck yet.</p>
          )}
        </div>

        {/* Cards list */}
        <h3 className="text-xs font-semibold text-engmax-text-muted uppercase tracking-wider mb-3 px-1">Words ({cards.length})</h3>
        <div className="space-y-2">
          {cards.map((card) => (
            <CardRow key={card.id} card={card} mastered={masteredIds.has(card.id)} />
          ))}
          {cards.length === 0 && (
            <div className="card-glass p-8 text-center">
              <p className="text-engmax-text-muted">This deck is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatChip = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-[10px] font-semibold text-engmax-text-muted uppercase tracking-wider">{label}</span>
    <span className="text-lg font-bold text-engmax-text">{value}</span>
  </div>
);

interface CardRowProps {
  card: { front: string; back: string; frontLang: string; backLang: string; example?: string };
  mastered: boolean;
}

const CardRow: React.FC<CardRowProps> = ({ card, mastered }) => (
  <div className="card-glass p-4 flex items-center justify-between gap-3">
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-lg text-engmax-text">{card.front}</span>
        <span className="text-xs font-medium bg-engmax-brand/10 text-engmax-brand px-2 py-0.5 rounded-full">
          {card.frontLang.toUpperCase()}
        </span>
      </div>
      <p className="text-lg font-medium text-engmax-text mt-1">{card.back}</p>
      <span className="text-[11px] text-engmax-text-muted block mt-1">{card.backLang.toUpperCase()}</span>
      {card.example && (
        <p className="text-[12px] italic text-engmax-text-muted mt-2">&ldquo;{card.example}&rdquo;</p>
      )}
    </div>
    <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${mastered ? 'bg-engmax-success/10 text-engmax-success border border-engmax-success/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
      {mastered ? '✓ Learned' : 'New'}
    </span>
  </div>
);
