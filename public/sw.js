const CACHE_NAME = 'melo-studio-assistant-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

// 1. INSTALL: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline app shell');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Some precache assets failed:', err);
      });
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 2. ACTIVATE: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 3. FETCH: Offline-first / Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET or chrome-extension requests
  if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // A. Navigation requests (HTML pages like guiadoprodutor.netlify.app/ or any route)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If network is offline, retrieve from cache!
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to cached index.html or root
          const indexFallback = await caches.match('/index.html') || await caches.match('/');
          if (indexFallback) {
            return indexFallback;
          }
          return new Response(
            '<!DOCTYPE html><html><head><title>Modo Offline</title><meta charset="utf-8"/></head><body style="background:#0b0e11;color:#fff;font-family:sans-serif;text-align:center;padding:40px;"><h2>Modo Offline Ativo</h2><p>Abra o aplicativo conectado uma vez para carregar todos os módulos.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // B. Static Assets (JS, CSS, SVGs, Fonts, Images)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to update cache (Stale-While-Revalidate)
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Offline - using cached response is expected and fine
          });
        return cachedResponse;
      }

      // If not in cache, fetch from network and store in cache
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Network failed and not in cache
          console.warn('[ServiceWorker] Fetch failed for:', request.url);
          return new Response('', { status: 408, statusText: 'Request Timeout (Offline)' });
        });
    })
  );
});
