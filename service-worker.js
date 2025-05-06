const CACHE_NAME = "painel-cache-v1";
const urlsToCache = [
  "/ChamadaSenha/", // Página inicial
  "/ChamadaSenha/manifest.json", // Manifest
  "/ChamadaSenha/chamada.mp3", // Som
  "/ChamadaSenha/icon-192x192.png", // Ícone 192x192
  "/ChamadaSenha/icon-512x512.png" // Ícone 512x512
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde com o cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});