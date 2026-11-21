import type { Card, Deck, CardProgress, User } from './types';

// ---------- Sample decks ----------
export const SAMPLE_DECKS: Deck[] = [
  {
    id: 'deck-1',
    title: 'English → Spanish Basics',
    description: 'Essential Spanish words for beginners',
    frontLang: 'en',
    backLang: 'es',
    cardCount: 10,
    learnedCount: 0,
    color: '#0099dd',
    icon: '🇪🇸',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'deck-2',
    title: 'English → French Essentials',
    description: 'Common French phrases for daily life',
    frontLang: 'en',
    backLang: 'fr',
    cardCount: 8,
    learnedCount: 0,
    color: '#0078d4',
    icon: '🇫🇷',
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    id: 'deck-3',
    title: 'English → German Vocabulary',
    description: 'German nouns, verbs and adjectives',
    frontLang: 'en',
    backLang: 'de',
    cardCount: 12,
    learnedCount: 0,
    color: '#e2001a',
    icon: '🇩🇪',
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
  {
    id: 'deck-4',
    title: 'English → Arabic Basics',
    description: 'Essential Arabic words for beginners',
    frontLang: 'en',
    backLang: 'ar',
    cardCount: 10,
    learnedCount: 0,
    color: '#8b5cf6',
    icon: '🇸🇦',
    createdAt: '2026-01-04T00:00:00Z',
    updatedAt: '2026-01-04T00:00:00Z',
  },
];

// ---------- Sample cards ----------
const now = new Date().toISOString();

export const SAMPLE_CARDS: Card[] = [
  // English -> Spanish
  { id: 'c1', front: 'Hello', back: 'Hola', frontLang: 'en', backLang: 'es', example: 'Hello, how are you?', deckId: 'deck-1' },
  { id: 'c2', front: 'Good morning', back: 'Buenos días', frontLang: 'en', backLang: 'es', example: 'Good morning, teacher!', deckId: 'deck-1' },
  { id: 'c3', front: 'Thank you', back: 'Gracias', frontLang: 'en', backLang: 'es', example: 'Thank you for your help.', deckId: 'deck-1' },
  { id: 'c4', front: 'Please', back: 'Por favor', frontLang: 'en', backLang: 'es', example: 'Please sit down.', deckId: 'deck-1' },
  { id: 'c5', front: 'Yes', back: 'Sí', frontLang: 'en', backLang: 'es', example: 'Yes, I agree.', deckId: 'deck-1' },
  { id: 'c6', front: 'No', back: 'No', frontLang: 'en', backLang: 'es', example: 'No, thank you.', deckId: 'deck-1' },
  { id: 'c7', front: 'Friend', back: 'Amigo', frontLang: 'en', backLang: 'es', example: 'My friend is kind.', deckId: 'deck-1' },
  { id: 'c8', front: 'Family', back: 'Familia', frontLang: 'en', backLang: 'es', example: 'I love my family.', deckId: 'deck-1' },
  { id: 'c9', front: 'Water', back: 'Agua', frontLang: 'en', backLang: 'es', example: 'I drink water.', deckId: 'deck-1' },
  { id: 'c10', front: 'House', back: 'Casa', frontLang: 'en', backLang: 'es', example: 'This is my house.', deckId: 'deck-1' },
  // English -> French
  { id: 'c11', front: 'Hello', back: 'Bonjour', frontLang: 'en', backLang: 'fr', example: 'Bonjour, comment allez-vous?', deckId: 'deck-2' },
  { id: 'c12', front: 'Thank you', back: 'Merci', frontLang: 'en', backLang: 'fr', example: 'Merci beaucoup.', deckId: 'deck-2' },
  { id: 'c13', front: 'Please', back: "S'il vous plaît", frontLang: 'en', backLang: 'fr', example: "S'il vous plaît, aidez-moi.", deckId: 'deck-2' },
  { id: 'c14', front: 'Yes', back: 'Oui', frontLang: 'en', backLang: 'fr', example: 'Oui, c\'est vrai.', deckId: 'deck-2' },
  { id: 'c15', front: 'No', back: 'Non', frontLang: 'en', backLang: 'fr', example: 'Non, merci.', deckId: 'deck-2' },
  { id: 'c16', front: 'Friend', back: 'Ami', frontLang: 'en', backLang: 'fr', example: 'Mon ami est gentil.', deckId: 'deck-2' },
  { id: 'c17', front: 'Water', back: 'Eau', frontLang: 'en', backLang: 'fr', example: 'Je bois de l\'eau.', deckId: 'deck-2' },
  { id: 'c18', front: 'House', back: 'Maison', frontLang: 'en', backLang: 'fr', example: 'C\'est ma maison.', deckId: 'deck-2' },
  // English -> German
  { id: 'c19', front: 'Hello', back: 'Hallo', frontLang: 'en', backLang: 'de', example: 'Hallo, wie geht es dir?', deckId: 'deck-3' },
  { id: 'c20', front: 'Thank you', back: 'Danke', frontLang: 'en', backLang: 'de', example: 'Vielen Dank.', deckId: 'deck-3' },
  { id: 'c21', front: 'Please', back: 'Bitte', frontLang: 'en', backLang: 'de', example: 'Bitte, setzen Sie sich.', deckId: 'deck-3' },
  { id: 'c22', front: 'Yes', back: 'Ja', frontLang: 'en', backLang: 'de', example: 'Ja, das ist richtig.', deckId: 'deck-3' },
  { id: 'c23', front: 'No', back: 'Nein', frontLang: 'en', backLang: 'de', example: 'Nein, danke.', deckId: 'deck-3' },
  { id: 'c24', front: 'Friend', back: 'Freund', frontLang: 'en', backLang: 'de', example: 'Mein Freund ist nett.', deckId: 'deck-3' },
  { id: 'c25', front: 'Water', back: 'Wasser', frontLang: 'en', backLang: 'de', example: 'Ich trinke Wasser.', deckId: 'deck-3' },
  { id: 'c26', front: 'House', back: 'Haus', frontLang: 'en', backLang: 'de', example: 'Das ist mein Haus.', deckId: 'deck-3' },
  { id: 'c27', front: 'Family', back: 'Familie', frontLang: 'en', backLang: 'de', example: 'Ich liebe meine Familie.', deckId: 'deck-3' },
  { id: 'c28', front: 'Good morning', back: 'Guten Morgen', frontLang: 'en', backLang: 'de', example: 'Guten Morgen, Lehrer.', deckId: 'deck-3' },
  { id: 'c29', front: 'Night', back: 'Nacht', frontLang: 'en', backLang: 'de', example: 'Gute Nacht.', deckId: 'deck-3' },
  { id: 'c30', front: 'Book', back: 'Buch', frontLang: 'en', backLang: 'de', example: 'Ich lese ein Buch.', deckId: 'deck-3' },
  // English -> Arabic (RTL target language)
  { id: 'c31', front: 'Hello', back: 'مرحبا', frontLang: 'en', backLang: 'ar', example: 'مرحبا، كيف حالك؟', deckId: 'deck-4' },
  { id: 'c32', front: 'Good morning', back: 'صباح الخير', frontLang: 'en', backLang: 'ar', example: 'صباح الخير يا أستاذ', deckId: 'deck-4' },
  { id: 'c33', front: 'Thank you', back: 'شكرا', frontLang: 'en', backLang: 'ar', example: 'شكرا لمساعدتك', deckId: 'deck-4' },
  { id: 'c34', front: 'Please', back: 'من فضلك', frontLang: 'en', backLang: 'ar', example: 'من فضلك، اجلس', deckId: 'deck-4' },
  { id: 'c35', front: 'Yes', back: 'نعم', frontLang: 'en', backLang: 'ar', example: 'نعم، أوافق', deckId: 'deck-4' },
  { id: 'c36', front: 'No', back: 'لا', frontLang: 'en', backLang: 'ar', example: 'لا، شكرا', deckId: 'deck-4' },
  { id: 'c37', front: 'Friend', back: 'صديق', frontLang: 'en', backLang: 'ar', example: 'صديقي لطيف', deckId: 'deck-4' },
  { id: 'c38', front: 'Family', back: 'عائلة', frontLang: 'en', backLang: 'ar', example: 'أحب عائلتي', deckId: 'deck-4' },
  { id: 'c39', front: 'Water', back: 'ماء', frontLang: 'en', backLang: 'ar', example: 'أشرب ماء', deckId: 'deck-4' },
  { id: 'c40', front: 'House', back: 'بيت', frontLang: 'en', backLang: 'ar', example: 'هذا بيتي', deckId: 'deck-4' },
];

// ---------- Local storage keys ----------
const STORAGE_KEYS = {
  user: 'engmax_user',
  decks: 'engmax_decks',
  cards: 'engmax_cards',
  progress: 'engmax_progress',
  theme: 'engmax_theme',
  auth: 'engmax_auth',
};

export const STORAGE = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or private mode — ignore gracefully
    }
  },
};

export const DEFAULT_USER: User = {
  id: 'user-1',
  name: 'Learner',
  email: 'learner@engmax.app',
  nativeLanguage: 'en',
  learningLanguage: 'es',
  createdAt: now,
};

export const initializeStore = (): {
  user: User | null;
  decks: Deck[];
  cards: Card[];
  progress: CardProgress[];
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
} => {
  const user = STORAGE.get<User | null>(STORAGE_KEYS.user, null);
  const decks = STORAGE.get<Deck[]>(STORAGE_KEYS.decks, SAMPLE_DECKS);
  const cards = STORAGE.get<Card[]>(STORAGE_KEYS.cards, SAMPLE_CARDS);
  const progress = STORAGE.get<CardProgress[]>(STORAGE_KEYS.progress, []);
  const theme = STORAGE.get<'light' | 'dark'>(STORAGE_KEYS.theme, 'light');
  const isAuthenticated = STORAGE.get<boolean>(STORAGE_KEYS.auth, false);

  // Persist defaults if not yet seeded
  if (!user) STORAGE.set(STORAGE_KEYS.user, null);
  if (!decks.length) STORAGE.set(STORAGE_KEYS.decks, SAMPLE_DECKS);
  if (!cards.length) STORAGE.set(STORAGE_KEYS.cards, SAMPLE_CARDS);

  return { user, decks, cards, progress, isAuthenticated, theme };
};

export const getCardsForDeck = (deckId: string, cards: Card[]): Card[] =>
  cards.filter((c) => c.deckId === deckId);

export const nextProgressStage = (stage: number, correct: boolean): number =>
  correct ? Math.min(stage + 1, 5) : Math.max(stage - 1, 0);
