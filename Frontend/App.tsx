import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import EventsPage from './components/EventsPage';
import { fetchCampusUpdates } from './services/geminiService';
import { CampusUpdate } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [updates, setUpdates] = useState<CampusUpdate[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'events'>('home');

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

  const handleNavigation = (view: string) => {
    if (view === 'Events') {
      setCurrentView('events');
    } else {
      setCurrentView('home');
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-[#00df9a] selection:text-black">
      
      {/* The Loader sits on top until it slides away */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Application Content */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar onNavigate={handleNavigation} currentView={currentView} />
        <main>
          {currentView === 'home' ? (
            <>
              <Hero />
              <NewsGrid updates={updates} />
            </>
          ) : (
            <EventsPage />
          )}
          
          {/* Simple Footer */}
          <footer className="py-12 text-center text-gray-600 text-sm font-mono border-t border-gray-900">
            <p>GFG GHRCEMP © {new Date().getFullYear()}</p>
            <p className="mt-2 text-xs">POWERED BY GEMINI 2.5 FLASH</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
