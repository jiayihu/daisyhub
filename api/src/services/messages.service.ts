import { readMessages, createMessage, MessageBody, deleteMessage } from '../models/messages.model';
import { pipe } from 'fp-ts/lib/pipeable';
import { chain } from 'fp-ts/lib/Reader';
import { PushMessage } from '../models/push-subscription.model';
import { pushMessageToBulletin } from './push-subscription.service';

export function getMessages(bulletinId: string) {
  return readMessages(bulletinId);
}

export function addMessage(bulletinId: string, body: MessageBody) {
  return pipe(
    createMessage(bulletinId, body),
    chain(operation => db => {
      return operation.then(message => {
        const pushMessage: PushMessage = {
          type: 'BULLETIN_MESSAGE',
          payload: message,
        };

        // Avoid waiting on all push notifications
        pushMessageToBulletin(bulletinId, pushMessage)(db);

        return message.id;
      });
    }),
  );
}

export function removeMessage(bulletinId: string, messageId: string) {
  return deleteMessage(bulletinId, messageId);
}
