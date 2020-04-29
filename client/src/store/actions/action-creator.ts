import { Action } from 'redux';

interface IPayloadCreators {
  request?(...args: any[]): Action;
  success?(...args: any[]): Action;
  failure?(errorMsg: string): Action;
}

interface IActionCreator {
  types: { REQUEST: string; SUCCESS: string; FAILURE: string };
  request(...args: any[]): Action;
  success(...args: any[]): Action;
  failure(errorMsg: string): Action;
}

const defaultPayload = (args: any[]) => {
  if (!args.length) return undefined;

  return args.length === 1 ? args[0] : args;
};

export default function createAction(
  type: string,
  payloadCreators: IPayloadCreators = {} as IPayloadCreators,
): IActionCreator {
  const requestType = `${type}_REQUEST`;
  const successType = `${type}_SUCCESS`;
  const failureType = payloadCreators.failure ? `${type}_FAILURE` : 'SHOW_ERROR';

  return {
    types: { REQUEST: requestType, SUCCESS: successType, FAILURE: failureType },
    request(...args) {
      return {
        type: requestType,
        payload: payloadCreators.request ? payloadCreators.request(...args) : defaultPayload(args),
      };
    },
    success(...args) {
      return {
        type: successType,
        payload: payloadCreators.success ? payloadCreators.success(...args) : defaultPayload(args),
      };
    },
    failure(errorMsg: string) {
      if (payloadCreators.failure) {
        return {
          type: failureType,
          payload: payloadCreators.failure(errorMsg),
        };
      }

      return {
        type: 'SHOW_ERROR',
        payload: errorMsg,
      };
    },
  };
}
