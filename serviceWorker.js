var cacheName = 'zadania';
var filesToCache = [
  // 'https://olgasowlet.github.io/PSM-lista-zadan/',
  // 'https://olgasowlet.github.io/PSM-lista-zadan/index.html',
  './',
  './index.html',
  './css/button.css',
  './css/container.css',
  './css/form.css',
  './css/header.css',
  './css/style.css',
  './css/tasks.css',
  './images/icon.svg',
  './images/task.png',
  './js/script.js',
  './js/authentication.js',
  './js/tasks.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    }).catch(err => console.log(err))
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});