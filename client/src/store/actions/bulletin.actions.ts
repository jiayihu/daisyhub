import { Bulletin } from '../../types/bulletin';
import { Visitor } from '../../types/visitor';

export const GET_BULLETINS_REQUESTED = 'GET_BULLETINS_REQUESTED';
export const GET_BULLETINS_SUCCEEDED = 'GET_BULLETINS_SUCCEEDED';

export const GET_BULLETIN_REQUESTED = 'GET_BULLETIN_REQUESTED';
export const GET_BULLETIN_SUCCEEDED = 'GET_BULLETIN_SUCCEEDED';

export const SUBSCRIBE_TO_BULLETIN = 'SUBSCRIBE_TO_BULLETIN';
export const UNSUBSCRIBE_TO_BULLETIN = 'UNSUBSCRIBE_TO_BULLETIN';
export const UPDATE_BULLETIN = 'UPDATE_BULLETIN';

export const SUBSCRIBE_TO_VISITORS = 'SUBSCRIBE_TO_VISITORS';
export const UNSUBSCRIBE_TO_VISITORS = 'UNSUBSCRIBE_TO_VISITORS';
export const UPDATE_VISITORS = 'UPDATE_VISITORS';

export const NOTIFY_UNSUB_BULLETIN = 'NOTIFY_UNSUB_BULLETIN';

export const DELETE_BULLETIN = 'DELETE_BULLETIN';

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

export const subscribeToBulletin = (bulletinId: string) => {
  return {
    type: SUBSCRIBE_TO_BULLETIN as typeof SUBSCRIBE_TO_BULLETIN,
    payload: { bulletinId },
  };
};

export const unsubscribeToBulletin = (bulletinId: string) => {
  return {
    type: UNSUBSCRIBE_TO_BULLETIN as typeof UNSUBSCRIBE_TO_BULLETIN,
    payload: { bulletinId },
  };
};

export const updateBulletin = (bulletin: Bulletin) => {
  return {
    type: UPDATE_BULLETIN as typeof UPDATE_BULLETIN,
    payload: { bulletin },
  };
};

export const subscribeToVisitors = (bulletinId: string) => {
  return {
    type: SUBSCRIBE_TO_VISITORS as typeof SUBSCRIBE_TO_VISITORS,
    payload: { bulletinId },
  };
};

export const unsubscribeToVisitors = (bulletinId: string) => {
  return {
    type: UNSUBSCRIBE_TO_VISITORS as typeof UNSUBSCRIBE_TO_VISITORS,
    payload: { bulletinId },
  };
};

export const updateVisitors = (visitors: Visitor[]) => {
  return {
    type: UPDATE_VISITORS as typeof UPDATE_VISITORS,
    payload: { visitors },
  };
};

export const notifyUnsubBulletin = () => {
  return {
    type: NOTIFY_UNSUB_BULLETIN as typeof NOTIFY_UNSUB_BULLETIN,
  };
};

export const deleteBulletin = (bulletinId: string) => {
  return {
    type: DELETE_BULLETIN as typeof DELETE_BULLETIN,
    payload: { bulletinId },
  };
};

export type BulletinsAction =
  | ReturnType<typeof getBulletins>
  | ReturnType<typeof getBulletinsSucceeded>
  | ReturnType<typeof getBulletin>
  | ReturnType<typeof getBulletinSucceeded>
  | ReturnType<typeof subscribeToBulletin>
  | ReturnType<typeof unsubscribeToBulletin>
  | ReturnType<typeof updateBulletin>
  | ReturnType<typeof subscribeToVisitors>
  | ReturnType<typeof unsubscribeToVisitors>
  | ReturnType<typeof updateVisitors>
  | ReturnType<typeof notifyUnsubBulletin>
  | ReturnType<typeof deleteBulletin>;
