const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Check if it's an outdated cache
          if (cacheName !== CACHE_NAME) {
            // Delete the old cache
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Check if the request is for the specific JS file
  if (event.request.url.endsWith('qubixia.v1.js')) {
    event.respondWith(
      // Prioritize network to ensure you get the updated version.
      fetch(event.request).catch(() => {
        // Fallback to cache if network fails.
        return caches.match(event.request);
      }) 
    );
  } else {
    // For other requests, continue with the original logic
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
