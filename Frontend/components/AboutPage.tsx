import React, { useState } from 'react';

const AboutPage: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = [
    '/content/IMG_0527.JPG',
    '/content/IMG_0528.JPG',
    '/content/IMG_0530.JPG',
    '/content/IMG_0535.JPG',
    '/content/IMG_0536.JPG',
    '/content/winner.JPG',
    '/content/The team.JPG',
  ];

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-gray-800 pb-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#00df9a] mb-3">
            About
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            GFG Campus Body
          </h1>
          <div className="mt-6 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white border border-white/50 overflow-hidden flex items-center justify-center p-2">
              <img src="/gfg_logo.jpeg" alt="GFG logo" className="w-full h-full object-contain" loading="eager" />
            </div>
            <span className="text-sm font-mono tracking-[0.3em] text-gray-500">x</span>
            <div className="w-24 h-24 rounded-full bg-white border border-white/50 overflow-hidden flex items-center justify-center p-2">
              <img src="/raisoni_logo.png" alt="Raisoni logo" className="w-full h-full object-contain" loading="eager" />
            </div>
          </div>
        </header>

        <div className="space-y-6 text-sm md:text-base text-gray-300 leading-relaxed mb-16">
          <p>
            GFG GHRCEMP is the official GeeksforGeeks Campus Chapter of GHRCEM, built by students for
            students who want to push their skills in Data Structures & Algorithms, development, and
            real-world problem solving.
          </p>
          <p>
            From hands-on workshops and coding contests to hackathons and tech talks, we curate
            experiences that help you learn, ship projects, and prepare for internships and
            placements in top companies.
          </p>
          <p>
            This website is designed as an experimental playground – inspired by award-winning digital
            studios – combining smooth page transitions, custom interactions, and AI-powered content
            to showcase what a modern student community can build together.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#00df9a] mb-3">
            Media
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
            Our Event Winners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((photo, index) => {
            // Modern Bento Grid Layout
            const getLayoutClasses = (idx: number) => {
              switch (idx) {
                case 0: return 'md:col-span-2 md:row-span-2'; // Large Feature (Top Left)
                case 1: return 'md:col-span-1 md:row-span-2'; // Tall Portrait (Middle)
                case 2: return 'md:col-span-1 md:row-span-1'; // Small Square (Top Right)
                case 3: return 'md:col-span-1 md:row-span-1'; // Small Square (Bottom Right)
                case 4: return 'md:col-span-2 md:row-span-1'; // Wide Landscape (Middle Left)
                case 5: return 'md:col-span-2 md:row-span-1'; // Wide Landscape (Middle Right)
                case 6: return 'md:col-span-4 md:row-span-2'; // Massive Feature (Bottom - Team)
                default: return 'md:col-span-1 md:row-span-1';
              }
            };

            return (
              <div
                key={photo}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111111] border border-white/5 hover:border-[#00df9a]/50 transition-all duration-500 ${getLayoutClasses(index)}`}
                onClick={() => handlePhotoClick(photo)}
              >
                {/* Image */}
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover opacity-80 grayscale-[0.3] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Hover Interaction */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#00df9a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_#00df9a]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:text-[#00df9a] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default AboutPage;
