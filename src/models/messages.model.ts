import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Firestore } from '@google-cloud/firestore';
import * as D from 'io-ts/lib/Decoder';

export const MessageBodyDec = D.type({
  authorId: D.string,
  name: D.string,
  message: D.string,
});

export type MessageBody = D.TypeOf<typeof MessageBodyDec>;

export type Message = {
  id: string;
  creationDate: string;
} & MessageBody;

export const readMessages = (
  bulletinId: string,
): Reader<Firestore, Promise<Array<Message>>> => db => {
  const ref = db.collection('bulletins').doc(bulletinId).collection('messages');

  return ref.get().then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as Message);
  });
};

export const createMessage = (
  bulletinId: string,
  body: MessageBody,
): Reader<Firestore, Promise<string>> => db => {
  const id = nanoid();
  const ref = db.collection('bulletins').doc(bulletinId).collection('messages').doc(id);
  const message: Message = {
    ...body,
    id,
    creationDate: new Date().toISOString(),
  };

  return ref.set(message).then(() => id);
};

export const deleteMessage = (
  bulletinId: string,
  messageId: string,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db.collection('bulletins').doc(bulletinId).collection('messages').doc(messageId);

  return ref.delete().then(() => true);
};
