import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TransitionContextType {
  triggerTransition: (label: string, callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [label, setLabel] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setIsMobile(width <= 768); // Simple mobile check
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const triggerTransition = (newLabel: string, callback: () => void) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLabel(newLabel);

    const width = dimensions.width;
    const height = dimensions.height;
    // Disable curve on mobile by setting it to 0, otherwise standard 300
    const curve = isMobile ? 0 : 300; 

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        gsap.set(overlayRef.current, { pointerEvents: 'none' });
        const resetPath = `M 0 ${height} Q ${width/2} ${height} ${width} ${height} L ${width} ${height} Q ${width/2} ${height} 0 ${height} Z`;
        pathRef.current?.setAttribute('d', resetPath);
        setLabel(""); // Reset label
      }
    });

    const startPath = `M 0 ${height} Q ${width/2} ${height} ${width} ${height} L ${width} ${height} Q ${width/2} ${height} 0 ${height} Z`;

    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: 'all' });
    gsap.set(pathRef.current, { attr: { d: startPath } });
    // Prepare Text: Hidden initially - Move start position much lower to simulate being "pushed up" by the liquid
    gsap.set(textRef.current, { y: 150, opacity: 0 });

    const progress = { value: 0 };

    // Phase 1: ENTER
    tl.to(progress, {
      value: 1,
      duration: 0.8,
      ease: 'power3.in',
      onUpdate: () => {
        const val = progress.value;
        const topY = height * (1 - val); 
        const topCurve = topY - (Math.sin(val * Math.PI) * curve); 
        const bottomY = height;
        const bottomCurve = height;
        const d = `M 0 ${topY} Q ${width/2} ${topCurve} ${width} ${topY} L ${width} ${bottomY} Q ${width/2} ${bottomCurve} 0 ${bottomY} Z`;
        pathRef.current?.setAttribute('d', d);
      }
    })
    // Show Text: Sync with the liquid rising
    // It should start appearing as the liquid passes the middle
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out' // Matches liquid movement easing better
    }, "-=0.2") // Offset adjusted to start after 60% coverage (roughly 0.2s before end)

    .call(callback)

    // Phase 2: EXIT
    .to(progress, {
      value: 2,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        const val = progress.value - 1; 
        const topY = -height * val * 0.2; 
        const topCurve = topY;
        const bottomY = height * (1 - val); 
        const bottomCurve = bottomY + (Math.sin(val * Math.PI) * curve);
        const d = `M 0 ${topY} Q ${width/2} ${topCurve} ${width} ${topY} L ${width} ${bottomY} Q ${width/2} ${bottomCurve} 0 ${bottomY} Z`;
        pathRef.current?.setAttribute('d', d);
      }
    })
    // Hide Text FASTER: Disappear quickly while liquid is still high
    .to(textRef.current, {
      y: -100, // Move UP further to look like it's carried away
      opacity: 0,
      duration: 0.25, // Faster duration (was 0.3)
      ease: 'power2.in'
    }, "-=0.9"); // Start early in the exit phase
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 pointer-events-none z-[9999] flex flex-col justify-end"
      >
        <svg 
          className="absolute inset-0 w-full h-full text-[#1a1a1a] fill-current"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }} 
        >
          <path ref={pathRef} d="" />
        </svg>
        
        {/* Transition Label - Absolute Center */}
        <div 
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex justify-center items-center"
        >
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight uppercase whitespace-nowrap text-center">
            {label}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
