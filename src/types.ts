export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ar';

export interface Card {
  id: string;
  front: string;      // word / phrase in source language
  back: string;       // translation in target language
  frontLang: LanguageCode;
  backLang: LanguageCode;
  example?: string;   // example sentence using the word
  deckId: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  frontLang: LanguageCode;
  backLang: LanguageCode;
  cardCount: number;
  learnedCount: number;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardProgress {
  cardId: string;
  deckId: string;
  // 0 = new, 1-4 = learning stages, 5 = mastered
  stage: number;
  lastReviewed: string;
  nextReview: string;
  mistakes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  nativeLanguage: LanguageCode;
  learningLanguage: LanguageCode;
  createdAt: string;
}

export interface AppState {
  user: User | null;
  decks: Deck[];
  cards: Card[];
  progress: CardProgress[];
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
}
