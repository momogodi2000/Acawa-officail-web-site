// ACAWA PWA Service Worker - Advanced Caching & Offline Support
const CACHE_NAME = 'acawa-v1.0.1';
const STATIC_CACHE = 'acawa-static-v1.0.1';
const RUNTIME_CACHE = 'acawa-runtime-v1.0.1';
const API_CACHE = 'acawa-api-v1.0.1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/logo.pg.jpg',
  '/icons/logo2.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Routes to cache for offline navigation
const OFFLINE_ROUTES = [
  '/',
  '/a-propos',
  '/clubs',
  '/champions',
  '/evenements',
  '/galerie',
  '/partenaires',
  '/contact'
];

// Assets to cache on first request
const CACHE_PATTERNS = [
  /\.(js|css|woff2|png|jpg|jpeg|svg|webp)$/,
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/cdnjs\.cloudflare\.com/
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        // Only cache assets that exist and aren't chrome-extension URLs
        return cache.addAll(STATIC_ASSETS.filter(asset => !asset.startsWith('chrome-extension')));
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  
  // Claim all clients immediately
  return self.clients.claim();
});

// Fetch event - Network first, then cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleDefaultRequest(request));
  }
});

// Check if request is for a static asset
function isStaticAsset(url) {
  return CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Check if request is navigation request
function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// Handle static assets - Cache first, then network
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Return cached version and update in background
      fetchAndCache(request, cache);
      return cachedResponse;
    }
    
    // Not in cache, fetch and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Error handling static asset:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle navigation requests - Network first, cache fallback
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('/');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page if available
    const offlineResponse = await cache.match('/offline.html');
    return offlineResponse || new Response(
      '<!DOCTYPE html><html><head><title>Hors ligne</title></head><body><h1>Pas de connexion</h1><p>Veuillez vérifier votre connexion internet.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Handle default requests - Network first, cache fallback
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok && request.url.startsWith('http')) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Try to find in cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return generic error response
    return new Response('Contenu non disponible hors ligne', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Background fetch and cache function
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    // Silently fail for background updates
  }
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
      event.waitUntil(backgroundSync());
    }
  });
}

async function backgroundSync() {
  try {
    // Perform background synchronization tasks
    console.log('[SW] Background sync completed');
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}