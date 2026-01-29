import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EventsPage from './components/EventsPage';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import CustomCursor from './components/CustomCursor';
import { fetchCampusUpdates } from './services/geminiService';
import { CampusUpdate } from './types';
import { TransitionProvider } from './context/TransitionContext.tsx';

const MainContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [updates, setUpdates] = useState<CampusUpdate[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [location.pathname]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Allow a small tick for the DOM to settle before showing content interactions if needed
    setTimeout(() => setShowContent(true), 100);
  };

  const handleNavigation = (view: string, filter?: 'Upcoming' | 'Past') => {
    const path = view.toLowerCase() === 'home' ? '/' : `/${view.toLowerCase()}`;
    // Pass filter in state if it exists
    navigate(path, { state: { filter } });
  };

  // Determine current view for Navbar active state
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1) as 'events' | 'team' | 'gallery' | 'about';
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-[#00df9a] selection:text-black cursor-none">
      
      <CustomCursor />
      
      {/* The Loader sits on top until it slides away */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Application Content */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar onNavigate={handleNavigation} currentView={getCurrentView()} />
        <main>
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigation} />} />
            <Route path="/events" element={<EventsPageWrapper />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          
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

// Wrapper to handle location state for EventsPage
const EventsPageWrapper = () => {
  const location = useLocation();
  const filter = location.state?.filter;
  return <EventsPage initialFilter={filter} />;
};

const App: React.FC = () => (
  <TransitionProvider>
    <MainContent />
  </TransitionProvider>
);

export default App;
