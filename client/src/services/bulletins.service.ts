import { request } from './request';
import { Bulletin } from '../types/bulletin';

export function getBulletins() {
  return request<Bulletin[]>('bulletins');
}

export function getBulletin(bulletinId: string) {
  return request<Bulletin>(`bulletins/${bulletinId}`);
}
