import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTransition } from '../context/TransitionContext.tsx';
import coordinatorPhoto from './club-CO.png';

const stats = [
  { label: "Registered Students", current: 160, prev: 120, suffix: "+" },
  { label: "Activities Conducted", current: 8, prev: 9, suffix: "" },
  { label: "Students Benefited", current: 2870, prev: 3794, suffix: "+" },
];

const recentEvents = [
  { title: "Headshot Havoc", date: "Jan 16", year: "2025", type: "Gaming" },
  { title: "Blind Code", date: "Aug 28", year: "2024", type: "Contest" },
  { title: "GRE Mock Test", date: "Aug 09", year: "2024", type: "Workshop" },
  { title: "TechOn SQL", date: "Jan 13", year: "2024", type: "Workshop" },
];

const objectives = [
  {
    id: "01",
    title: "Technical Excellence",
    description: "Developing industry-relevant skills through hands-on practice and mentorship.",
    image: "/technical_excellence.jpg"
  },
  {
    id: "02",
    title: "Collaborative Learning",
    description: "Fostering a culture of peer-to-peer knowledge sharing and group innovation.",
    image: "/collaborative_learning.JPG"
  },
  {
    id: "03",
    title: "Community Growth",
    description: "Expanding the tech ecosystem through GFG resources and campus-wide initiatives.",
    image: "/community_growth.JPG"
  },
  {
    id: "04",
    title: "Industry Bridge",
    description: "Connecting academic foundations with real-world industry demands and leadership.",
    image: "/industry_bridge.JPG"
  }
];

const ClubInfo: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { triggerTransition } = useTransition();
  const objectiveRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse position for image reveal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for the image container
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) {
          const index = Number(visibleEntries[0].target.getAttribute('data-index'));
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      },
      { threshold: [0.25, 0.6, 0.9] }
    );

    objectiveRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetInTouch = () => {
    triggerTransition('Contact', () => {
      window.open('mailto:ghrcemgfg@gmail.com?subject=Contact%20GFG%20GHRCEMP', '_blank');
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  const activeImageIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section
      className="bg-[#1c1d20] text-white py-32 px-4 md:px-12 relative z-10 rounded-t-[3rem] -mt-12 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
       {/* Floating Image Reveal Container */}
       <motion.div 
         style={{ x, y, translateX: "-50%", translateY: "-50%" }}
         className="fixed top-0 left-0 w-[360px] h-[240px] pointer-events-none z-50 hidden md:block overflow-hidden rounded-[1.5rem]"
         initial={{ scale: 0, opacity: 0 }}
         animate={{ 
           scale: hoveredIndex !== null ? 1 : 0,
           opacity: hoveredIndex !== null ? 1 : 0
         }}
         transition={{ duration: 0.3, ease: "easeOut" }}
       >
         {objectives.map((obj, i) => (
            <img 
              key={i}
              src={obj.image}
              alt={obj.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                activeImageIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
         ))}
       </motion.div>

       {/* Large Statement */}
       <div className="border-b border-white/20 pb-24 mb-24">
          <h2 className="text-[3.5rem] md:text-[6rem] leading-[1] font-medium max-w-6xl">
             Helping students <span className="text-gray-500">stand out</span> in the digital era.
          </h2>
       </div>

       {/* Stats - Minimal Strip */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          {stats.map((stat, i) => (
             <div key={i}>
                <h3 className="text-5xl md:text-6xl font-medium mb-2">{stat.current}{stat.suffix}</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
             </div>
          ))}
       </div>

       {/* Interactive List (Objectives) */}
       <div className="mb-32">
          <p className="text-xs uppercase text-gray-500 mb-8 pb-4 border-b border-white/10">Core Objectives</p>
          
          <div className="flex flex-col relative">
             {objectives.map((obj, i) => (
                <motion.div 
                  key={i}
                  ref={(el) => {
                    objectiveRefs.current[i] = el;
                  }}
                  data-index={i}
                  className={`group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/20 cursor-pointer transition-all duration-500 ${
                    hoveredIndex !== null && hoveredIndex !== i ? 'opacity-30' : 'opacity-100'
                  }`}
                  onMouseEnter={(event) => {
                    setHoveredIndex(i);
                    mouseX.set(event.clientX + 20);
                    mouseY.set(event.clientY + 20);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0.3, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-gray-600 text-sm font-mono">{obj.id}</span>
                    <h3 className="text-3xl md:text-5xl font-medium group-hover:-translate-x-2 transition-transform duration-500">
                      {obj.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 mt-6 md:mt-0 md:max-w-sm transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                     {obj.description}
                  </p>
                </motion.div>
             ))}
          </div>
       </div>

       {/* Recent Highlights - Simple Rows */}
       <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
             <h3 className="text-4xl md:text-5xl font-medium">Recent Highlights</h3>
             <button className="text-sm uppercase tracking-wider border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">View Archive</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
             {recentEvents.map((event, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-pointer">
                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-xs font-mono text-gray-400 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      {event.year.slice(2)}
                   </div>
                   <div>
                      <h4 className="text-xl font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">{event.title}</h4>
                      <p className="text-gray-500 text-sm">{event.type} — {event.date}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>

      {/* Footer / Coordinator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-12">
         <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-md opacity-50"></div>
               <img 
                src={coordinatorPhoto} 
                alt="Club Coordinator"
                 className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover object-top border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
                loading="lazy"
                decoding="async"
                 style={{ objectPosition: '50% 35%' }}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Coordinated by</p>
              <h4 className="text-2xl font-medium">Ms. Juhi Agrawal</h4>
              <p className="text-sm text-gray-500 mt-1">Faculty Mentor & Guide</p>
            </div>
         </div>
         <div className="mt-8 md:mt-0">
            <button 
              onClick={handleGetInTouch}
              className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
            >
               Get in Touch ↗
            </button>
         </div>
      </div>
    </section>
  );
};

export default ClubInfo;
