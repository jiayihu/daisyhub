import express from 'express';
import {
  addBulletin,
  editBulletin,
  removeBulletin,
  getBulletin,
  getBulletins,
  updateQueue,
} from '../services/bulletin.service';
import { Firestore } from '@google-cloud/firestore';
import { validator } from '../utilities/validator';
import { BulletinBodyDec, PartialBulletinBodyDec, QueueBodyDec } from '../models/bulletin.model';

export const createBulletinsRoutes = (db: Firestore) => {
  const router = express.Router({ mergeParams: true });

  router.get('/', (_, res, next) => {
    return getBulletins()(db)
      .then(bulletins => res.send({ status: 'success', data: bulletins }))
      .catch(next);
  });

  router.post('/', validator(BulletinBodyDec), (req, res, next) => {
    return addBulletin(req.body)(db)
      .then(ids => res.status(301).send({ status: 'success', data: ids }))
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

  return router;
};
