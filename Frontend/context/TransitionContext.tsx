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
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
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
    const curve = 300; 

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
    // Prepare Text: Hidden initially
    gsap.set(textRef.current, { y: 50, opacity: 0 });

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
    // Show Text FASTER: Appear earlier and faster
    // Only start showing text after 20% of progress has passed (approximately 0.16s into the 0.8s animation)
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4, // Faster duration (was 0.5)
      ease: 'power2.out'
    }, "-=0.84") // Start at 20% mark of the 0.8s duration (0.8 * 0.8 = 0.64 remaining)

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
    // Hide Text FASTER: Hide quicker and earlier
    .to(textRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.3, // Faster duration (was 0.4)
      ease: 'power2.in'
    }, "-=0.8"); // Start hiding immediately as exit begins (kept same offset but faster duration ensures it finishes well before transition end)
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
        
        {/* Transition Label */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <h2 className="text-white text-4xl md:text-6xl font-display font-bold tracking-tight uppercase">
            {label}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
