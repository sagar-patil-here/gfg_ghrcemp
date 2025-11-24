import React from 'react';

const TeamPage: React.FC = () => {
  const members = [
    { name: 'Vedant Hingne', role: 'President', linkedin: 'https://www.linkedin.com/in/vedant-hingne-10900027b/' },
    { name: 'Namami Paliwal', role: 'Vice President', linkedin: 'https://www.linkedin.com/in/namamip/' },
    { name: 'Vedant Tichkule', role: 'Content Lead', linkedin: 'https://www.linkedin.com/in/vedant-tichkule-13471336b/' },
    { name: 'Prem Bonde', role: 'Social Media', linkedin: 'https://www.linkedin.com/in/prem-bonde-4b944a2b6/' },
    { name: 'Palak Singh', role: 'Marketing Lead', linkedin: 'https://www.linkedin.com/in/palak-singh-76b5402b4/' },
    { name: 'Sagar Patil', role: 'Technical Lead', linkedin: 'https://www.linkedin.com/in/sagar-patil-here/' },
    { name: 'Aditya Bawaskar', role: 'PR Lead', linkedin: 'https://www.linkedin.com/in/aditya-bawaskar-70a13516b/' },
    { name: 'Abhishek Sakure', role: 'Event Management', linkedin: 'https://www.linkedin.com/in/abhishek-sakure-869177296/' },
    { name: 'Rohan Ammulwad', role: 'Design Lead', linkedin: 'https://www.linkedin.com/in/rohan-anmulwad-b7b444232/' },
  ];

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-gray-800 pb-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#00df9a] mb-3">
            Core Team
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            GFG GHRCEMP Team
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-400 max-w-2xl">
            The student team that plans events, curates contests, and builds the experience you see
            across campus and online.
          </p>
        </header>

        {/* Team 2k25 Image */}
        <div className="mb-12 relative">
          <img
            src="/content/The team.JPG"
            alt="Team 2k25"
            className="w-full h-auto rounded-xl"
            loading="lazy"
            decoding="async"
          />
          {/* Simple Heading Overlay */}
          <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white mb-1">
              Team
            </p>
            <h2 className="text-base md:text-lg font-display font-bold tracking-tight text-white">
              Team 2k25
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {members.map((m, index) => (
            <div
              key={m.name + m.role}
              className="group relative border border-gray-800 bg-gradient-to-br from-[#101010] to-[#0a0a0a] px-6 py-6 rounded-xl hover:border-[#00df9a] hover:shadow-[0_0_30px_rgba(0,223,154,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00df9a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00df9a] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {m.role}
                </span>
                <div className="flex items-center gap-2">
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#00df9a] transition-colors duration-300 hover:underline flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {m.name}
                      <svg className="w-4 h-4 text-[#00df9a] opacity-70 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  ) : (
                    <span className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#00df9a] transition-colors duration-300">
                      {m.name}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#00df9a]/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;


