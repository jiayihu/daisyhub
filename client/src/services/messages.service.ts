import { request } from './request';
import { getFirestore } from './db';
import { getRealtimeCollection } from './real-time';
import { Message, MessageBody } from '../types/message';
import { firestore } from 'firebase';
import { getIDB } from './daisyhub-db';

export function getRealtimeMessages(bulletinId: string) {
  const ref = getFirestore()
    .collection('bulletins')
    .doc(bulletinId)
    .collection('messages') as firestore.CollectionReference<Message>;

  return getRealtimeCollection(ref);
}

export function addBulletinMessage(bulletinId: string, body: MessageBody) {
  return request<{ id: string }>(`bulletins/${bulletinId}/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  }).catch(() => {
    if (window.indexedDB && window.SyncManager) {
      getIDB()
        .then(db =>
          db
            .transaction('new-messages', 'readwrite')
            .objectStore('new-messages')
            .add({ body, bulletinId }),
        )
        .then(() => {
          return navigator.serviceWorker.ready.then(registration => {
            return registration.sync.register('new-message');
          });
        });
    }
  });
}
