import React, { useEffect, useState } from 'react';
import { useTransition } from '../context/TransitionContext.tsx';

interface HeroProps {
  onNavigate?: (view: string, filter?: 'Upcoming' | 'Past') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [offset, setOffset] = useState(0);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    triggerTransition(view, () => {
      onNavigate?.(view);
    });
  };

      const handleJoinClick = () => {
        triggerTransition('Join', () => {
          window.open('mailto:ghecemgfg@gmail.com?subject=Join%20GFG%20GHRCEMP', '_blank');
        });
      };

      return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f0f0f]">
      
      {/* Parallax Background Typography */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10 whitespace-nowrap select-none"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <h1 className="text-[30vw] font-bold font-display text-white leading-none tracking-tighter relative">
          GFG CB
          <span className="absolute -bottom-4 left-2 text-2xl md:text-4xl font-mono tracking-widest opacity-60">
            STUDENT CHAPTER &rarr; CAMPUS BODY
          </span>
        </h1>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <div className="overflow-hidden mb-4">
          <p className="text-[#00df9a] font-mono text-sm tracking-[0.3em] uppercase animate-[slideUp_0.8s_ease-out_0.5s_both]">
            GeeksforGeeks Campus Body
          </p>
        </div>
        
        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 tracking-tight leading-tight">
          <span className="block animate-[slideUp_0.8s_ease-out_0.7s_both]">Code. Compete.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 animate-[slideUp_0.8s_ease-out_0.9s_both]">
            Conquer.
          </span>
        </h2>

        <div className="flex justify-center gap-4 animate-[fadeIn_1s_ease-out_1.2s_both]">
          <button className="px-8 py-4 bg-white text-black font-bold font-display text-sm uppercase tracking-wider hover:bg-[#00df9a] hover:text-black transition-colors duration-300" onClick={() => {
            triggerTransition('Events', () => {
              onNavigate?.('Events', 'Upcoming');
            });
          }}>
            Upcoming Events
          </button>
          <button 
            className="px-8 py-4 border border-white text-white font-bold font-display text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
            onClick={handleJoinClick}
          >
            Join Chapter
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
