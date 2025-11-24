import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClubInfo from './components/ClubInfo';
import EventsPage from './components/EventsPage';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import { fetchCampusUpdates } from './services/geminiService';
import { CampusUpdate } from './types';
import { TransitionProvider } from './context/TransitionContext.tsx';
import CustomCursor from './components/CustomCursor';

const MainContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [updates, setUpdates] = useState<CampusUpdate[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'events' | 'team' | 'about'>('home');
  const [eventsFilter, setEventsFilter] = useState<'Upcoming' | 'Past'>('Past');

  useEffect(() => {
    // Start fetching data immediately while loader plays
    const loadData = async () => {
      const data = await fetchCampusUpdates();
      setUpdates(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Allow a small tick for the DOM to settle before showing content interactions if needed
    setTimeout(() => setShowContent(true), 100);
  };

  const handleNavigation = (view: string, filter?: 'Upcoming' | 'Past') => {
    switch (view.toLowerCase()) {
      case 'events':
        setCurrentView('events');
        if (filter) {
          setEventsFilter(filter);
        }
        break;
      case 'team':
        setCurrentView('team');
        break;
      case 'about':
        setCurrentView('about');
        break;
      default:
        setCurrentView('home');
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-[#00df9a] selection:text-black cursor-none">
      
      <CustomCursor />
      
      {/* The Loader sits on top until it slides away */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Application Content */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar onNavigate={handleNavigation} currentView={currentView} />
        <main>
          {currentView === 'home' && (
            <>
              <Hero onNavigate={handleNavigation} />
              <ClubInfo />
            </>
          )}

          {currentView === 'events' && <EventsPage initialFilter={eventsFilter} />}
          {currentView === 'team' && <TeamPage />}
          {currentView === 'about' && <AboutPage />}
          
          {/* Simple Footer */}
          <footer className="py-12 text-center text-gray-600 text-sm font-mono border-t border-gray-900">
            <p>GFG GHRCEMP © {new Date().getFullYear()}</p>
            <button
              onClick={() => window.open('https://github.com/sagar-patil-here', '_blank', 'noopener,noreferrer')}
              className="mt-2 text-xs text-gray-500 hover:text-white transition-colors"
            >
              🦋 Proudly made by the Technical Team GFG GHRCEMP 🦋
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <TransitionProvider>
    <MainContent />
  </TransitionProvider>
);

export default App;
