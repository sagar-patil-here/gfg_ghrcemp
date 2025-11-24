import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTransition } from '../context/TransitionContext.tsx';

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
  },
  {
    id: "02",
    title: "Collaborative Learning",
    description: "Fostering a culture of peer-to-peer knowledge sharing and group innovation.",
  },
  {
    id: "03",
    title: "Community Growth",
    description: "Expanding the tech ecosystem through GFG resources and campus-wide initiatives.",
  },
  {
    id: "04",
    title: "Industry Bridge",
    description: "Connecting academic foundations with real-world industry demands and leadership.",
  }
];

const ClubInfo: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { triggerTransition } = useTransition();

  const handleGetInTouch = () => {
    triggerTransition('Contact', () => {
      window.open('mailto:ghrcemgfg@gmail.com?subject=Contact%20GFG%20GHRCEMP', '_blank');
    });
  };

  return (
    <section className="bg-[#1c1d20] text-white py-32 px-4 md:px-12 relative z-10 rounded-t-[3rem] -mt-12 shadow-2xl">
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
          
          <div className="flex flex-col">
             {objectives.map((obj, i) => (
                <div 
                  key={i}
                  className={`group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/20 cursor-pointer transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-30' : 'opacity-100'}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                   <h3 className="text-3xl md:text-5xl font-medium group-hover:-translate-x-2 transition-transform duration-500">{obj.title}</h3>
                   <p className="text-gray-400 mt-4 md:mt-0 md:max-w-xs transition-all duration-500 group-hover:text-white group-hover:translate-x-2">
                      {obj.description}
                   </p>
                </div>
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
          <div>
             <p className="text-sm text-gray-500 mb-2">Coordinated by</p>
             <h4 className="text-2xl font-medium">Ms. Juhi Agrawal</h4>
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
