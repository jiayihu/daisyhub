import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Island } from './island';
import { Firestore, Timestamp, DocumentData } from '@google-cloud/firestore';
import * as D from 'io-ts/lib/Decoder';
import { addDays } from '../utilities/utils';

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

function docToBulletin(document: DocumentData): Bulletin {
  const creationDate = (document.meta.creationDate.toDate() as Date).toISOString();
  return { ...document, meta: { creationDate } } as Bulletin;
}

export const readBulletins = (): Reader<Firestore, Promise<Array<Bulletin>>> => db => {
  const ref = db.collection('bulletins');

  return (
    ref
      // Filter bulletins more recent than one day
      .where('meta.creationDate', '>=', addDays(new Date(), -1))
      .orderBy('meta.creationDate', 'desc')
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => docToBulletin(doc.data()));
      })
  );
};

export const readBulletin = (id: string): Reader<Firestore, Promise<Bulletin | null>> => db => {
  const ref = db.collection('bulletins').doc(id);

  return ref.get().then(snapshot => {
    const data = snapshot.data();
    return data ? docToBulletin(data) : null;
  });
};

export const createBulletin = (body: BulletinBody): Reader<Firestore, Promise<string>> => db => {
  const id = nanoid();
  const creationDate = Timestamp.fromDate(new Date());
  const ref = db.collection('bulletins').doc(id);
  const document = {
    ...body,
    id,
    meta: {
      creationDate,
    },
  };

  return ref.set(document).then(() => id);
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
