import {
  readBulletin,
  createBulletin,
  updateBulletin,
  BulletinBody,
  PartialBulletinBody,
  deleteBulletin,
  readBulletins,
  QueueBody,
} from '../models/bulletin.model';

export function getBulletins() {
  return readBulletins();
}

export function getBulletin(id: string) {
  return readBulletin(id);
}

export function addBulletin(body: BulletinBody) {
  return createBulletin(body);
}

export function editBulletin(id: string, body: PartialBulletinBody) {
  return updateBulletin(id, body);
}

export function removeBulletin(id: string) {
  return deleteBulletin(id);
}

export function updateQueue(id: string, body: QueueBody) {
  return updateBulletin(id, {
    queue: body,
  });
}
