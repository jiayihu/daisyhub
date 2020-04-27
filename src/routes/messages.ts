import express from 'express';
import { Firestore } from '@google-cloud/firestore';
import { validator } from '../utilities/validator';
import { getMessages, addMessage, removeMessage } from '../services/messages';
import { MessageBodyDec } from '../models/messages';

export const createMessagesRoutes = (db: Firestore) => {
  const router = express.Router({ mergeParams: true });

  router.get('/', (req, res, next) => {
    return getMessages(req.params.bulletinId)(db)
      .then(messages => res.send({ status: 'success', data: messages }))
      .catch(next);
  });

  router.post('/', validator(MessageBodyDec), (req, res, next) => {
    return addMessage(
      req.params.bulletinId,
      req.body,
    )(db)
      .then(id => res.status(301).send({ status: 'success', data: { id } }))
      .catch(next);
  });

  router.delete('/:messageId', (req, res, next) => {
    return removeMessage(
      req.params.bulletinId,
      req.params.messageId,
    )(db)
      .then(() => res.sendStatus(204))
      .catch(next);
  });

  return router;
};
