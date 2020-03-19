// Cache the application
const cacheName = 'cache-v2';
const precacheResources = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/assets/css/app-shell.css',
    '/assets/css/app.css',
    '/assets/css/main.css',
    '/assets/sounds/boom.wav',
    '/assets/sounds/clap.wav',
    '/assets/sounds/hihat.wav',
    '/assets/sounds/kick.wav',
    '/assets/sounds/openhat.wav',
    '/assets/sounds/ride.wav',
    '/assets/sounds/snare.wav',
    '/assets/sounds/tink.wav',
    '/assets/sounds/tom.wav',
];
self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
            .catch(err => {
                console.log("cache error :", err)
            })
    );
});

// Serve files from the cache
self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});