import { RequestHandler } from 'express';
import { Decoder } from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { Tree } from 'fp-ts/lib/Tree';
import { flatten } from './utils';

/**
 * https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md#errorresponse--object
 */
export type RestError = {
  code: 'BadArgument';
  message: string;
  details?: Array<RestError>;
};

function getErrorValues(forest: Array<Tree<string>>): Array<string> {
  return flatten(
    forest.map(x => {
      return x.forest.length ? [x.value, ...getErrorValues(x.forest)] : [x.value];
    }),
  );
}

export const validator: <T>(
  decoder: Decoder<T>,
) => RequestHandler<Record<string, string>, any, T> = decoder => (req, res, next) => {
  return pipe(
    decoder.decode(req.body),
    fold(
      errorForest => {
        const details: Array<RestError> = getErrorValues(errorForest).map(message => {
          return {
            code: 'BadArgument',
            message,
          };
        });
        const error: RestError = {
          code: 'BadArgument',
          message: 'Invalid request body',
          details,
        };

        return res.status(400).send({ status: 'error', error });
      },
      () => next(),
    ),
  );
};
