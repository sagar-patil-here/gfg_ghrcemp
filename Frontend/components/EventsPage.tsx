import React, { useState } from 'react';
import { EventDetails } from '../types';

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

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<'Upcoming' | 'Past'>('Past');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredEvents = MOCK_EVENTS.filter(e => e.status === filter);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-12 px-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-800 pb-8 relative">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
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
                <span className="text-2xl font-display font-bold text-white">{event.date.split(' ')[1].replace(',', '')}</span>
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
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
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
              <div className="flex-shrink-0 z-10 mt-4 md:mt-0">
                <button className="px-6 py-3 bg-white text-black font-bold font-display text-xs uppercase tracking-wider hover:bg-[#00df9a] transition-colors duration-300 w-full md:w-auto">
                  {event.status === 'Upcoming' ? 'Register Now' : 'View Details'}
                </button>
              </div>

              {/* Decorative ID */}
              <div className="absolute top-4 right-4 text-[100px] font-display font-bold text-white opacity-[0.02] pointer-events-none select-none group-hover:opacity-[0.05] transition-opacity duration-500">
                {event.id}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-24 text-gray-500 font-mono">
            {filter === 'Upcoming' 
              ? 'Currently no upcoming event scheduled.' 
              : 'No events found in this category.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

