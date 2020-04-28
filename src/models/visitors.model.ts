import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Firestore } from '@google-cloud/firestore';
import * as D from 'io-ts/lib/Decoder';

export const VisitorBodyDec = D.type({
  name: D.string,
});

export type VisitorBody = D.TypeOf<typeof VisitorBodyDec>;

export type Visitor = {
  id: string;
  joinDate: string;
} & VisitorBody;

export const readVisitors = (
  bulletinId: string,
): Reader<Firestore, Promise<Array<Visitor>>> => db => {
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors');

  return ref.get().then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as Visitor);
  });
};

export const createVisitor = (
  bulletinId: string,
  body: VisitorBody,
): Reader<Firestore, Promise<string>> => db => {
  const id = nanoid();
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors')
    .doc(id);
  const visitor: Visitor = {
    ...body,
    id,
    joinDate: new Date().toISOString(),
  };

  return ref.set(visitor).then(() => id);
};

export const updateVisitor = (
  bulletinId: string,
  visitorId: string,
  body: Partial<Visitor>,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors')
    .doc(visitorId);

  return ref.update(body).then(() => true);
};

export const deleteVisitor = (
  bulletinId: string,
  visitorId: string,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors')
    .doc(visitorId);

  return ref.delete().then(() => true);
};
