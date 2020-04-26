import {
  readBulletin,
  createBulletin,
  updateBulletin,
  BulletinBody,
  deleteBulletin,
  readBulletins,
} from '../models/bulletin';

export function getBulletins() {
  return readBulletins();
}

export function getBulletin(id: string) {
  return readBulletin(id);
}

export function addBulletin(body: BulletinBody) {
  return createBulletin(body);
}

export function editBulletin(id: string, body: BulletinBody) {
  return updateBulletin(id, body);
}

export function removeBulletin(id: string) {
  return deleteBulletin(id);
}
