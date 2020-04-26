import express from 'express';
import { addBulletin, editBulletin, removeBulletin, getBulletin } from '../services/bulletin';
import { Firestore } from '@google-cloud/firestore';

export const createBulletinsRoutes = (db: Firestore) => {
  const router = express.Router();

  router.post('/', (req, res, next) => {
    return addBulletin(req.body)(db)
      .then(bulletin => res.status(301).send({ status: 'success', data: bulletin }))
      .catch(next);
  });

  router.get('/:bulletinId', (req, res, next) => {
    return getBulletin(req.params.bulletinId)(db)
      .then(bulletin =>
        bulletin
          ? res.status(200).send({ status: 'success', data: bulletin })
          : res.sendStatus(404),
      )
      .catch(next);
  });

  router.patch('/:bulletinId', (req, res, next) => {
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
