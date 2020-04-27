import express from 'express';
import { Firestore } from '@google-cloud/firestore';
import { validator } from '../utilities/validator';
import { getVisitors, addVisitor, removeVisitor, editVisitor } from '../services/visitors.service';
import { VisitorBodyDec } from '../models/visitors.model';

export const createVisitorsRoutes = (db: Firestore) => {
  const router = express.Router({ mergeParams: true });

  router.get('/', (req, res, next) => {
    console.log(req.params);
    return getVisitors(req.params.bulletinId)(db)
      .then(visitors => res.send({ status: 'success', data: visitors }))
      .catch(next);
  });

  router.post('/', validator(VisitorBodyDec), (req, res, next) => {
    return addVisitor(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(id => res.status(301).send({ status: 'success', data: { id } }))
      .catch(next);
  });

  router.patch('/:visitorId', validator(VisitorBodyDec), (req, res, next) => {
    return editVisitor(
      req.params.bulletinId,
      req.params.visitorId,
      req.body,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.delete('/:visitorId', (req, res, next) => {
    return removeVisitor(
      req.params.bulletinId,
      req.params.visitorId,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  return router;
};
