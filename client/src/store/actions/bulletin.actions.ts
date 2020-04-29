import { Bulletin as BulletinType } from '../../types/bulletin';

export const INIT_BULLETINS = 'INIT_BULLETINS';
export const SET_BULLETINS = 'SET_BULLETINS';
export const FAIL_FETCH = 'FAIL_FETCH';

export type SetBulletinsActionType = {
  type: typeof SET_BULLETINS;
  payload: BulletinType[];
};

export type InitBulletinsActionType = {
  type: typeof INIT_BULLETINS;
};

export type FailFetchBulletinsActionType = {
  type: typeof FAIL_FETCH;
  error: string;
};

export const setBulletins = (payload: BulletinType[]) => {
  return {
    type: SET_BULLETINS,
    payload,
  };
};

export const failFetch = (error: string) => {
  return {
    type: FAIL_FETCH,
    error,
  };
};

export const initBulletins = () => {
  return {
    type: INIT_BULLETINS,
  };
};

export type BulletinsActionTypes =
  | SetBulletinsActionType
  | InitBulletinsActionType
  | FailFetchBulletinsActionType;
