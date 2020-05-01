import {
  UPDATE_VISITORS,
  UPDATE_BULLETIN,
  NOTIFY_UNSUB_BULLETIN,
  UNSUBSCRIBE_TO_BULLETIN,
} from '../actions/bulletin.actions';
import { Action } from '../actions';
import { Visitor } from '../../types/visitor';
import { Bulletin } from '../../types/bulletin';

export type BulletinState = {
  bulletin: Bulletin | null;
  visitors: Visitor[];
  isUnsubscribed: boolean;
};

const initialState: BulletinState = {
  bulletin: null,
  visitors: [],
  isUnsubscribed: false,
};

export const bulletinReducer = (
  state: BulletinState = initialState,
  action: Action,
): BulletinState => {
  switch (action.type) {
    case UNSUBSCRIBE_TO_BULLETIN:
      return initialState;
    case UPDATE_BULLETIN:
      return {
        ...state,
        bulletin: action.payload.bulletin,
      };
    case UPDATE_VISITORS:
      return {
        ...state,
        visitors: action.payload.visitors,
      };
    case NOTIFY_UNSUB_BULLETIN:
      return {
        ...state,
        isUnsubscribed: true,
      };
    default:
      return state;
  }
};
