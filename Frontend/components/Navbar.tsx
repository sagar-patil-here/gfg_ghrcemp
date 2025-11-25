import React, { useState, useEffect } from 'react';
import { useTransition } from '../context/TransitionContext.tsx';

interface NavbarProps {
  onNavigate?: (view: string, filter?: 'Upcoming' | 'Past') => void;
  currentView?: 'home' | 'events' | 'team' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (view: string, filter?: 'Upcoming' | 'Past') => {
    setIsMobileMenuOpen(false);
    triggerTransition(view, () => {
      onNavigate?.(view, filter);
    });
  };

  const isActive = (item: string) => {
    const key = item.toLowerCase(); // events, team, about
    return currentView === key;
  };

  const handleJoinClick = () => {
    setIsMobileMenuOpen(false);
    triggerTransition('Join', () => {
      window.open('mailto:ghrcemgfg@gmail.com?subject=Join%20GFG%20GHRCEMP', '_blank');
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 px-6 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
          : 'py-6'
      }`}
    >
      <div className={`flex justify-between items-center max-w-7xl mx-auto ${
        !isScrolled ? 'mix-blend-difference text-white' : 'text-white'
      }`}>
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-3 h-3 bg-[#00df9a] rounded-full animate-pulse"></div>
          <span className="font-bold text-xl tracking-tighter">GFG GHRCEMP</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {['Events', 'Team', 'About'].map((item) => (
            <button 
              key={item}
              onClick={() => handleNavClick(item, item === 'Events' ? 'Past' : undefined)}
              className={`hover:text-[#00df9a] transition-colors duration-300 relative group ${
                isActive(item) ? 'text-[#00df9a]' : ''
              }`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#00df9a] transition-all duration-300 group-hover:w-full ${
                isActive(item) ? 'w-full' : 'w-0'
              }`}></span>
            </button>
          ))}
          <button
            onClick={handleJoinClick}
            className="text-sm font-medium tracking-wider hover:text-[#00df9a] transition-colors duration-300 relative group"
          >
            Join
            <span className="absolute -bottom-1 left-0 h-[1px] bg-[#00df9a] transition-all duration-300 group-hover:w-full w-0"></span>
          </button>
        </div>

        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-white z-50 relative"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90"></div>
        
        {/* Sidebar */}
        <div 
          className={`absolute top-0 right-0 h-full w-64 bg-[#00df9a] shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#00df9a', opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-black hover:rotate-90 transition-transform duration-300"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col h-full pt-24 px-8">
            {/* Navigation Links */}
            <div className="flex flex-col gap-6">
              {['Home', 'Events', 'Team', 'About'].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleNavClick(item, item === 'Events' ? 'Past' : undefined)}
                  className={`text-left text-lg font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive(item) 
                      ? 'text-black font-bold' 
                      : 'text-black/80 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              <button
                onClick={handleJoinClick}
                className="text-left text-lg font-medium uppercase tracking-wider text-black/80 hover:text-black transition-colors duration-300"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
