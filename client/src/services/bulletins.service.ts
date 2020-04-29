import { request } from './request';
import { Bulletin } from '../types/bulletin';

export function getBulletins() {
  return request<Bulletin[]>('bulletins');
}
