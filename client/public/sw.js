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

  if (request.method !== 'GET') return;

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

_self.addEventListener('push', event => {
  if (!event.data) return;

  const message = event.data.json();
  console.log(message);

  let notification = Promise.resolve();

  switch (message.type) {
    case 'TRIGGER':
      notification = _self.registration.showNotification("It's your turn in the queue", {
        body: 'This is the description',
        icon: '/images/icons/icon-192x192.png',
        data: { url: '/' },
      });
    case 'BULLETIN_MESSAGE': {
      const bulletinMessage = message.payload;

      notification = _self.registration.showNotification('There is a message in the queue', {
        body: bulletinMessage.message,
        icon: '/images/icons/icon-192x192.png',
        data: { url: `/bulletins/${bulletinMessage.bulletinId}` },
      });
    }
    default:
      break;
  }

  event.waitUntil(notification);
});

_self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  notification.close();

  event.waitUntil(
    _self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const thereIsFocused = clientList.find(client => client.focused);
      if (thereIsFocused) return;

      const hasWindowToFocus = clientList.length > 0;

      if (hasWindowToFocus) clientList[0].focus();

      if (!hasWindowToFocus) {
        clients
          .openWindow(notification.data.url)
          .then(windowClient => (windowClient ? windowClient.focus() : null));
      }
    }),
  );
});
