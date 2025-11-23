import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate organic loading curve (fast start, slow end)
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Random increment based on current progress
      const increment = currentProgress < 50 
        ? Math.random() * 10 + 5 // Fast
        : currentProgress < 80 
          ? Math.random() * 5 + 2 // Medium
          : Math.random() * 2 + 0.5; // Slow finish

      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Brief pause at 100% before exit animation
        setTimeout(() => {
          setIsExiting(true);
          // Wait for exit animation to finish before unmounting from DOM
          setTimeout(onComplete, 1000);
        }, 500);
      }
      
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f0f] text-white transition-transform duration-[1000ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Typography Decoration - Fixed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-5">
        <h1 className="text-[20vw] font-bold font-display leading-none tracking-tighter">
          GFG
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Top Info Row */}
        <div className="flex justify-between items-end mb-4 text-xs uppercase tracking-widest text-gray-500 font-mono">
          <span>System</span>
          <span>Loading Assets</span>
        </div>

        {/* Progress Number - Massive */}
        <div className="flex items-baseline overflow-hidden">
          <span className="text-9xl md:text-[12rem] font-display font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
            {progress}
          </span>
          <span className="text-4xl font-light text-gray-500 ml-2">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[1px] bg-gray-800 mt-8 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00df9a] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Status Text */}
        <div className="mt-4 flex justify-between text-sm font-mono text-gray-400 h-6 overflow-hidden">
          <div className="flex flex-col transition-transform duration-300" style={{ transform: `translateY(${progress > 50 ? '-100%' : '0'})` }}>
            <span>INITIALIZING KERNEL...</span>
            <span>ESTABLISHING LINK...</span>
          </div>
          <span className="animate-pulse">{progress === 100 ? 'COMPLETE' : 'PROCESSING'}</span>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-600">
        <span>GFG Campus Body</span>
        <span>© 2025</span>
      </div>
    </div>
  );
};

export default Loader;