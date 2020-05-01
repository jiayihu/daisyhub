import { UPDATE_VISITORS, UPDATE_BULLETIN } from '../actions/bulletin.actions';
import { Action } from '../actions';
import { Visitor } from '../../types/visitor';
import { Bulletin } from '../../types/bulletin';

export type BulletinState = {
  bulletin: Bulletin | null;
  visitors: Visitor[];
};

const initialState: BulletinState = {
  bulletin: null,
  visitors: [],
};

export const bulletinReducer = (
  state: BulletinState = initialState,
  action: Action,
): BulletinState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
