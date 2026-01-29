import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchDriveImages } from '../services/driveService';

const STATIC_PHOTOS = [
  '/content/IMG_0527.JPG',
  '/content/IMG_0528.JPG',
  '/content/IMG_0530.JPG',
  '/content/IMG_0535.JPG',
  '/content/IMG_0536.JPG',
  '/content/winner.JPG',
  '/content/The team.JPG',
];

const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>(STATIC_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const driveImages = await fetchDriveImages();
      if (driveImages.length > 0) {
        setPhotos(driveImages);
      }
    };
    loadImages();

    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>Gallery | GFG GHRCEMP Student Chapter</title>
        <meta name="description" content="Explore the vibrant moments, event winners, and community gatherings of GFG GHRCEMP." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-gray-800 pb-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#00df9a] mb-3">
            Gallery
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Moments & Memories
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-400 max-w-2xl">
            A visual journey through our workshops, hackathons, and celebrations.
          </p>
        </header>

        {/* Gallery Grid */}
        <div className={`transition-opacity duration-1000 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((photo, index) => {
            const getLayoutClasses = (idx: number) => {
              switch (idx) {
                case 0: return 'md:col-span-2 md:row-span-2';
                case 1: return 'md:col-span-1 md:row-span-2';
                case 2: return 'md:col-span-1 md:row-span-1';
                case 3: return 'md:col-span-1 md:row-span-1';
                case 4: return 'md:col-span-2 md:row-span-1';
                case 5: return 'md:col-span-2 md:row-span-1';
                case 6: return 'md:col-span-4 md:row-span-2';
                default: return 'md:col-span-1 md:row-span-1';
              }
            };

            return (
              <div
                key={photo}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111111] border border-white/5 hover:border-[#00df9a]/50 transition-all duration-500 ${getLayoutClasses(index)}`}
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover opacity-80 grayscale-[0.3] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-[#00df9a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_#00df9a]" />
              </div>
            );
          })}
        </div>
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

export default GalleryPage;
