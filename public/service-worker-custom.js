const cacheName = "Currently-v1.1";
const filesToCache = ["/", "/manifest.json", "/index.html", "/static/index.html", "/static/media/books.06c276ac.jpg", "/static/js/main.5253fb3a.js", "/static/css/main.041cfb7a.css", "/service-worker-custom.js", "/static/js/firebase.js", "/static/js/firestore.js"];

self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Servicework] Activate");
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log("[ServiceWorker] Removing old cache shell", key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", (event) => {
  // event.respondWith(fetchAndReplace(event.request));
  console.log("[ServiceWorker] Fetch");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});