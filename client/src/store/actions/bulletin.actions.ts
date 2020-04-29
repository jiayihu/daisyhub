import { Bulletin } from '../../types/bulletin';

export const GET_BULLETINS_REQUESTED = 'GET_BULLETINS_REQUESTED';
export const GET_BULLETINS_SUCCEEDED = 'GET_BULLETINS_SUCCEEDED';
export const GET_BULLETINS_FAILED = 'GET_BULLETINS_FAILED';

export const getBulletins = () => {
  return {
    type: GET_BULLETINS_REQUESTED as typeof GET_BULLETINS_REQUESTED,
  };
};

export const getBulletinsSucceeded = (payload: Bulletin[]) => {
  return {
    type: GET_BULLETINS_SUCCEEDED as typeof GET_BULLETINS_SUCCEEDED,
    payload,
  };
};

export const getBulletinsFailed = (error: string) => {
  return {
    type: GET_BULLETINS_FAILED as typeof GET_BULLETINS_FAILED,
    payload: error,
    error: true,
  };
};

export type BulletinsAction =
  | ReturnType<typeof getBulletins>
  | ReturnType<typeof getBulletinsSucceeded>
  | ReturnType<typeof getBulletinsFailed>;
