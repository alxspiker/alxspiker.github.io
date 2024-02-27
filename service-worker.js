const CACHE_NAME = 'qubixia_v1.0.16';
const urlsToCache = [
  '/index.html',
  '/qubixia.v1.js',
  '/validation-key.txt',
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .then(self.skipWaiting()) // Tell the new service worker to take over
    .then(self.clients.claim()) // Makes sure the new worker takes over existing clients
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
        cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});  