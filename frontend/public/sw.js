const CACHE_NAME = 'full-quality-media-v2';

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache First for images and videos with 100% original quality
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept requests for static images and videos
  if (
    url.pathname.startsWith('/videos/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(event.request);
          // Only cache full 200 responses for HTTP(S) GET requests (skip 206 partial content and chrome-extensions)
          if (
            networkResponse.status === 200 &&
            event.request.method === 'GET' &&
            url.protocol.startsWith('http')
          ) {
            try {
              await cache.put(event.request, networkResponse.clone());
            } catch (cErr) {
              // Ignore cache storage errors for partial or extension requests
            }
          }
          return networkResponse;
        } catch (error) {
          return cachedResponse || Response.error();
        }
      })
    );
  }
});
