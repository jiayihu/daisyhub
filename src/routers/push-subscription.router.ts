import express from 'express';
import { Firestore } from '@google-cloud/firestore';
import {
  addPushSubscription,
  removePushSubscription,
  triggerPushMessage,
} from '../services/push-subscription.service';

export const createPushSubscriptionsRoutes = (db: Firestore) => {
  const router = express.Router({ mergeParams: true });

  router.post('/', (req, res, next) => {
    return addPushSubscription(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.post('/all', (req, res, next) => {
    return triggerPushMessage(req.params.bulletinId)(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  router.delete('/:authKey', (req, res, next) => {
    return removePushSubscription(
      req.params.bulletinId,
      req.params.authKey,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  return router;
};
