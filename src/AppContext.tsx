import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type {
  AppState,
  Card,
  Deck,
  CardProgress,
  User,
} from './types';
import {
  STORAGE,
  initializeStore,
  nextProgressStage,
} from './data';

type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTH'; payload: boolean }
  | { type: 'SET_DECKS'; payload: Deck[] }
  | { type: 'SET_CARDS'; payload: Card[] }
  | { type: 'SET_PROGRESS'; payload: CardProgress[] }
  | { type: 'UPDATE_PROGRESS'; payload: { cardId: string; deckId: string; correct: boolean } }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: AppState = {
  user: null,
  decks: [],
  cards: [],
  progress: [],
  isAuthenticated: false,
  theme: 'light',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTH':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_DECKS':
      return { ...state, decks: action.payload };
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'UPDATE_PROGRESS': {
      const { cardId, deckId, correct } = action.payload;
      const existing = state.progress.find((p) => p.cardId === cardId);
      const now = new Date().toISOString();
      const next = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // review tomorrow
      let newStage = 0;
      let mistakes = 0;
      if (existing) {
        newStage = nextProgressStage(existing.stage, correct);
        mistakes = correct ? existing.mistakes : existing.mistakes + 1;
      }
      const updated = existing
        ? {
            ...existing,
            stage: newStage,
            lastReviewed: now,
            nextReview: next,
            mistakes,
          }
        : {
            cardId,
            deckId,
            stage: correct ? 1 : 0,
            lastReviewed: now,
            nextReview: next,
            mistakes,
          };
      const nextProgress = state.progress.map((p) =>
        p.cardId === cardId ? updated : p
      );
      if (!existing) nextProgress.push(updated);
      return { ...state, progress: nextProgress };
    }
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  login: (user: User) => void;
  logout: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  reviewCard: (cardId: string, deckId: string, correct: boolean) => void;
  getDeckProgress: (deckId: string) => { learned: number; total: number };
} | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const {
      user,
      decks,
      cards,
      progress,
      isAuthenticated,
      theme,
    } = initializeStore();
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_DECKS', payload: decks });
    dispatch({ type: 'SET_CARDS', payload: cards });
    dispatch({ type: 'SET_PROGRESS', payload: progress });
    dispatch({ type: 'SET_AUTH', payload: isAuthenticated });
    dispatch({ type: 'SET_THEME', payload: theme });

    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Persist relevant state changes
  useEffect(() => {
    if (state.user) STORAGE.set('engmax_user', state.user);
    STORAGE.set('engmax_auth', state.isAuthenticated);
    STORAGE.set('engmax_decks', state.decks);
    STORAGE.set('engmax_cards', state.cards);
    STORAGE.set('engmax_progress', state.progress);
    STORAGE.set('engmax_theme', state.theme);

    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const login = useCallback((user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_AUTH', payload: true });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_AUTH', payload: false });
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const reviewCard = useCallback(
    (cardId: string, deckId: string, correct: boolean) => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: { cardId, deckId, correct } });
    },
    []
  );

  const getDeckProgress = useCallback(
    (deckId: string) => {
      const deck = state.decks.find((d: Deck) => d.id === deckId);
      const total = state.cards.filter((c: Card) => c.deckId === deckId).length;
      const mastered = state.progress.filter(
        (p: CardProgress) => p.deckId === deckId && p.stage >= 5
      ).length;
      return { learned: mastered, total: deck ? deck.cardCount : total };
    },
    [state.decks, state.cards, state.progress]
  );

  const value = {
    state,
    dispatch,
    login,
    logout,
    setTheme,
    reviewCard,
    getDeckProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
};