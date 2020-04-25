import { RequestHandler } from 'express';

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
