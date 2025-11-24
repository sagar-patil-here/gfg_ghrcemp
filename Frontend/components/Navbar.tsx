import React, { useState, useEffect } from 'react';
import { useTransition } from '../context/TransitionContext.tsx';

interface NavbarProps {
  onNavigate?: (view: string) => void;
  currentView?: 'home' | 'events' | 'team' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    triggerTransition(view, () => {
      onNavigate?.(view);
    });
  };

  const isActive = (item: string) => {
    const key = item.toLowerCase(); // events, team, about
    return currentView === key;
  };

  const handleJoinClick = () => {
    triggerTransition('Join', () => {
      window.open('mailto:ghecemgfg@gmail.com?subject=Join%20GFG%20GHRCEMP', '_blank');
    });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 px-6 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 text-white shadow-lg' 
          : 'py-6 mix-blend-difference text-white'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-3 h-3 bg-[#00df9a] rounded-full animate-pulse"></div>
          <span className="font-display font-bold text-xl tracking-tighter">GFG GHRCEMP</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {['Events', 'Team', 'About'].map((item) => (
            <button 
              key={item}
              onClick={() => handleNavClick(item)}
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

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
