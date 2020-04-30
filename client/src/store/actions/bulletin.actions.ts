import { Bulletin } from '../../types/bulletin';

export const GET_BULLETINS_REQUESTED = 'GET_BULLETINS_REQUESTED';
export const GET_BULLETINS_SUCCEEDED = 'GET_BULLETINS_SUCCEEDED';

export const GET_BULLETIN_REQUESTED = 'GET_BULLETIN_REQUESTED';
export const GET_BULLETIN_SUCCEEDED = 'GET_BULLETIN_SUCCEEDED';

export const getBulletins = () => {
  return {
    type: GET_BULLETINS_REQUESTED as typeof GET_BULLETINS_REQUESTED,
  };
};

export const getBulletinsSucceeded = (bulletins: Bulletin[]) => {
  return {
    type: GET_BULLETINS_SUCCEEDED as typeof GET_BULLETINS_SUCCEEDED,
    payload: bulletins,
  };
};

export const getBulletin = (bulletinId: string) => {
  return {
    type: GET_BULLETIN_REQUESTED as typeof GET_BULLETIN_REQUESTED,
    payload: { bulletinId },
  };
};

export const getBulletinSucceeded = (bulletin: Bulletin) => {
  return {
    type: GET_BULLETIN_SUCCEEDED as typeof GET_BULLETIN_SUCCEEDED,
    payload: bulletin,
  };
};

export type BulletinsAction =
  | ReturnType<typeof getBulletins>
  | ReturnType<typeof getBulletinsSucceeded>
  | ReturnType<typeof getBulletin>
  | ReturnType<typeof getBulletinSucceeded>;
