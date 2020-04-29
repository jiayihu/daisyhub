import { GET_BULLETINS_SUCCEEDED, GET_BULLETINS_FAILED } from '../actions/bulletin.actions';
import { Bulletin } from '../../types/bulletin';
import { Action } from '../actions';

export type BulletinsState = Bulletin[];

export const bulletinsReducer = (state: BulletinsState = [], action: Action): BulletinsState => {
  switch (action.type) {
    case GET_BULLETINS_SUCCEEDED:
      return action.payload;
    case GET_BULLETINS_FAILED:
      return state;
    default:
      return state;
  }
};
