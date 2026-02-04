import React, { useState, useEffect } from 'react';
import { EventDetails } from '../types';
import { Helmet } from 'react-helmet-async';

const MOCK_EVENTS: EventDetails[] = [
  {
    id: 'e1',
    title: 'Dive into DSA',
    summary: 'An intensive workshop focused on Data Structures and Algorithms. Master the fundamentals and advanced concepts with hands-on practice.',
    date: 'Jan 15, 2025',
    time: '10:00 AM',
    location: 'E-312',
    category: 'Workshop',
    status: 'Past',
  },
  {
    id: 'e2',
    title: 'Ideathon 2k25',
    summary: 'A 24-hour innovation challenge where participants brainstorm and pitch creative solutions to real-world problems. Showcase your ideas and win exciting prizes!',
    date: 'Feb 20, 2025',
    time: '09:00 AM',
    location: 'E-312',
    category: 'Contest',
    status: 'Past',
  },
  {
    id: 'e3',
    title: 'GFG Gaming Event',
    summary: 'An exciting gaming competition featuring multiple tournaments. Compete with fellow students in various games and showcase your gaming skills.',
    date: 'Mar 10, 2025',
    time: '02:00 PM',
    location: 'E-312',
    category: 'Event',
    status: 'Past',
  }
];

interface EventsPageProps {
  initialFilter?: 'Upcoming' | 'Past';
  }

const EventsPage: React.FC<EventsPageProps> = ({ initialFilter = 'Past' }) => {
  const [filter, setFilter] = useState<'Upcoming' | 'Past'>(initialFilter);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Update filter when initialFilter prop changes
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  // Load Luma script dynamically
  useEffect(() => {
    const scriptId = 'luma-checkout';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://embed.lu.ma/checkout-button.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const filteredEvents = MOCK_EVENTS.filter(e => e.status === filter);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-12 px-6 animate-[fadeIn_0.5s_ease-out]">
      <Helmet>
        <title>Events | GFG GHRCEMP Student Chapter</title>
        <meta name="description" content="Discover upcoming workshops, hackathons, and tech talks organized by GFG GHRCEMP. Enhance your coding skills." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-800 pb-8 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              Events
            </span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl">
            Stay updated with our latest workshops, hackathons, and tech talks. Join us to learn, compete, and grow.
          </p>

          {/* Floating Filter Tabs */}
          <div className="flex gap-6 mt-8">
            {['Past', 'Upcoming'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as 'Upcoming' | 'Past')}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative pb-2 ${
                  filter === tab ? 'text-[#00df9a]' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#00df9a] transition-all duration-300 ${
                  filter === tab ? 'w-full' : 'w-0'
                }`}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Upcoming Event (Luma) */}
        {filter === 'Upcoming' && (
          <div className="mb-16 w-full animate-[fadeIn_0.5s_ease-out]">
            <div className="relative overflow-hidden rounded-2xl bg-[#141414] border border-[#00df9a] p-8 md:p-12 shadow-[0_0_30px_rgba(0,223,154,0.15)] flex flex-col items-center text-center group">
              
              {/* Pulsing Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00df9a]/10 via-transparent to-[#00df9a]/10 opacity-20 animate-pulse pointer-events-none" />
              
              <span className="inline-block px-4 py-1 rounded-full bg-[#00df9a]/20 text-[#00df9a] text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-[#00df9a]/30">
                Flagship Initiative
              </span>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Dive Into <span className="text-[#00df9a]">DSA 2.0</span> EP.3
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 text-sm font-mono text-gray-300">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00df9a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Feb 7 • 9:30 AM
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00df9a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  GHRCEM Pune
                </span>
              </div>
              
              <p className="text-gray-400 max-w-2xl text-lg mb-10 leading-relaxed">
                Starting from absolute basics to advanced concepts. Build a strong foundation in Data Structures and Algorithms with hands-on practice and guided problem solving. Beginner friendly!
              </p>

              <a
                href="https://luma.com/event/evt-yTg3pNT3BOsuxRK"
                className="luma-checkout--button relative overflow-hidden inline-flex items-center justify-center px-8 py-4 !bg-[#f3f3f3] !text-black font-bold text-sm uppercase tracking-wider hover:!bg-[#00df9a] hover:scale-105 transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,223,154,0.4)] z-10"
                data-luma-action="checkout"
                data-luma-event-id="evt-yTg3pNT3BOsuxRK"
              >
                <span className="relative z-10">Register for Event</span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </a>

              <style>{`
                @keyframes shimmer {
                  100% {
                    transform: translateX(100%);
                  }
                }
              `}</style>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-[#141414] border border-gray-800 p-6 md:p-8 hover:border-[#00df9a] transition-all duration-500 flex flex-col md:flex-row gap-6 md:items-center overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#00df9a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Date Box */}
              <div className="flex-shrink-0 w-24 h-24 bg-[#0f0f0f] border border-gray-700 flex flex-col items-center justify-center group-hover:border-[#00df9a] transition-colors duration-300 z-10">
                <span className="text-2xl font-bold text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                <span className="text-xs font-mono uppercase text-gray-500">{event.date.split(' ')[0]}</span>
              </div>

              {/* Content */}
              <div className="flex-grow z-10">
                <div className="flex items-center gap-3 mb-2">
                   <span className={`w-2 h-2 rounded-full ${
                      event.category === 'Event' ? 'bg-purple-500' : 
                      event.category === 'Workshop' ? 'bg-blue-500' : 
                      event.category === 'Contest' ? 'bg-red-500' : 'bg-[#00df9a]'
                    }`}></span>
                  <span className="text-xs font-mono uppercase text-[#00df9a] tracking-widest">
                    {event.category} • {event.time}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm max-w-xl">{event.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 z-10 mt-4 md:mt-0 text-xs uppercase tracking-[0.3em] text-gray-500">
                {event.status === 'Upcoming' ? 'Registration opens soon' : 'Archive ready'}
              </div>

              {/* Decorative ID */}
              <div className="absolute top-4 right-4 text-[100px] font-bold text-white opacity-[0.02] pointer-events-none select-none group-hover:opacity-[0.05] transition-opacity duration-500">
                {event.id}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && filter !== 'Upcoming' && (
          <div className="text-center py-24 text-gray-500 font-mono">
            No events found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

