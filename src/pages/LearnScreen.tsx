import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext';
import { getCardsForDeck } from '../data';
import { Button } from '../components/Button';

interface LearnScreenProps {
  deckId: string;
  onBack: () => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ deckId, onBack }) => {
  const { state, reviewCard } = useApp();
  const deck = state.decks.find((d) => d.id === deckId);
  const deckCards = getCardsForDeck(deckId, state.cards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const lastCardIndexRef = useRef<number>(-1);

  const currentCard = deckCards[currentIndex];
  const progress = state.progress.find((p) => p.cardId === currentCard?.id);

  // Flip back when moving to next card
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentCard) return;

      reviewCard(currentCard.id, deckId, correct);
      setSessionStats((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));

      const next = currentIndex + 1;
      if (next >= deckCards.length) {
        setSessionComplete(true);
        return;
      }
      setCurrentIndex(next);
    },
    [currentCard, deckId, currentIndex, deckCards.length, reviewCard]
  );

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setSessionStats({ correct: 0, total: 0 });
    lastCardIndexRef.current = -1;
  }, []);

  const pct = deckCards.length > 0 ? Math.round(((currentIndex + 1) / deckCards.length) * 100) : 0;

  if (sessionComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-engmax-bg px-6">
        <div className="card-glass p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-engmax-brand/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            {sessionStats.total > 0 ? '🎉' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-engmax-text mb-2">Deck complete!</h2>
          <p className="text-engmax-text-secondary mb-6">
            {sessionStats.correct} of {sessionStats.total} correct
          </p>
          <div className="space-y-3">
            <Button variant="primary" fullWidth onClick={handleRetry}>Practice again</Button>
            <Button variant="outline" fullWidth onClick={onBack}>Back to decks</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard || !deck) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-engmax-bg px-6">
        <div className="card-glass p-8 text-center">
          <p className="text-engmax-text-muted">No cards available in this deck.</p>
          <Button variant="outline" fullWidth onClick={onBack}>Back</Button>
        </div>
      </div>
    );
  }

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
        <h1 className="font-bold text-lg text-engmax-text">{deck.title}</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 relative px-4 pt-[56px] pb-[calc(var(--engmax-tab-height)+4px)]" style={{ paddingBottom: `calc(var(--engmax-tab-height, 72px) + 4px)` }}>
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] font-semibold text-engmax-text-muted mb-1">
            <span>Card {currentIndex + 1} of {deckCards.length}</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-engmax-brand rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex items-center justify-center min-h-[300px]">
          <div
            ref={cardRef}
            className={`w-full max-w-md aspect-square relative perspective-1000 cursor-pointer transition-transform duration-200 ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip();
              }
            }}
            aria-label={`Flashcard: ${currentCard.front}`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 card-glass p-6 flex flex-col items-center justify-center rounded-3xl shadow-xl backface-hidden text-center flashcard-face border border-engmax-border transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'} ${deck?.backLang === 'ar' ? 'rtl-text' : ''}`}
              style={{ backfaceVisibility: 'hidden' }}
              dir={deck?.backLang === 'ar' ? 'rtl' : 'ltr'}
            >
              <span className="text-xs font-semibold text-engmax-text-muted uppercase tracking-wider mb-2 block">
                {deck.frontLang.toUpperCase()}
              </span>
              <div className="text-4xl font-bold text-engmax-text break-words leading-tight">{currentCard.front}</div>
              <div className="mt-6 w-full flex justify-center">
                <span className="w-8 h-8 rounded-full bg-engmax-bg-secondary flex items-center justify-center text-[10px] font-bold text-engmax-text-secondary shadow-sm ring-1 ring-engmax-border">
                  ↻
                </span>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 card-glass p-6 flex flex-col items-center justify-center rounded-3xl shadow-xl backface-hidden text-center flashcard-face border border-engmax-border transform rotate-y-180 transition-opacity duration-300 ${!isFlipped ? 'opacity-0' : 'opacity-100'} ${deck?.backLang === 'ar' ? 'rtl-text' : ''}`}
              style={{ backfaceVisibility: 'hidden' }}
              dir={deck?.backLang === 'ar' ? 'rtl' : 'ltr'}
            >
              <span className="text-xs font-semibold text-engmax-text-muted uppercase tracking-wider mb-2 block">
                {deck.backLang.toUpperCase()}
              </span>
              <div className="text-4xl font-bold text-engmax-text break-words leading-tight">{currentCard.back}</div>
              {currentCard.example && (
                <div className="mt-5 px-4 py-3 rounded-2xl bg-engmax-bg-secondary border border-engmax-border/30">
                  <p className="text-sm italic text-engmax-text-secondary">{currentCard.example}</p>
                </div>
              )}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 px-5 py-2.5 rounded-xl border border-engmax-error/30 bg-engmax-error/10 text-engmax-error text-sm font-medium hover:bg-engmax-error/20 transition-colors touch-manipulation"
                  aria-label="Wrong"
                >
                  ❌ Wrong
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 px-5 py-2.5 rounded-xl border border-engmax-success/30 bg-engmax-success/10 text-engmax-success text-sm font-medium hover:bg-engmax-success/20 transition-colors touch-manipulation"
                  aria-label="Correct"
                >
                  ✅ Correct
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stage indicator */}
        {progress && (
          <div className="absolute top-4 right-4 flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((stage) => (
              <div
                key={stage}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    stage <= progress.stage
                      ? 'var(--engmax-brand)'
                      : 'var(--engmax-border)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};