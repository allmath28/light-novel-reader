
const CACHE_NAME = 'light-novel-reader-cache-v2'; // Incremented version
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/index.tsx',
    '/App.tsx',
    '/constants.ts',
    '/types.ts',
    '/components/Reader.tsx',
    '/components/Header.tsx',
    '/components/Footer.tsx',
    '/components/TableOfContents.tsx',
    '/components/icons.tsx',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache and caching app shell');
            // Cache app shell
            const appShellPromise = cache.addAll(APP_SHELL_URLS).catch(err => {
                console.error('Failed to cache app shell resources:', err);
            });
            
            // Cache external resources separately to handle potential CORS issues gracefully
            const externalResources = [
                'https://cdn.tailwindcss.com',
                'https://esm.sh/react@^19.1.0',
                'https://esm.sh/react-dom@^19.1.0/client',
                 // Cache first page to improve initial load
                'https://storage.googleapis.com/genai-downloads/prompt/v1/3d17a39d844256385e3a8910085a53697e684070b4c7402660161476d491c6d3/image_0.jpeg'
            ];

            const externalPromise = Promise.all(
                externalResources.map(url => {
                    return fetch(new Request(url, { mode: 'cors' }))
                        .then(response => {
                            if (response.ok) {
                                return cache.put(url, response);
                            }
                            console.error(`Failed to fetch and cache ${url}: ${response.statusText}`);
                        })
                        .catch(err => console.error(`Fetch error for ${url}:`, err));
                })
            );

            return Promise.all([appShellPromise, externalPromise]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Cache hit - return response
            if (cachedResponse) {
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(event.request).then(
                (networkResponse) => {
                    // Check if we received a valid response to cache
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }
                    
                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    const responseToCache = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                }
            ).catch(error => {
                console.error('Fetching failed:', error);
                // Optional: return a fallback offline page if you have one
                // For this app, failing silently is acceptable as content is cached on view
            });
        })
    );
});
