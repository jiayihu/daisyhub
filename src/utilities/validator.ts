import { RequestHandler } from 'express';
import { Decoder } from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';

export const validator: <T>(decoder: Decoder<T>) => RequestHandler = decoder => (
  req,
  res,
  next,
) => {
  return pipe(
    decoder.decode(req.body),
    fold(
      errors => res.status(400).send({ status: 'error', error: errors }),
      () => next(),
    ),
  );
};
