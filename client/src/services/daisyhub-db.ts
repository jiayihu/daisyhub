export const getIDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('daisyhub', 1);

    request.addEventListener('error', event => {
      const error = (event.target as IDBRequest).error;
      reject(error);
    });

    request.addEventListener('success', () => {
      const db = request.result;

      db.addEventListener('versionchange', () => {
        db.close();
        window.location.reload();
      });

      resolve(db);
    });

    request.addEventListener('upgradeneeded', () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('new-messages')) {
        db.createObjectStore('new-messages', { keyPath: 'body.authorId' });
      }
    });

    request.addEventListener('blocked', () => {
      reject('Request to open IDB was blocked');
    });
  });
};

export function promisifyRequest<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}
