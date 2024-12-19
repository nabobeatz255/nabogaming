self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('nabogaming-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo.png',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/app.css',  // Add any stylesheets and JS files you need
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['nabogaming-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
