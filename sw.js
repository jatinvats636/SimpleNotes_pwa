importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

var CACHE = "simple-note";
var offlineFallbackPage = [
  "/",
  "/images/",
  "/index.html",
  "/style.css",
  "/function.js",
  "/android/",
  "/chrome/",
  "/firefox/",
  "/msteams/",
  "/windows/",
  "/windows10/",
];

// /* Start the service worker and cache all of the app's content */
// self.addEventListener("install", function (e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// /* Serve cached content when offline */
// self.addEventListener("fetch", function (e) {
//   e.respondWith(
//     caches.match(e.request).then(function (response) {
//       return response || fetch(e.request);
//     })
//   );
// });

// This is the "Offline page" service worker

// const CACHE = "pwabuilder-page";

// // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })()
    );
  }
});
