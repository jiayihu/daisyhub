import {
  readVisitors,
  createVisitor,
  updateVisitor,
  VisitorBody,
  deleteVisitor,
} from '../models/visitors';

export function getVisitors(bulletinId: string) {
  return readVisitors(bulletinId);
}

export function addVisitor(bulletinId: string, body: VisitorBody) {
  return createVisitor(bulletinId, body);
}

export function editVisitor(bulletinId: string, visitorId: string, body: VisitorBody) {
  return updateVisitor(bulletinId, visitorId, body);
}

export function removeVisitor(bulletinId: string, visitorId: string) {
  return deleteVisitor(bulletinId, visitorId);
}
