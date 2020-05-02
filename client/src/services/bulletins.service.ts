import { request } from './request';
import { Bulletin } from '../types/bulletin';
import { getFirestore } from './db';
import { getRealtimeCollection, getRealtimeDocument } from './real-time';
import { Visitor } from '../types/visitor';
import { firestore } from 'firebase';

export function getBulletins() {
  return request<Bulletin[]>('bulletins');
}

export function getBulletin(bulletinId: string) {
  return request<Bulletin>(`bulletins/${bulletinId}`);
}

export function deleteBulletin(bulletinId: string) {
  return request<void>(`bulletins/${bulletinId}`, {
    method: 'DELETE',
  });
}

export function lockBulletinQueue(bulletinId: string, isLocked: boolean) {
  return request<void>(`bulletins/${bulletinId}/queue`, {
    method: 'PATCH',
    body: JSON.stringify({
      isLocked,
    }),
  });
}

function docToBulletin(document: firestore.DocumentData): Bulletin {
  const creationDate = (document.meta.creationDate.toDate() as Date).toISOString();
  return { ...document, meta: { creationDate } } as Bulletin;
}

export function getRealtimeBulletin(bulletinId: string) {
  const ref = getFirestore().collection('bulletins').doc(bulletinId) as firestore.DocumentReference<
    Bulletin
  >;

  return getRealtimeDocument(ref, doc => docToBulletin(doc));
}

export function getRealtimeVisitors(bulletinId: string) {
  const ref = getFirestore()
    .collection('bulletins')
    .doc(bulletinId)
    .collection('visitors') as firestore.CollectionReference<Visitor>;

  return getRealtimeCollection(ref);
}

export function addBulletinVisitor(bulletinId: string, name: string) {
  return request<{ id: string }>(`bulletins/${bulletinId}/visitors`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export function removeBulletinVisitor(bulletinId: string, visitorId: string) {
  return request<void>(`bulletins/${bulletinId}/visitors/${visitorId}`, {
    method: 'DELETE',
  });
}
