import { RequestHandler, ErrorRequestHandler } from 'express';
import { RestError } from './utilities/validator';

export const cors: RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH, PUT');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Max-Age', '3600');
    return res.sendStatus(200);
  }

  return next();
};

export const jsonError: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof SyntaxError) {
    const error: RestError = {
      code: 'InvalidJSON',
      message: err.message,
    };

    return res.status(400).send({ status: 'error', error });
  }

  return next();
};
