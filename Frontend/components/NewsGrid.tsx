import React from 'react';
import { CampusUpdate } from '../types';

interface NewsGridProps {
  updates: CampusUpdate[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ updates }) => {
  return (
    <section className="py-24 px-6 bg-[#141414] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-gray-800 pb-8">
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">Chapter Highlights</h3>
            <p className="text-gray-400 font-mono text-sm">Latest updates from our student community</p>
          </div>
          <div className="hidden md:block text-[#00df9a] text-sm font-bold uppercase tracking-wider">
             Always Updated
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <article 
              key={update.id}
              className="group relative bg-[#0f0f0f] border border-gray-800 p-8 hover:border-[#00df9a] transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-bold text-gray-700 group-hover:text-[#00df9a] transition-colors duration-300">
                0{index + 1}
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2 h-2 rounded-full ${
                  update.category === 'Event' ? 'bg-purple-500' : 
                  update.category === 'Workshop' ? 'bg-blue-500' : 
                  update.category === 'Contest' ? 'bg-red-500' : 'bg-[#00df9a]'
                }`}></span>
                <span className="text-xs font-mono uppercase text-gray-400 tracking-widest">{update.category}</span>
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00df9a] transition-colors duration-300">
                {update.title}
              </h4>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-gray-800 pl-4 group-hover:border-gray-600 transition-colors">
                {update.summary}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-900">
                <span className="text-xs font-mono text-gray-500">{update.date}</span>
                <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;