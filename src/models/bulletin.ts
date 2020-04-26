import { Reader } from 'fp-ts/lib/Reader';
import { nanoid } from 'nanoid';
import { Island } from './island';
import { Firestore, DocumentReference } from '@google-cloud/firestore';

export interface Bulletin {
  id: string;
  dodo: string;

  island: Island;

  time: string;
  turnipPrice: number;
  description: string;

  preferences: {
    concurrent: number;
    queue: number;
    hasFee: boolean;
    isPrivate: boolean;
  };

  meta: {
    creationDate: string;
  };
}

export type BulletinBody = Exclude<Bulletin, 'id' | 'meta'>;

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
