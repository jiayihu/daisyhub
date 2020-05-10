import {
  createPushSubscription,
  PushSubscription,
  deletePushSubscription,
  readPushSubscriptions,
  PushMessage,
} from '../models/push-subscription.model';
import { sendNotification, WebPushError, setVapidDetails } from 'web-push';
import { chain } from 'fp-ts/lib/Reader';
import { pipe } from 'fp-ts/lib/pipeable';
import { allSettled } from '../utilities/utils';

const vapidConfig = {
  subject: 'mailto:jiayi.ghu@gmail.com',
  publicKey: process.env.VAPID_PUBLIC_KEY as string,
  privateKey: process.env.VAPID_PRIVATE_KEY as string,
};
setVapidDetails(vapidConfig.subject, vapidConfig.publicKey, vapidConfig.privateKey);

export function addPushSubscription(bulletinId: string, body: PushSubscription) {
  return createPushSubscription(bulletinId, body);
}

export function removePushSubscription(bulletinId: string, authKey: string) {
  return deletePushSubscription(bulletinId, authKey);
}

export function triggerPushMessage(bulletinId: string) {
  const message = {
    type: 'TRIGGER',
  };

  return pushMessageToBulletin(bulletinId, message);
}

export function pushMessageToBulletin(bulletinId: string, message: PushMessage) {
  return pipe(
    readPushSubscriptions(bulletinId),
    chain(readOperation => db =>
      readOperation.then(subscriptions => {
        const notificationRequests = subscriptions.map(subscription => {
          return pushNotification(subscription, message).catch((error: WebPushError) => {
            if (error.statusCode === 404 || error.statusCode === 410) {
              deletePushSubscription(bulletinId, subscription.keys.auth)(db);
            }

            throw error;
          });
        });

        return allSettled(notificationRequests);
      }),
    ),
  );
}

export const pushNotification = (subscription: PushSubscription, message: PushMessage) => {
  return sendNotification(subscription, JSON.stringify(message));
};
