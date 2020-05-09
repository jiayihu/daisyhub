import { Reader } from 'fp-ts/lib/Reader';
import { Firestore } from '@google-cloud/firestore';

export type PushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type PushMessage = {
  type: string;
  payload?: any;
};

export const readPushSubscriptions = (
  bulletinId: string,
): Reader<Firestore, Promise<PushSubscription[]>> => db => {
  const ref = db.collection('bulletins').doc(bulletinId).collection('push-subscriptions');
  return ref.get().then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as PushSubscription);
  });
};

export const createPushSubscription = (
  bulletinId: string,
  body: PushSubscription,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('push-subscriptions')
    .doc(body.keys.auth);
  return ref.set(body).then(() => true);
};

export const deletePushSubscription = (
  bulletinId: string,
  authKey: string,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('push-subscriptions')
    .doc(authKey);

  return ref.delete().then(() => true);
};
