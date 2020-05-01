import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Island } from './island.model';
import { Firestore, Timestamp, DocumentData } from '@google-cloud/firestore';
import * as D from 'io-ts/lib/Decoder';
// import { addDays } from '../utilities/utils';

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

export const QueueBodyDec = D.partial({
  isLocked: D.boolean,
});

export const BulletinDec = D.intersection(
  D.type({
    id: D.string,
    queue: QueueBodyDec,
    meta: D.type({
      creationDate: D.string,
    }),
  }),
  BulletinBodyDec,
);

export type BulletinBody = D.TypeOf<typeof BulletinBodyDec>;
export type PartialBulletinBody = D.TypeOf<typeof PartialBulletinBodyDec>;
export type QueueBody = D.TypeOf<typeof QueueBodyDec>;
export type Bulletin = D.TypeOf<typeof BulletinDec>;

function docToBulletin(document: DocumentData): Bulletin {
  const creationDate = (document.meta.creationDate.toDate() as Date).toISOString();
  return { ...document, meta: { creationDate } } as Bulletin;
}

export function bulletinToDoc(bulletin: Bulletin): DocumentData {
  const creationDate = Timestamp.fromDate(new Date(bulletin.meta.creationDate));
  return { ...bulletin, meta: { creationDate } };
}

export const readBulletins = (): Reader<Firestore, Promise<Array<Bulletin>>> => db => {
  const ref = db.collection('bulletins');

  return (
    ref
      // Filter bulletins more recent than one day
      // .where('meta.creationDate', '>=', addDays(new Date(), -1))
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
  const ref = db.collection('bulletins').doc(id);
  const bulletin: Bulletin = {
    ...body,
    id,
    queue: {
      isLocked: false,
    },
    meta: {
      creationDate: new Date().toISOString(),
    },
  };

  return ref.set(bulletinToDoc(bulletin)).then(() => id);
};

export const updateBulletin = (
  id: string,
  body: Partial<Bulletin>,
): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db.collection('bulletins').doc(id);

  return ref.update(body).then(() => true);
};

export const deleteBulletin = (id: string): Reader<Firestore, Promise<boolean>> => db => {
  const ref = db.collection('bulletins').doc(id);
  const deleteVisitors = ref
    .collection('visitors')
    .get()
    .then(snapshot => {
      return Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
    });
  const deleteMessages = ref
    .collection('visitors')
    .get()
    .then(snapshot => {
      return Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
    });

  return Promise.all([deleteVisitors, deleteMessages]).then(() => ref.delete().then(() => true));
};
