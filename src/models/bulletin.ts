import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Island } from './island';
import { Firestore, DocumentReference } from '@google-cloud/firestore';
import * as D from 'io-ts/lib/Decoder';

const bodySchema = {
  dodo: D.string,
  island: Island,
  time: D.string,
  turnipPrice: D.number,
  description: D.string,
  preferences: D.type({
    concurrent: D.number,
    queue: D.number,
    hasFee: D.boolean,
    isPrivate: D.boolean,
  }),
};

export const BulletinBodyDec = D.type(bodySchema);
export const PartialBulletinBodyDec = D.partial(bodySchema);

export const BulletinDec = D.intersection(
  D.type({
    id: D.string,
    meta: D.type({
      creationDate: D.string,
    }),
  }),
  BulletinBodyDec,
);

export type BulletinBody = D.TypeOf<typeof BulletinBodyDec>;
export type Bulletin = D.TypeOf<typeof BulletinDec>;

export const readBulletins = (): Reader<Firestore, Promise<Array<Bulletin>>> => db => {
  const ref = db.collection('bulletins');

  return ref.get().then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as Bulletin);
  });
};

export const readBulletin = (
  id: string,
): Reader<Firestore, Promise<Bulletin | undefined>> => db => {
  const ref = db.collection('bulletins').doc(id) as DocumentReference<Bulletin>;

  return ref.get().then(snapshot => snapshot.data());
};

export const createBulletin = (body: BulletinBody): Reader<Firestore, Promise<Bulletin>> => db => {
  const id = nanoid();
  const creationDate = new Date().toISOString();
  const ref = db.collection('bulletins').doc(id);
  const document = {
    ...body,
    id,
    meta: {
      creationDate,
    },
  };

  return ref.set(document).then(() => document);
};

export const updateBulletin = (
  id: string,
  body: BulletinBody,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db.collection('bulletins').doc(id);

  return ref.update(body).then(() => true);
};

export const deleteBulletin = (id: string): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db.collection('bulletins').doc(id);

  return ref.delete().then(() => true);
};
