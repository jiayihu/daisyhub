export const getIDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('daisyhub', 1);

    request.addEventListener('error', () => {
      const error = (request.result as any).errorCode;
      console.log('IDB error', error);
      reject(error);
    });

    request.addEventListener('success', () => {
      resolve(request.result);
    });

    request.addEventListener('upgradeneeded', () => {
      const db = request.result;
      db.createObjectStore('new-messages', { keyPath: 'authorId' });
    });

    request.addEventListener('blocked', () => {
      reject('Request to open IDB was blocked');
    });
  });
};
