import express from 'express';
import {
  addBulletin,
  editBulletin,
  removeBulletin,
  getBulletin,
  getBulletins,
  updateQueue,
} from '../services/bulletin';
import { Firestore } from '@google-cloud/firestore';
import { validator } from '../utilities/validator';
import { BulletinBodyDec, PartialBulletinBodyDec, QueueBodyDec } from '../models/bulletin';
import { getVisitors, addVisitor, removeVisitor, editVisitor } from '../services/visitors';
import { VisitorBodyDec } from '../models/visitors';

export const createBulletinsRoutes = (db: Firestore) => {
  const router = express.Router();

  router.get('/', (_, res, next) => {
    return getBulletins()(db)
      .then(bulletins => res.send({ status: 'success', data: bulletins }))
      .catch(next);
  });

  router.post('/', validator(BulletinBodyDec), (req, res, next) => {
    return addBulletin(req.body)(db)
      .then(id => res.status(301).send({ status: 'success', data: { id } }))
      .catch(next);
  });

  router.get('/:bulletinId', (req, res, next) => {
    return getBulletin(req.params.bulletinId)(db)
      .then(bulletin =>
        bulletin ? res.send({ status: 'success', data: bulletin }) : res.sendStatus(404),
      )
      .catch(next);
  });

  router.patch('/:bulletinId/queue', validator(QueueBodyDec), (req, res, next) => {
    return updateQueue(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.patch('/:bulletinId', validator(PartialBulletinBodyDec), (req, res, next) => {
    return editBulletin(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.delete('/:bulletinId', (req, res, next) => {
    return removeBulletin(req.params.bulletinId)(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.get('/:bulletinId/visitors', (req, res, next) => {
    return getVisitors(req.params.bulletinId)(db)
      .then(visitors => res.send({ status: 'success', data: visitors }))
      .catch(next);
  });

  router.post('/:bulletinId/visitors', validator(VisitorBodyDec), (req, res, next) => {
    return addVisitor(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(id => res.status(301).send({ status: 'success', data: { id } }))
      .catch(next);
  });

  router.patch('/:bulletinId/visitors/:visitorId', validator(VisitorBodyDec), (req, res, next) => {
    return editVisitor(
      req.params.bulletinId,
      req.params.visitorId,
      req.body,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.delete('/:bulletinId/visitors/:visitorId', (req, res, next) => {
    return removeVisitor(
      req.params.bulletinId,
      req.params.visitorId,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  return router;
};
