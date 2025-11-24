// Media Preloader Utility
// Preloads critical media assets during the loader phase

export interface PreloadItem {
  src: string;
  type: 'image' | 'video';
  priority?: 'high' | 'low';
}

const criticalAssets: PreloadItem[] = [
  // High priority - visible immediately
  { src: '/gfg_logo.jpeg', type: 'image', priority: 'high' },
  { src: '/raisoni_logo.png', type: 'image', priority: 'high' },
  { src: '/content/The team.JPG', type: 'image', priority: 'high' },
  
  // First few gallery items (above the fold)
  { src: '/content/IMG_0527.JPG', type: 'image', priority: 'high' },
  { src: '/content/IMG_0528.JPG', type: 'image', priority: 'high' },
];

const lowPriorityAssets: PreloadItem[] = [
  // Rest of gallery items
  { src: '/content/IMG_0530.JPG', type: 'image', priority: 'low' },
  { src: '/content/IMG_0535.JPG', type: 'image', priority: 'low' },
  { src: '/content/IMG_0536.JPG', type: 'image', priority: 'low' },
  { src: '/content/winner.JPG', type: 'image', priority: 'low' },
];

export const preloadMedia = (onProgress?: (loaded: number, total: number) => void): Promise<void> => {
  return new Promise((resolve) => {
    const allAssets = [...criticalAssets, ...lowPriorityAssets];
    let loaded = 0;
    const total = allAssets.length;
    let lastProgressUpdate = 0;
    
    // Throttle progress updates to avoid lag (max 10 updates per second)
    const throttledProgress = (loadedCount: number) => {
      const now = Date.now();
      if (now - lastProgressUpdate > 100) {
        lastProgressUpdate = now;
        // Use requestAnimationFrame to avoid blocking
        requestAnimationFrame(() => {
          onProgress?.(loadedCount, total);
        });
      }
    };

    const loadItem = (item: PreloadItem): Promise<void> => {
      return new Promise((itemResolve) => {
        // Use setTimeout to make loading non-blocking
        setTimeout(() => {
          if (item.type === 'image') {
            const img = new Image();
            img.onload = () => {
              loaded++;
              throttledProgress(loaded);
              itemResolve();
            };
            img.onerror = () => {
              loaded++;
              throttledProgress(loaded);
              itemResolve(); // Continue even if one fails
            };
            img.src = item.src;
          } else {
            // For videos, just preload metadata (non-blocking)
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
              loaded++;
              throttledProgress(loaded);
              itemResolve();
            };
            video.onerror = () => {
              loaded++;
              throttledProgress(loaded);
              itemResolve();
            };
            video.src = item.src;
          }
        }, 0);
      });
    };

    // Load high priority first, then low priority in background
    const highPriority = criticalAssets.filter(item => item.priority === 'high');
    const lowPriority = [...criticalAssets.filter(item => item.priority === 'low'), ...lowPriorityAssets];

    // Start loading high priority items
    Promise.all(highPriority.map(loadItem))
      .then(() => {
        // Start loading low priority in background (don't wait)
        Promise.all(lowPriority.map(loadItem)).then(() => {
          // Only resolve once all are done
        });
        // Resolve after high priority loads (don't wait for low priority)
        resolve();
      })
      .catch(() => {
        // Resolve even on error
        resolve();
      });
  });
};

