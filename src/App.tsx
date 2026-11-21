import { useState, useCallback } from 'react';
import { useApp } from './AppContext';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './pages/AuthScreen';
import { HomeScreen } from './pages/HomeScreen';
import { DecksScreen } from './pages/DecksScreen';
import { LearnScreen } from './pages/LearnScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { BottomTabNav } from './components/BottomTabNav';
import './index.css';

type View = 'splash' | 'auth' | 'home' | 'decks' | 'learn' | 'profile';
type Tab = 'home' | 'decks' | 'learn' | 'profile';

function AppInner(): React.ReactElement {
  const { state } = useApp();
  const [view, setView] = useState<View>('splash');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  const handleAuthenticated = useCallback(() => {
    setView('home');
    setActiveTab('home');
  }, []);

  const handleDeckSelect = useCallback((deckId: string) => {
    setSelectedDeckId(deckId);
    setView('decks');
    setActiveTab('decks');
  }, []);

  const handleLearn = useCallback(() => {
    setView('learn');
    setActiveTab('learn');
  }, []);

  const handleTabChange = useCallback((id: string) => {
    const tab = id as Tab;
    if (tab === 'home') {
      setView('home');
      setSelectedDeckId(null);
    } else if (tab === 'decks') {
      if (!selectedDeckId) {
        setView('home');
      } else {
        setView('decks');
      }
    } else if (tab === 'learn') {
      setView('learn');
    } else if (tab === 'profile') {
      setView('profile');
      setSelectedDeckId(null);
    }
    setActiveTab(tab);
  }, [selectedDeckId]);

  // Splash screen until app is ready
  if (view === 'splash') {
    return (
      <SplashScreen
        onReady={() => {
          if (state.isAuthenticated && state.user) {
            setView('home');
          } else {
            setView('auth');
          }
        }}
      />
    );
  }

  return (
    <>
      {view === 'auth' && (
        <AuthScreen onAuthenticated={handleAuthenticated} />
      )}

      {view === 'home' && (
        <>
          <HomeScreen onDeckSelect={handleDeckSelect} />
          <BottomTabNav active={activeTab} onChange={handleTabChange} />
        </>
      )}

      {view === 'decks' && selectedDeckId && (
        <>
          <DecksScreen
            deck={state.decks.find((d) => d.id === selectedDeckId)!}
            onBack={() => {
              setView('home');
              setSelectedDeckId(null);
              setActiveTab('home');
            }}
            onLearn={handleLearn}
          />
          <BottomTabNav active={activeTab} onChange={handleTabChange} />
        </>
      )}

      {view === 'learn' && selectedDeckId && (
        <>
          <LearnScreen
            deckId={selectedDeckId}
            onBack={() => {
              setView('decks');
              setActiveTab('decks');
            }}
          />
        </>
      )}

      {view === 'profile' && (
        <>
          <ProfileScreen />
          <BottomTabNav active={activeTab} onChange={handleTabChange} />
        </>
      )}
    </>
  );
}

export default AppInner;