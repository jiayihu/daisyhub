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
      return Promise.all(
        staticUrlsToCache.map(url =>
          cache.add(url).catch(error => {
            console.log('Failed to add', url, 'to the cache', error);
          }),
        ),
      );
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
    return event.respondWith(staleWhileRevalidate(CACHE_IMAGES, request));
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

function staleWhileRevalidate(cacheName, request) {
  return caches.open(cacheName).then(cache => {
    return cache.match(request).then(response => {
      const fetchRequest = fetch(request).then(fetchResponse => {
        cache.put(request, fetchResponse.clone());

        return fetchResponse;
      });

      return response || fetchRequest;
    });
  });
}
