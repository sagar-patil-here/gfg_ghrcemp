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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Photos - Varied sizes to fill gaps */}
          {photos.map((photo, index) => {
            // Create varied layout: mix of landscape (span 2 cols) and portrait (span 2 rows) to fill gaps
            const getPhotoLayout = (idx: number) => {
              if (idx === 0) return { cols: 'md:col-span-2', rows: '', aspect: '16/10' }; // Wide landscape
              if (idx === 1) return { cols: '', rows: 'md:row-span-2', aspect: '2/3' }; // Tall portrait
              if (idx === 2) return { cols: '', rows: 'md:row-span-2', aspect: '2/3' }; // Tall portrait
              if (idx === 3) return { cols: 'md:col-span-2', rows: '', aspect: '16/10' }; // Wide landscape
              if (idx === 4) return { cols: '', rows: 'md:row-span-2', aspect: '2/3' }; // Tall portrait
              if (idx === 5) return { cols: 'md:col-span-2', rows: '', aspect: '16/10' }; // Wide landscape
              return { cols: '', rows: 'md:row-span-2', aspect: '2/3' }; // Default tall portrait
            };

            const layout = getPhotoLayout(index);

            return (
              <div
                key={photo}
                className={`group relative cursor-pointer overflow-hidden rounded-xl bg-[#111111] border border-gray-800 hover:border-[#00df9a] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,223,154,0.2)] ${layout.cols} ${layout.rows}`}
                style={{ aspectRatio: layout.aspect }}
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
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
