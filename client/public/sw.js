/** @type {ServiceWorkerGlobalScope} */
var _self = self;

const CACHE_STATIC = 'daisyhub-static-v1';
const CACHE_IMAGES = 'daisyhub-images-v1';
const CACHE_NAMES = [CACHE_STATIC, CACHE_IMAGES];

const staticUrlsToCache = ['/offline.html'];

_self.addEventListener('install', event => {
  _self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      return cache.addAll(staticUrlsToCache);
    }),
  );
});

_self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(cacheKey => {
          if (!CACHE_NAMES.includes(cacheKey)) return caches.delete(cacheKey);

          return Promise.resolve(null);
        }),
      ).then(() => _self.clients.claim());
    }),
  );
});

/**
 * Only after first install, on second reload
 */
_self.addEventListener('fetch', event => {
  const request = event.request;
  const imagesRegxp = /(\.(png|jpeg|svg|ico))$/;

  if (imagesRegxp.test(request.url)) {
    return event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          event.waitUntil(
            caches.open(CACHE_IMAGES).then(cache => {
              return fetch(request).then(response => {
                return cache.put(request, response.clone());
              });
            }),
          );

          return response;
        }

        return caches.open(CACHE_IMAGES).then(cache => {
          return fetch(request).then(response => {
            event.waitUntil(cache.put(request, response.clone()));

            return response;
          });
        });
      }),
    );
  }

  const url = new URL(request.url);

  if (url.pathname === '/') {
    return event.respondWith(
      fetch(request).catch(error => {
        return caches.match('/offline.html');
      }),
    );
  }

  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    }),
  );
});
